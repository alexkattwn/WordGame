import { useEffect, useState } from 'react'
import {
    PiGearSixLight,
    PiMicrophoneLight,
    PiMicrophoneSlash,
} from 'react-icons/pi'
import { IoAdd } from 'react-icons/io5'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { AiOutlineBarChart } from 'react-icons/ai'

import Input from '@components/Input'
import ListWords from '@components/ListWords'
import useWords from '@/hooks/useWords'
import useModal from '@/hooks/useModal'
import Modal from '@components/Modal'
import useSpeechRecognition from '@/hooks/useSpeechRecognition'
import SettingsAndReference from '@/components/SettingsAndReferences'
import { STATISTIC_ROUTE } from '@/constants'

import cls from '@/pages/home/index.module.scss'

const HomePage: React.FC = () => {
    const [enteredWord, setEnteredWord] = useState<string>('')

    const { addWord, reset, useVoiceCommands } = useWords()
    const { setShowModal } = useModal()

    const navigate = useNavigate()

    const {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport,
    } = useSpeechRecognition()

    const handleAddWord = () => {
        if (enteredWord) {
            addWord(enteredWord)
            setEnteredWord('')
        }
    }

    const handleReset = () => {
        reset()
        setShowModal()
    }

    const handleUseMicro = () => {
        if (hasRecognitionSupport) {
            if (isListening) {
                stopListening()
            } else {
                startListening()
            }
        } else {
            toast.error('Голосовой ввод не поддерживается')
        }
    }

    useEffect(() => {
        if (text) {
            useVoiceCommands(text)
            setEnteredWord(text)
        }
    }, [text])

    const handleGoToStatistic = () => navigate(STATISTIC_ROUTE)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cls.container}
        >
            <div className={cls.container__topBlock}>
                <Input
                    label='Новое слово'
                    onChange={(e) => setEnteredWord(e.target.value)}
                    onClear={() => setEnteredWord('')}
                    id='entered-word'
                    type='text'
                    value={enteredWord}
                />
                <button
                    className={cls.container__topBlock__btnMicro}
                    onClick={handleUseMicro}
                >
                    {isListening ? (
                        <PiMicrophoneLight size={28} />
                    ) : (
                        <PiMicrophoneSlash size={28} />
                    )}
                </button>
                <button
                    className={cls.container__topBlock__btnAddWord}
                    onClick={handleAddWord}
                >
                    <span>Добавить</span>
                    <IoAdd size={28} />
                </button>
            </div>
            <ListWords />
            <button
                className={cls.container__btnGearWheel}
                onClick={() => setShowModal()}
            >
                <PiGearSixLight size={34} />
            </button>
            <button
                className={cls.container__btnGoToStatistic}
                onClick={handleGoToStatistic}
            >
                <AiOutlineBarChart size={34} />
            </button>
            <Modal>
                <SettingsAndReference handleReset={handleReset} />
            </Modal>
        </motion.div>
    )
}

export default HomePage
