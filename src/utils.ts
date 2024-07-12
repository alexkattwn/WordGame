import { IWord } from '@/types'

export const cleanText = (text: string): string => {
    return text
        .replace(/[^\wА-Яа-яЁё]|_/g, '')
        .replace(/\s+/g, '')
        .toLowerCase()
}

export const getUniqueFirstLetters = (words: IWord[]): string[] => {
    let data: string[] = []

    for (let i = 0; i < words.length; i++) {
        const firstLetter = words[i].word[0]

        if (
            data.length !== 0 &&
            data.find((letter) => letter === firstLetter)
        ) {
            continue
        }

        data = [...data, firstLetter]
    }

    return data.sort()
}

export const getCountWordsSpelled = (
    letters: string[],
    words: IWord[]
): number[] => {
    let data: number[] = []

    for (let i = 0; i < letters.length; i++) {
        const elem = letters[i]
        const count = [...words.filter((el) => el.word[0] === elem)].length
        data = [...data, count]
    }

    return data
}

export const arrayStringToUpperCase = (arr: string[]): string[] => {
    let data: string[] = []

    for (let i = 0; i < arr.length; i++) {
        data = [...data, arr[i].toLocaleUpperCase()]
    }

    return data
}
