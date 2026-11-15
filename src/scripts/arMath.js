const DEG = Math.PI / 180
const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
const dot = (a, b) => a.reduce((sum, value, index) => sum + value * b[index], 0)

export const normalizeDirection = (degrees) => ((degrees % 360) + 360) % 360
export const isArEnabled = (value) => value === true || value === 1 || value === '1'

// Android DeviceMotion: R = Rz(alpha) * Rx(beta) * Ry(gamma).
// World axes: east, magnetic north, up. Rear camera looks along device -Z.
// Use quaternions to avoid jumps at north and Euler-angle singularities.
export const rotationToQuaternion = (rotation) => {
    if (!rotation || ![rotation.alpha, rotation.beta, rotation.gamma].every(Number.isFinite)) return null
    const ca = Math.cos(rotation.alpha / 2)
    const sa = Math.sin(rotation.alpha / 2)
    const cb = Math.cos(rotation.beta / 2)
    const sb = Math.sin(rotation.beta / 2)
    const cg = Math.cos(rotation.gamma / 2)
    const sg = Math.sin(rotation.gamma / 2)
    return [ca * sb * cg - sa * cb * sg, ca * cb * sg + sa * sb * cg,
        sa * cb * cg + ca * sb * sg, ca * cb * cg - sa * sb * sg]
}

export const smoothOrientation = (previous, next, elapsedMs) => {
    if (!previous) return next
    // Time-based smoothing, about 80 ms. Never interpolate the long way around.
    const amount = 1 - Math.exp(-clamp(elapsedMs, 1, 150) / 80)
    const alignment = dot(previous, next)
    const target = alignment < 0 ? next.map(value => -value) : next
    const cosine = clamp(Math.abs(alignment), 0, 1)
    let result
    if (cosine > 0.9995) {
        result = previous.map((value, index) => value + amount * (target[index] - value))
    } else {
        const angle = Math.acos(cosine)
        const before = Math.sin((1 - amount) * angle) / Math.sin(angle)
        const after = Math.sin(amount * angle) / Math.sin(angle)
        result = previous.map((value, index) => before * value + after * target[index])
    }
    const length = Math.hypot(...result)
    return result.map(value => value / length)
}

export const getCameraPose = ([x, y, z, w]) => {
    const right = [1 - 2 * (y * y + z * z), 2 * (x * y + z * w), 2 * (x * z - y * w)]
    const up = [2 * (x * y - z * w), 1 - 2 * (x * x + z * z), 2 * (y * z + x * w)]
    const forward = [-2 * (x * z + y * w), -2 * (y * z - x * w), 2 * (x * x + y * y) - 1]
    return {
        right, up, forward,
        heading: Math.hypot(forward[0], forward[1]) < 0.05
            ? null : normalizeDirection(Math.atan2(forward[0], forward[1]) / DEG),
        elevation: Math.asin(clamp(forward[2], -1, 1)) / DEG,
    }
}

export const projectArObject = (pose, direction, elevation, width, height, verticalFov = 60) => {
    if (!pose || ![direction, elevation, width, height, verticalFov].every(Number.isFinite)
        || width <= 0 || height <= 0 || verticalFov <= 0 || verticalFov >= 180) return null
    const target = [Math.sin(direction * DEG) * Math.cos(elevation * DEG),
        Math.cos(direction * DEG) * Math.cos(elevation * DEG), Math.sin(elevation * DEG)]
    const depth = clamp(dot(target, pose.forward), -1, 1)
    const horizontal = dot(target, pose.right)
    const vertical = dot(target, pose.up)
    const focalLength = height / (2 * Math.tan(verticalFov * DEG / 2))
    const x = depth > 0.001 ? width / 2 + focalLength * horizontal / depth : null
    const y = depth > 0.001 ? height / 2 - focalLength * vertical / depth : null
    const angularError = Math.acos(depth) / DEG
    const turn = pose.heading === null ? horizontal
        : normalizeDirection(direction - pose.heading + 180) - 180
    return {
        x, y, angularError,
        inView: x !== null && x >= 0 && x <= width && y >= 0 && y <= height,
        // Keep drawing near the edge so that the text leaves the viewport gradually.
        visible: x !== null && x >= -width / 2 && x <= width * 1.5 && y >= -100 && y <= height + 100,
        onTarget: angularError <= 6,
        behind: depth <= 0,
        horizontalHint: (depth <= 0 ? turn : horizontal) >= 0 ? 'Поверни телефон вправо' : 'Поверни телефон влево',
        verticalHint: vertical >= 0 ? 'Подними камеру' : 'Опусти камеру',
        horizontalError: Math.abs(horizontal),
        verticalError: Math.abs(vertical),
    }
}
