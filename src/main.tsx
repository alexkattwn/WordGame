import React from 'react'
import ReactDOM from 'react-dom/client'

import ToasterProvider from '@/providers/ToasterProvider'
import App from '@/App.tsx'

import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ToasterProvider />
        <App />
    </React.StrictMode>
)
