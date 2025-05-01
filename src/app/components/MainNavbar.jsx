'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { GiAbstract063 as Icon } from "react-icons/gi";



export default function MainNavbar(){
    
    const hoverStyle = 'hover:scale-110 hover:text-amber-700 ease-in-out duration-150'

    const pathname = usePathname()

    const activeStyle = 'text-amber-700'

    const isActive = href => {
        return pathname === href
    }
    
    return (
        <nav className='h-70px flex p-2 justify-around pt-10'>
            <Link 
                href={'/'}
                className={`${hoverStyle} ${isActive('/') ? activeStyle : ''}`}
            >
                <Icon 
                    className='h-10 w-10'
                />
            </Link>

            <div className=' flex items-center px-2  text-2xl'>
                <Link 
                    href={'/'}
                    className={`pr-3 ${hoverStyle} ${isActive('/') ? activeStyle : ''}`}
                >
                    Home
                </Link>

                <Link
                    href={'/library'}
                    className={`pr-3 ${hoverStyle} ${isActive('/library') ? activeStyle : ''}`}
                >
                    Library
                </Link>

                <Link
                    href={'/about'}
                    className={`pr-3 ${hoverStyle} ${isActive('/about') ? activeStyle : ''}`}
                >
                    About
                </Link>
                
                <Link
                    href={'/login'}
                    className={`${hoverStyle} ${isActive('/login') ? activeStyle : ''}`}
                >
                    Login
                </Link>
            </div>
        </nav>
    )
}