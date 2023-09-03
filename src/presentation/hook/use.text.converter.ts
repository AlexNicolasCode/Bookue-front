type TextConverters = {
    normalizeContent: (content: string) => string
}

const normalizeContent = (content: string) => {
    const contentInNormalCase = content.replace(/([a-z]{1,})([A-Z]{1,})/g, '$1 $2')
    return contentInNormalCase.charAt(0).toUpperCase().trim() + contentInNormalCase.slice(1).toLowerCase();
}

export const useTextConverter = () => ({ normalizeContent } as TextConverters) 