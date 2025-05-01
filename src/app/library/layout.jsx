import React from 'react'
import MainNavbar from '../components/MainNavbar'
import Footer from '../components/Footer'

export default function LibraryLayout({ children }){

    return (
        <div className='h-screen flex flex-col justify-between'>
            <div className='flex-1'>
                <MainNavbar />
                {children}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
    
}