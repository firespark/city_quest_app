export const getAnswerValues = (answers, count) =>
    Array.from({ length: count }, (_, index) => String(answers[index] ?? ''))

export const splitAnswerInput = (value, index, count, answers, allowSinglePhrase = false) => {
    if (count <= 1) {
        const answer = allowSinglePhrase ? value : value.replace(/\s/g, '')
        return { answers: { ...answers, [index]: answer }, focusIndex: index }
    }
    const words = value.trim().split(/\s+/u)
    const next = { ...answers, [index]: words[0] || '' }
    for (let offset = 1; offset < words.length && index + offset < count; offset++) next[index + offset] = words[offset]
    const advance = words[0] && /\s/u.test(value) ? Math.max(1, words.length - 1 + (/\s$/u.test(value) ? 1 : 0)) : 0
    return { answers: next, focusIndex: Math.min(count - 1, index + advance) }
}
