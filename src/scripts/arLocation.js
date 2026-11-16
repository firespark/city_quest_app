const DEG = Math.PI / 180
export const AR_LOCATION_MAX_AGE_MS = 15000
const MIN_GPS_TOLERANCE_METRES = 15
const MAX_GPS_TOLERANCE_METRES = 30
const EXIT_MARGIN_METRES = 15

const validCoordinates = point => point && Number.isFinite(point.latitude)
    && Number.isFinite(point.longitude) && Math.abs(point.latitude) <= 90 && Math.abs(point.longitude) <= 180

export const distanceToArPoint = (position, point) => {
    if (!validCoordinates(position) || !validCoordinates(point)) return null
    const latitudeDelta = (point.latitude - position.latitude) * DEG
    const longitudeDelta = (point.longitude - position.longitude) * DEG
    const a = Math.sin(latitudeDelta / 2) ** 2 + Math.cos(position.latitude * DEG)
        * Math.cos(point.latitude * DEG) * Math.sin(longitudeDelta / 2) ** 2
    return 6371000 * 2 * Math.asin(Math.sqrt(Math.max(0, Math.min(1, a))))
}

export const getArActivationRadius = (point, accuracy) => {
    const tolerance = Number.isFinite(accuracy) && accuracy >= 0 ? accuracy : MIN_GPS_TOLERANCE_METRES
    return point.activationRadius + Math.max(MIN_GPS_TOLERANCE_METRES, Math.min(MAX_GPS_TOLERANCE_METRES, tolerance))
}

export const getArProximity = (point, location, now = Date.now(), wasInside = false) => {
    const distance = distanceToArPoint(location?.coords, point)
    const reportedAccuracy = location?.coords?.accuracy
    const accuracy = Number.isFinite(reportedAccuracy) && reportedAccuracy >= 0 ? reportedAccuracy : null
    const result = { distance, accuracy }
    if (distance === null || !Number.isFinite(point.activationRadius) || point.activationRadius <= 0) {
        return { ...result, status: 'locating' }
    }
    if (!Number.isFinite(location.timestamp) || now - location.timestamp > AR_LOCATION_MAX_AGE_MS
        || location.timestamp > now + 5000) return { ...result, status: 'stale' }
    // Accuracy adds a bounded distance allowance; it must not veto a nearby position.
    const activationRadius = getArActivationRadius(point, accuracy)
    // Use a wider exit boundary so small GPS jumps do not interrupt the camera.
    const boundary = activationRadius + (wasInside ? EXIT_MARGIN_METRES : 0)
    return { ...result, status: distance <= boundary ? 'inside' : 'outside' }
}
