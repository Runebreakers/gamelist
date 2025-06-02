'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function MoreDescription({ req, genre, developer, imgs, relDate }){

    const [showMore, setShowMore] = useState(false)
    const buttonText = showMore ? 'Show less' : 'Show more'

    const screenshotImage = imgs.map(image => <img src={image.image} key={image.id} className='scale-95 opacity-100 hover:scale-100 transition-all duration-200 ease-in-out rounded'/>)

    return (
        <div>
            <div className='flex justify-center mt-8'>
                <div>
                    <button
                        className='rounded bg-gradient-to-br from-amber-600 to-amber-900 flex justify-center w-60 p-1 hover:w-105 transition-all duration-200 ease-in-out mb-5 cursor-pointer'
                        onClick={() => setShowMore(!showMore)}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
            { showMore ?
            <div className='bg-gray-900 rounded p-2'>
                <div>
                    {screenshotImage}
                </div>
                <p>Genre: {genre}</p>
                <p>Developer: {developer}</p>
                <div>
                    <p>Release date: {relDate}</p>
                    { req ?
                        <div className='grid grid-cols-2 grid-rows-4 mt-2'>
                            <h2 className='row-start-1 col-start-1 col-span-2 h-2 text-xl'>Minimum requirements:</h2>
                            <p className='row-start-2 col-start-1'>OS: {req.os}</p>
                            <p className='row-start-3 col-start-1'>Processor: {req.processor}</p>
                            <p className='row-start-2 col-start-2'>Memory: {req.memory}</p>
                            <p className='row-start-4 col-start-1'>Graphics: {req.graphics}</p>
                            <p className='row-start-3 col-start-2'>Free space: {req.storage}</p>
                        </div>
                        : <h3>Platform: Browser</h3>
                    }
                </div>
            </div>
            : null
            }
        </div>
    )

}