'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaSearch as SearchIcon } from 'react-icons/fa'
import Spinner from '../components/Loading'
import FavoriteButton from '../components/FavoriteButton'

async function getGameTrailer(gameTitle) {
    const res = await fetch(
        `/api/youtube?title=${encodeURIComponent(gameTitle)}`,
    )
    const data = await res.json()

    const videoId = data.items?.[0]?.id?.videoId
    return videoId
}

export default function Library() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchVal, setSearchVal] = useState('')
    const [hoveredGameId, setHoveredGameId] = useState(null)
    const [videoIds, setVideoIds] = useState({})

    useEffect(() => {
        fetch(
            'https://cors-anywhere.herokuapp.com/https://www.freetogame.com/api/games',
        )
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
            .catch((err) => {
                console.error('Fetching error: ', err)
                setLoading(false)
            })
    }, [])

    const handleOnMouseEnter = async (game) => {
        setHoveredGameId(game.id)
        if (!videoIds[game.id]) {
            const id = await getGameTrailer(game.title)
            if (id) {
                setVideoIds((prev) => ({ ...prev, [game.id]: id }))
            }
        }
    }

    const handleOnMouseLeave = () => {
        setHoveredGameId(null)
    }

    const filteredGames = searchVal
        ? data.filter(
              (game) =>
                  game.title.toLowerCase().includes(searchVal.toLowerCase()) ||
                  game.genre.toLowerCase().includes(searchVal.toLowerCase()),
          )
        : data

    const gameCard = filteredGames.map((game) => (
        <div
            key={game.id}
            className="relative mb-6 ml-5 inline-block h-70 w-91 cursor-pointer overflow-visible rounded bg-amber-700 transition-all duration-200 ease-in-out hover:scale-102"
            onMouseEnter={() => handleOnMouseEnter(game)}
            onMouseLeave={handleOnMouseLeave}
        >
            <Link href={`/library/${game.id}`}>
                <img
                    src={game.thumbnail}
                    className="rounded rounded-b-none"
                    alt={`${game.title}`}
                />
                <div className="pl-1">
                    <h1>
                        {game.title.length > 28
                            ? game.title.slice(0, 28) + '...'
                            : game.title}
                    </h1>
                    <p>{game.genre}</p>
                </div>
            </Link>

            {hoveredGameId === game.id && videoIds[game.id] && (
                <Link href={`/library/${game.id}`}>
                    <div className="absolute inset-0 z-20">
                        <iframe
                            title={`${game.title} trailer`}
                            className="h-51.5 w-full"
                            src={`https://www.youtube.com/embed/${videoIds[game.id]}?autoplay=1&mute=1&controls=0&rel=0&showinfo=0`}
                            allow="autoplay"
                        />
                    </div>
                </Link>
            )}

            <div className="absolute right-3 bottom-4 z-30 text-xl duration-200 ease-in-out hover:scale-110">
                <FavoriteButton gameId={game.id} />
            </div>
        </div>
    ))

    if (loading) {
        return <Spinner />
    }

    if (!gameCard) {
        return <h1>Problem with getting your game :(.</h1>
    }

    return (
        <div>
            <div className="mb-5 ml-40 flex">
                <SearchIcon className="mt-1.5 mr-1 size-5" />
                <input
                    type="text"
                    placeholder="Search by name or genre..."
                    aria-label="search input"
                    onChange={(e) => setSearchVal(e.target.value)}
                    className="w-80 rounded border-2 border-amber-700 p-1 pl-4"
                />
            </div>
            <div className="ml-35 inline-block">{gameCard}</div>
        </div>
    )
}
