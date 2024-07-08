import { AnimatePresence, motion } from 'framer-motion'

import useModal from '@/hooks/useModal'

import cls from '@components/Modal/index.module.scss'

interface ModalProps {
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ children }) => {
    const { showModal, setShowModal } = useModal()

    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cls.modal}
                    onClick={() => setShowModal()}
                >
                    <div
                        className={cls.modal__content}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Modal
