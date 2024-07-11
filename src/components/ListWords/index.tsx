import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

import useWords from '@/hooks/useWords'
import ItemWord from '@components/ItemWord'

import cls from '@components/ListWords/index.module.scss'

const ListWords: React.FC = () => {
    const { getWords, words, removeWord } = useWords()

    useEffect(() => {
        getWords()
    }, [])

    const handleRemoveWord = (word: string) => removeWord(word)

    return (
        <div className={cls.block}>
            {words.length > 0 ? (
                <div className={cls.block__list}>
                    <AnimatePresence>
                        {words.map((w, i) => (
                            <ItemWord
                                word={w}
                                key={w.id}
                                removeWord={handleRemoveWord}
                                index={i}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <span>Список пока пуст...</span>
            )}
            {words.length > 0 && <span>{`Всего слов ${words.length}`}</span>}
        </div>
    )
}

export default ListWords
