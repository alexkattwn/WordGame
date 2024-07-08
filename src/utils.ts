export const cleanText = (text: string): string => {
    return text
        .replace(/[^\wА-Яа-яЁё]|_/g, '')
        .replace(/\s+/g, '')
        .toLowerCase()
}
