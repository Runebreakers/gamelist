import React from 'react'

export default function Footer(){

    

    const date = new Date()
    const year = date.getFullYear()
    

    return (
        <footer className='items-center justify-center flex p-4  bg-amber-700 mt-auto sticky bottom-0'>
            {year} Development project
        </footer>
    )

}