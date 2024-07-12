import { GrPowerReset } from 'react-icons/gr'

import cls from '@components/SettingsAndReferences/index.module.scss'

interface SettingsAndReferencesProps {
    handleReset: () => void
}

const SettingsAndReferences: React.FC<SettingsAndReferencesProps> = ({
    handleReset,
}) => {
    return (
        <div className={cls.modalMain}>
            <button className={cls.modalMain__btnReset} onClick={handleReset}>
                <span>Сбросить</span>
                <GrPowerReset size={28} />
            </button>
            <div className={cls.modalMain__commandList}>
                <span>Список голосовых команд:</span>
                <div className={cls.modalMain__commandList__elems}>
                    <span>{`1. добавь слово <слово>`}</span>
                    <span>{`2. удали слово <слово>`}</span>
                    <span>3. начни заново</span>
                </div>
            </div>
        </div>
    )
}

export default SettingsAndReferences
