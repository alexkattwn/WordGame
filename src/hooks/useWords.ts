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
    removeWord: (word: string) => void
    useVoiceCommands: (text: string) => void
    sortingListWords: (word: string) => void
}

const useWords = create<WordsStore>((set, get) => ({
    words: [],
    getWords: () => {
        const data = getWordsFromLocalStorage().reverse()
        set({ words: data })
    },
    addWord: (word) => {
        const data = getWordsFromLocalStorage().reverse()

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
        set({ words: newData })
    },
    reset: () => {
        removeWordsFromLocalStorage()
        set({ words: [] })
    },
    removeWord: (word) => {
        const data = getWordsFromLocalStorage().reverse()
        const newData = [...data.filter((w) => w.word !== word)]
        setWordsToLocalStorage(newData)
        set({ words: newData })
    },
    useVoiceCommands: (text: string) => {
        const commands: string[] = [
            'добавь слово',
            'удали слово',
            'начни заново',
        ]

        const lowerText = text.toLocaleLowerCase()
        const command = commands.find((command) => lowerText.includes(command))

        if (command) {
            switch (command) {
                case 'добавь слово':
                    const a = lowerText.split(`${command}`)[1]
                    if (a) {
                        const wordToAdd = cleanText(a)
                        if (wordToAdd) {
                            get().addWord(wordToAdd)
                        }
                    }
                    break
                case 'удали слово':
                    const b = lowerText.split(`${command}`)[1]
                    if (b) {
                        const wordToRemove = cleanText(b)
                        if (wordToRemove) {
                            get().removeWord(wordToRemove)
                        }
                    }
                    break
                case 'начни заново':
                    get().reset()
                    break
                default:
                    break
            }
        }
    },
    sortingListWords: (word: string) => {
        const data = getWordsFromLocalStorage().reverse()
        set({
            words: [
                ...data.filter((w) =>
                    w.word.includes(word.toLocaleLowerCase())
                ),
            ],
        })
    },
}))

export default useWords
