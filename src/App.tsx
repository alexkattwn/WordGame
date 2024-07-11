import { useEffect, useState } from 'react'
import {
    PiGearSixLight,
    PiMicrophoneLight,
    PiMicrophoneSlash,
} from 'react-icons/pi'
import { IoAdd } from 'react-icons/io5'
import { GrPowerReset } from 'react-icons/gr'
import toast from 'react-hot-toast'

import Input from '@components/Input'
import ListWords from '@components/ListWords'
import useWords from '@/hooks/useWords'
import useModal from '@/hooks/useModal'
import Modal from '@components/Modal'
import useSpeechRecognition from '@/hooks/useSpeechRecognition'

function App() {
    const [enteredWord, setEnteredWord] = useState<string>('')

    const { addWord, reset, useVoiceCommands } = useWords()
    const { setShowModal } = useModal()

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

    return (
        <div className='container'>
            <div className='top-block'>
                <Input
                    label='Новое слово'
                    onChange={(e) => setEnteredWord(e.target.value)}
                    onClear={() => setEnteredWord('')}
                    id='entered-word'
                    type='text'
                    value={enteredWord}
                />
                <button className='btn-micro' onClick={handleUseMicro}>
                    {isListening ? (
                        <PiMicrophoneLight size={28} />
                    ) : (
                        <PiMicrophoneSlash size={28} />
                    )}
                </button>
                <button className='btn-add-word' onClick={handleAddWord}>
                    <span>Добавить</span>
                    <IoAdd size={28} />
                </button>
            </div>
            <ListWords />
            <button className='btn-gear-wheel' onClick={() => setShowModal()}>
                <PiGearSixLight size={34} />
            </button>
            <Modal>
                <div className='modal-main'>
                    <button className='btn-reset' onClick={handleReset}>
                        <span>Сбросить</span>
                        <GrPowerReset size={28} />
                    </button>
                    <div className='command-list'>
                        <span>Список голосовых команд:</span>
                        <span>{`1. добавь слово <слово>`}</span>
                        <span>{`2. удали слово <слово>`}</span>
                        <span>3. начни заново</span>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default App
