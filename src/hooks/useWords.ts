import { create } from 'zustand'
import toast from 'react-hot-toast'

import { IWord } from '@/types'
import {
    getWordsFromLocalStorage,
    removeWordsFromLocalStorage,
    setWordsToLocalStorage,
} from '@/helpers/localStorage.helper'
import { cleanText, getCountWordsSpelled, getUniqueFirstLetters } from '@/utils'

interface WordsStore {
    words: IWord[]
    getWords: () => void
    addWord: (word: string) => void
    reset: () => void
    removeWord: (word: string) => void
    useVoiceCommands: (text: string) => void
    sortingListWords: (word: string) => void
    getStatistics: () => { firstLetters: string[]; countWordsSpelled: number[] }
    downloadResults: () => void
    uploadWordsFromFile: (file: File) => void
}

const useWords = create<WordsStore>((set, get) => ({
    words: [],
    getWords: () => {
        const data = getWordsFromLocalStorage()
        set({ words: data })
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
    removeWord: (word) => {
        const data = getWordsFromLocalStorage()
        const newData = [...data.filter((w) => w.word !== word)]
        setWordsToLocalStorage(newData)
        set({ words: newData.reverse() })
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
    getStatistics: () => {
        const data = getWordsFromLocalStorage()
        const firstLetters = getUniqueFirstLetters(data)
        const countWordsSpelled = getCountWordsSpelled(firstLetters, data)

        return { firstLetters, countWordsSpelled }
    },
    downloadResults: () => {
        const data = getWordsFromLocalStorage()
        const fileContent = JSON.stringify(data)

        const blob = new Blob([fileContent], {
            type: 'text/plain;charset=utf-8',
        })

        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `${Date.now()}.txt`

        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
    },
    uploadWordsFromFile: (file) => {
        const reader = new FileReader()

        reader.onload = (e) => {
            const content = e.target?.result as string
            const data: IWord[] = JSON.parse(content)
            setWordsToLocalStorage(data)

            set({ words: data.reverse() })
        }

        reader.readAsText(file)
    },
}))

export default useWords
