type TextConverters = {
    normalizeContent: (content: string) => string
    truncateText: (text: string, maxChar: number) => string
}

const normalizeContent = (content: string) => {
    const contentInNormalCase = content.replace(/([a-z]{1,})([A-Z]{1,})/g, '$1 $2')
    return contentInNormalCase.charAt(0).toUpperCase().trim() + contentInNormalCase.slice(1).toLowerCase();
}

const truncateText = (text: string, maxChar: number) => {
    if (text.length > maxChar) {
        const partialText = text.slice(0, maxChar)
        return `${partialText}...`
    }
    return text
}

export const useTextConverter = () => ({
    normalizeContent,
    truncateText,
} as TextConverters) 