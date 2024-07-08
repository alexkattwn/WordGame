import { useState } from 'react'
import {
    PiGearSixLight,
    PiMicrophoneLight,
    PiMicrophoneSlash,
} from 'react-icons/pi'
import { IoAdd } from 'react-icons/io5'

import Input from '@components/Input'
import ListWords from '@components/ListWords'
import useWords from '@/hooks/useWords'
import useModal from '@/hooks/useModal'
import Modal from '@components/Modal'
import { GrPowerReset } from 'react-icons/gr'

function App() {
    const [enteredWord, setEnteredWord] = useState<string>('')
    const [isMicroEnabled, _] = useState<boolean>(false)

    const { addWord, reset } = useWords()
    const { setShowModal } = useModal()

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
                <button className='btn-micro'>
                    {isMicroEnabled ? (
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
                </div>
            </Modal>
        </div>
    )
}

export default App
