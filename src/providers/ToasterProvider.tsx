import { Toaster } from 'react-hot-toast'

const ToasterProvider: React.FC = () => {
    return (
        <Toaster
            toastOptions={{
                style: {
                    background: '#333',
                    color: '#fff',
                },
                position: 'top-center',
            }}
        />
    )
}

export default ToasterProvider
