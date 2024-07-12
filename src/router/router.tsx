import { createBrowserRouter } from 'react-router-dom'

import Layout from '@/components/Layout'
import { HOME_ROUTE, STATISTIC_ROUTE } from '@/constants'
import HomePage from '@/pages/home'
import StatisticPage from '@/pages/statistic'

const router = createBrowserRouter([
    {
        path: HOME_ROUTE,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: STATISTIC_ROUTE,
                element: <StatisticPage />,
            },
        ],
    },
])

export default router
