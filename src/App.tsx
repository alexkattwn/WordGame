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
import { cleanText } from '@/utils'

const commands: string[] = ['добавь слово', 'удали слово', 'начни заново']

function App() {
    const [enteredWord, setEnteredWord] = useState<string>('')

    const { addWord, reset, removeByWord } = useWords()
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
            alert(`0 ${text}`)
            const lowerText = text.toLocaleLowerCase()
            alert(`0.1 ${lowerText}`)
            const command = commands.find((command) =>
                lowerText.includes(command)
            )
            alert(`1 ${command}`)
            if (command) {
                switch (command) {
                    case 'добавь слово':
                        const a = text.split(`${command}`)[1]
                        alert(`2 ${a}`)
                        if (a) {
                            const wordToAdd = cleanText(a)
                            alert(`3 ${wordToAdd}`)
                            if (wordToAdd) {
                                addWord(wordToAdd)
                            }
                        }
                        break
                    case 'удали слово':
                        const b = text.split(`${command}`)[1]
                        if (b) {
                            const wordToRemove = cleanText(
                                text.split(`${command} `)[1]
                            )
                            if (wordToRemove) {
                                removeByWord(wordToRemove)
                            }
                        }
                        break
                    case 'начни заново':
                        reset()
                        break
                    default:
                        break
                }
            }
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
