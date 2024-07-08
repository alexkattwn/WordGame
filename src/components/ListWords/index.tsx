import { useEffect } from 'react'

import useWords from '@/hooks/useWords'
import ItemWord from '@components/ItemWord'

import cls from '@components/ListWords/index.module.scss'

const ListWords: React.FC = () => {
    const { getWords, words, removeWord } = useWords()

    useEffect(() => {
        getWords()
    }, [])

    const handleRemoveWord = (id: number) => removeWord(id)

    return (
        <div className={cls.block}>
            {words.length > 0 ? (
                <div className={cls.block__list}>
                    {words.map((w) => (
                        <ItemWord
                            word={w}
                            key={w.id}
                            removeWord={handleRemoveWord}
                        />
                    ))}
                </div>
            ) : (
                <span>Список пока пуст...</span>
            )}
            {words.length > 0 && <span>{`Всего слов ${words.length}`}</span>}
        </div>
    )
}

export default ListWords
