import { useEffect, useRef, useState } from 'react'
import { IoCloseOutline, IoSearchSharp } from 'react-icons/io5'

import useWords from '@/hooks/useWords'

import cls from '@components/Input/index.module.scss'

interface InputProps {
    id: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClear: () => void
    value: string
    label: string
    type?: string
}

const Input: React.FC<InputProps> = ({
    id,
    onChange,
    onClear,
    value,
    label,
    type,
}) => {
    const [isSearch, setIsSearch] = useState<boolean>(false)

    const ref = useRef<HTMLInputElement>(null)

    const { sortingListWords } = useWords()

    useEffect(() => {
        if (isSearch) {
            sortingListWords(value)
        }
    }, [value])

    useEffect(() => {
        if (isSearch && ref.current) {
            ref.current.focus()
        }
    }, [isSearch])

    return (
        <div className={cls.main}>
            <button
                className={`${cls.main__search} ${isSearch ? cls.active : ''}`}
                onClick={() => setIsSearch(!isSearch)}
            >
                <IoSearchSharp size={32} />
            </button>
            <div className={cls.block}>
                <input
                    ref={ref}
                    onChange={onChange}
                    value={value}
                    type={type}
                    id={id}
                    className={cls.block__input}
                    placeholder=''
                />
                <label className={cls.block__label} htmlFor={id}>
                    {label}
                </label>
            </div>
            {!!value && (
                <button className={cls.main__clear} onClick={onClear}>
                    <IoCloseOutline size={32} />
                </button>
            )}
        </div>
    )
}

export default Input
