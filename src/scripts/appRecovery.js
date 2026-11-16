let generation = 0
const listeners = new Set()
const restartListeners = new Set()

export const getAppGeneration = () => generation
export const restartAppState = () => { generation++ }
export const subscribeToCriticalErrors = listener => {
    listeners.add(listener)
    return () => listeners.delete(listener)
}
export const reportCriticalError = (requestGeneration = generation) => {
    if (requestGeneration === generation) listeners.forEach(listener => listener())
}
export const subscribeToAppRestarts = listener => {
    restartListeners.add(listener)
    return () => restartListeners.delete(listener)
}
export const requestAppRestart = () => restartListeners.forEach(listener => listener())
export const isCriticalResponse = (status, error) => [401, 403, 404, 409].includes(Number(status))
    || Number(status) >= 500 || (typeof error === 'string' && /^(?:forbidden|unauthorized|internal server error)$/i.test(error.trim()))
