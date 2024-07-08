import { create } from 'zustand'

interface ModalStore {
    showModal: boolean
    setShowModal: () => void
}

const useModal = create<ModalStore>((set) => ({
    showModal: false,
    setShowModal: () =>
        set((state) => ({
            showModal: !state.showModal,
        })),
}))

export default useModal
