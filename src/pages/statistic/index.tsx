import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { IoArrowBackCircleOutline } from 'react-icons/io5'

import GraphicBar from '@/components/GraphicBar'
import { HOME_ROUTE } from '@/constants'

import cls from '@/pages/statistic/index.module.scss'

const StatisticPage: React.FC = () => {
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(HOME_ROUTE)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cls.container}
        >
            <h2 className={cls.container__header}>Статистика</h2>
            <button className={cls.container__back} onClick={handleGoBack}>
                <IoArrowBackCircleOutline size={34} />
                <span>Назад</span>
            </button>
            <GraphicBar />
        </motion.div>
    )
}

export default StatisticPage
