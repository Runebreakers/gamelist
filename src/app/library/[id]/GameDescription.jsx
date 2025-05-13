'use client'

import { useState } from 'react'
import { 
    FaCircleChevronUp as UpArrow, 
    FaCircleChevronDown as DownArrow 
    } from "react-icons/fa6";

export default function GameDescription( { description } ){

    const [expanded, setExpanded] = useState(false)

    return (
        <div>
            <div 
                className={`overflow-hidden transition-all duration-700 ease-in-out 
                ${ expanded ? 'max-h-350' : 'max-h-20' }`}
            >
                <p>{expanded ? description : description.slice(0, 120) + '...'}</p>
            </div>
            <div className='flex justify-end  mt-2'>
                <button
                    onClick={() => setExpanded(!expanded)}
                    className='hover: cursor-pointer '
                >
                    {expanded ? 
                    <UpArrow className='w-7 h-7 transition-all duration-500 text-amber-700 hover:text-amber-500'/> 
                    : 
                    <DownArrow className='w-7 h-7 transition-all duration-500 text-amber-700 hover:text-amber-500' />}
                </button>
            </div>
        </div>
    )


}