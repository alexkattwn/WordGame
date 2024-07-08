import { IWord } from '@/types'

export function setWordsToLocalStorage(words: IWord[]): void {
    localStorage.setItem('words', JSON.stringify(words))
}

export function getWordsFromLocalStorage(): IWord[] | [] {
    const data = localStorage.getItem('words')
    return data ? JSON.parse(data) : []
}

export function removeWordsFromLocalStorage(): void {
    localStorage.removeItem('words')
}
