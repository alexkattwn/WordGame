import { IoCloseOutline, IoSearchSharp } from 'react-icons/io5'

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
    value,
    label,
    type,
    onClear,
}) => {
    return (
        <div className={cls.main}>
            <span className={cls.main__search}>
                <IoSearchSharp size={32} />
            </span>
            <div className={cls.block}>
                <input
                    onChange={onChange}
                    value={value}
                    type={type}
                    id={id}
                    className={cls.block__input}
                    placeholder=' '
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
