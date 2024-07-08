import { create } from 'zustand'

import { IWord } from '@/types'
import {
    getWordsFromLocalStorage,
    setWordsToLocalStorage,
} from '@/helpers/localStorage.helper'

interface WordsStore {
    words: IWord[]
    getWords: () => void
    addWord: (word: string) => void
    reset: () => void
    removeWord: (id: number) => void
}

const useWords = create<WordsStore>((set) => ({
    words: [],
    getWords: () => {
        const data = getWordsFromLocalStorage()
        set({ words: data })
    },
    addWord: (word) => {
        const data = getWordsFromLocalStorage()

        if (data.find((w) => w.word === word.toLowerCase())) {
            alert('Такое слово уже есть')
            return
        }

        let id

        if (data.length === 0) {
            id = 1
        } else {
            id =
                data.reduce((max, current) => {
                    return current.id > max.id ? current : max
                }, data[0]).id + 1
        }

        const newData = [...data, { id, word: word.toLowerCase() }]
        setWordsToLocalStorage(newData)
        set({ words: newData })
    },
    reset: () => {},
    removeWord: (id) => {
        const data = getWordsFromLocalStorage()
        const newData = [...data.filter((w) => w.id !== id)]
        setWordsToLocalStorage(newData)
        set({ words: newData })
    },
}))

export default useWords
