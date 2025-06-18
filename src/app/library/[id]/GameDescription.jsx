'use client'

import { useState } from 'react'
import {
    FaCircleChevronUp as UpArrow,
    FaCircleChevronDown as DownArrow,
} from 'react-icons/fa6'

export default function GameDescription({ description }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div>
            <div
                className={`overflow-hidden transition-all duration-700 ease-in-out ${expanded ? 'max-h-350' : 'max-h-40'}`}
            >
                <p>
                    {expanded ? description : description.slice(0, 120) + '...'}
                </p>
            </div>
            <div className="mt-2 flex justify-end">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="hover: cursor-pointer"
                >
                    {expanded ? (
                        <UpArrow className="h-7 w-7 text-amber-700 transition-all duration-500 hover:text-amber-500" />
                    ) : (
                        <DownArrow className="h-7 w-7 text-amber-700 transition-all duration-500 hover:text-amber-500" />
                    )}
                </button>
            </div>
        </div>
    )
}
