'use client'

import React from 'react'


export default function Button({ children }){
    
    const handleOnClick = () => {
        console.log('clicked')
    }

    return (
        
        <button
            className='bg-amber-700 w-28 h-10 ml-auto mr-auto rounded mt-10 cursor-pointer flex justify-center items-center transform transition-all duration-150 ease-in-out scale-100 hover:scale-115 active:scale-100 focus:outline-none'
            onClick={handleOnClick}
        >
            {children}
        </button>
        
    )

}