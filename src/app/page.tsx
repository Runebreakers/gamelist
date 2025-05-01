import React from 'react'
import MainNavbar from './components/MainNavbar'
import MainPage from './components/MainPage'
import Footer from './components/Footer'

export default function App(){

    return (
        <div className='h-screen flex flex-col justify-between'>
          <div className='flex-1'>
            <MainNavbar />
            <MainPage />
          </div>
          <div className='sticky bottom-0'>
            <Footer />
          </div>
        </div>
      )

}