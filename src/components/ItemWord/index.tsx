import { IoTrashOutline } from 'react-icons/io5'

import { IWord } from '@/types'

import cls from '@components/ItemWord/index.module.scss'

interface ItemWordProps {
    word: IWord
    removeWord: (id: number) => void
}

const ItemWord: React.FC<ItemWordProps> = ({ word, removeWord }) => (
    <div className={cls.item}>
        <span className={cls.item__id}>{`#${word.id}`}</span>
        <span className={cls.item__word}>{word.word}</span>
        <button
            className={cls.item__remove}
            onClick={() => removeWord(word.id)}
        >
            <IoTrashOutline size={28} />
        </button>
    </div>
)
export default ItemWord
