import { AnimatePresence } from 'framer-motion'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
    return (
        <>
            <AnimatePresence>
                <Outlet />
            </AnimatePresence>
        </>
    )
}

export default Layout
