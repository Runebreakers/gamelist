'use client'

import {
    IoHeartOutline as EmptyFav,
    IoHeartSharp as FullFav,
} from 'react-icons/io5'

import { useState, useEffect } from 'react'

export default function FavoriteButton({ gameId }) {
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        const storedFavorites =
            JSON.parse(localStorage.getItem('favorites')) || []
        setIsFavorite(storedFavorites.includes(gameId))
    }, [gameId])

    const toggleFavorite = () => {
        const storedFavorites =
            JSON.parse(localStorage.getItem('favorites')) || []
        let updatedFavorites

        if (storedFavorites.includes(gameId)) {
            updatedFavorites = storedFavorites.filter((id) => id !== gameId)
        } else {
            updatedFavorites = [...storedFavorites, gameId]
        }

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
        setIsFavorite(!isFavorite)
    }

    const tooltipText = isFavorite
        ? 'Remove from favorites'
        : 'Mark as favorite'

    return (
        <div className="group relative">
            <div className="mt-0.2 pointer-events-none absolute top-full left-1/2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition group-hover:opacity-100">
                {tooltipText}
            </div>
            <button
                onClick={toggleFavorite}
                aria-label={tooltipText}
                className="hover:cursor-pointer"
            >
                {isFavorite ? <FullFav /> : <EmptyFav />}
            </button>
        </div>
    )
}
