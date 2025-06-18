'use client'

import { useState } from 'react'

export default function MoreDescription({
    req,
    genre,
    developer,
    imgs,
    relDate,
}) {
    const [showMore, setShowMore] = useState(false)
    const buttonText = showMore ? 'Show less' : 'Show more'

    const screenshotImage = imgs.map((image) => (
        <img
            src={image.image}
            key={image.id}
            className="scale-95 rounded opacity-100 transition-all duration-200 ease-in-out hover:scale-100"
        />
    ))

    return (
        <div>
            <div className="mt-8 flex justify-center">
                <div>
                    <button
                        className="mb-5 flex w-60 cursor-pointer justify-center rounded bg-gradient-to-br from-amber-600 to-amber-900 p-1 transition-all duration-200 ease-in-out hover:w-105"
                        onClick={() => setShowMore(!showMore)}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
            {showMore ? (
                <div className="rounded bg-gray-900 p-2">
                    <div>{screenshotImage}</div>
                    <p>Genre: {genre}</p>
                    <p>Developer: {developer}</p>
                    <div>
                        <p>Release date: {relDate}</p>
                        {req ? (
                            <div className="mt-2 grid grid-cols-2 grid-rows-4">
                                <h2 className="col-span-2 col-start-1 row-start-1 h-2 text-xl">
                                    Minimum requirements:
                                </h2>
                                <p className="col-start-1 row-start-2">
                                    OS: {req.os}
                                </p>
                                <p className="col-start-1 row-start-3">
                                    Processor: {req.processor}
                                </p>
                                <p className="col-start-2 row-start-2">
                                    Memory: {req.memory}
                                </p>
                                <p className="col-start-1 row-start-4">
                                    Graphics: {req.graphics}
                                </p>
                                <p className="col-start-2 row-start-3">
                                    Free space: {req.storage}
                                </p>
                            </div>
                        ) : (
                            <h3>Platform: Browser</h3>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    )
}
