import React from 'react'
import MainPage from './components/MainPage'
import { Toaster } from 'react-hot-toast'

export default function App() {
    return (
        <div>
            <div><Toaster/></div>
            <div className="flex h-screen flex-col justify-between">
                <MainPage />
            </div>
        </div>
    )
}
