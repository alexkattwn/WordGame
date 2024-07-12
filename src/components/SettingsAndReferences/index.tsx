import { GrPowerReset } from 'react-icons/gr'
import { IoDownloadOutline } from 'react-icons/io5'
import { MdOutlineFileUpload } from 'react-icons/md'

import useWords from '@/hooks/useWords'
import useModal from '@/hooks/useModal'

import cls from '@components/SettingsAndReferences/index.module.scss'

interface SettingsAndReferencesProps {
    handleReset: () => void
}

const SettingsAndReferences: React.FC<SettingsAndReferencesProps> = ({
    handleReset,
}) => {
    const { downloadResults, uploadWordsFromFile } = useWords()
    const { setShowModal } = useModal()

    const handleDownloadResults = () => downloadResults()

    const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            uploadWordsFromFile(file)
            setShowModal()
        }
    }

    return (
        <div className={cls.modalMain}>
            <div className={cls.modalMain__fileBlock}>
                <button
                    className={cls.modalMain__fileBlock__btnReset}
                    onClick={handleReset}
                >
                    <GrPowerReset size={26} />
                    <span>Сбросить</span>
                </button>
                <button
                    onClick={handleDownloadResults}
                    className={cls.modalMain__fileBlock__btnDownload}
                >
                    <IoDownloadOutline size={26} />
                    <span>Скачать</span>
                </button>
                <div className={cls.modalMain__fileBlock__upload}>
                    <label
                        htmlFor='upload-label'
                        className={cls.modalMain__fileBlock__upload__label}
                    >
                        <MdOutlineFileUpload size={26} />
                        <span>Загрузить</span>
                    </label>
                    <input
                        onChange={handleUploadFile}
                        type='file'
                        id='upload-label'
                        className={cls.modalMain__fileBlock__upload__input}
                        accept='.txt'
                    />
                </div>
            </div>
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
