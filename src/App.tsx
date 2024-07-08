import { useState } from 'react'
import { PiMicrophoneLight, PiMicrophoneSlash } from 'react-icons/pi'
import { IoAdd } from 'react-icons/io5'

import Input from '@components/Input'
import ListWords from '@components/ListWords'
import useWords from '@/hooks/useWords'

function App() {
    const [enteredWord, setEnteredWord] = useState<string>('')
    const [isMicroEnabled, _] = useState<boolean>(false)

    const { addWord } = useWords()

    const handleAddWord = () => {
        if (enteredWord) {
            addWord(enteredWord)
            setEnteredWord('')
        }
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
        </div>
    )
}

export default App
