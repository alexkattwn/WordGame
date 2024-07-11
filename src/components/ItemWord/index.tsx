import { IoTrashOutline } from 'react-icons/io5'

import { IWord } from '@/types'

import cls from '@components/ItemWord/index.module.scss'
import { motion } from 'framer-motion'

interface ItemWordProps {
    word: IWord
    removeWord: (word: string) => void
    index: number
}

const ItemWord: React.FC<ItemWordProps> = ({ word, removeWord, index }) => (
    <motion.div
        className={cls.item}
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 150, opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
    >
        <span className={cls.item__id}>{`#${word.id}`}</span>
        <span className={cls.item__word}>{word.word}</span>
        <button
            className={cls.item__remove}
            onClick={() => removeWord(word.word)}
        >
            <IoTrashOutline size={28} />
        </button>
    </motion.div>
)

export default ItemWord
