import { create } from 'zustand'
import toast from 'react-hot-toast'

import { IWord } from '@/types'
import {
    getWordsFromLocalStorage,
    removeWordsFromLocalStorage,
    setWordsToLocalStorage,
} from '@/helpers/localStorage.helper'
import { cleanText } from '@/utils'

interface WordsStore {
    words: IWord[]
    getWords: () => void
    addWord: (word: string) => void
    reset: () => void
    removeWord: (id: number) => void
    removeByWord: (word: string) => void
}

const useWords = create<WordsStore>((set) => ({
    words: [],
    getWords: () => {
        const data = getWordsFromLocalStorage()
        set({ words: data.reverse() })
    },
    addWord: (word) => {
        const data = getWordsFromLocalStorage()

        const validatedWord = cleanText(word)

        if (data.find((w) => w.word === validatedWord)) {
            toast.error('Такое слово уже есть')
            return
        }

        let id

        if (data.length === 0) {
            id = 1
        } else {
            const lastElement = data.reduce((max, current) => {
                return current.id > max.id ? current : max
            }, data[0])

            id = lastElement.id + 1

            let lastLetter = lastElement.word[lastElement.word.length - 1]

            if (lastLetter === 'ь' || lastLetter === 'ъ') {
                lastLetter = lastElement.word[lastElement.word.length - 2]
            }

            if (lastLetter !== validatedWord[0]) {
                toast.error(`Слово должно начинаться на букву "${lastLetter}"`)
                return
            }
        }

        const newData = [...data, { id, word: validatedWord }]
        setWordsToLocalStorage(newData)
        set({ words: newData.reverse() })
    },
    reset: () => {
        removeWordsFromLocalStorage()
        set({ words: [] })
    },
    removeWord: (id) => {
        const data = getWordsFromLocalStorage()
        const newData = [...data.filter((w) => w.id !== id)]
        setWordsToLocalStorage(newData)
        set({ words: newData.reverse() })
    },
    removeByWord: (word: string) => {
        const data = getWordsFromLocalStorage()
        const newData = [...data.filter((w) => w.word !== word)]
        setWordsToLocalStorage(newData)
        set({ words: newData.reverse() })
    },
}))

export default useWords
