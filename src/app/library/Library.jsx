'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaSearch as SearchIcon } from 'react-icons/fa'
import Spinner from '../components/Loading'
import FavoriteButton from '../components/FavoriteButton'

async function getGameTrailer(gameTitle){
    const res = await fetch(`/api/youtube?title=${encodeURIComponent(gameTitle)}`)
    const data = await res.json()
    
    const videoId = data.items?.[0]?.id?.videoId
    return videoId
}

export default function Library(){
    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchVal, setSearchVal] = useState('')
    const [hoveredGameId, setHoveredGameId] = useState(null)
    const [videoIds, setVideoIds] = useState({})

    useEffect(() => {
        fetch('https://cors-anywhere.herokuapp.com/https://www.freetogame.com/api/games')
        .then(res => res.json())
        .then(data => {
            setData(data)
            setLoading(false)
        })
        .catch(err => {
            console.error('Fetching error: ', err)
            setLoading(false)
        })
    }, [])

    const handleOnMouseEnter = async (game) => {
        setHoveredGameId(game.id)
        if (!videoIds[game.id]) {
            const id = await getGameTrailer(game.title)
            if (id) {
                setVideoIds(prev => ({...prev, [game.id]: id}))
            }
        }
    }
    
    const handleOnMouseLeave = () => {
        setHoveredGameId(null)
    }

    const filteredGames = searchVal ? data.filter(game => (
        game.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        game.genre.toLowerCase().includes(searchVal.toLowerCase())
    )) : data
    
    const gameCard = filteredGames.map(game => (

        <div 
            key={game.id} 
            className='bg-amber-700 w-91 h-70 rounded inline-block ml-5 mb-6 transition-all hover:scale-102 ease-in-out duration-200 cursor-pointer relative overflow-visible'
            onMouseEnter={() => handleOnMouseEnter(game)}
            onMouseLeave={handleOnMouseLeave}
        >
            <Link href={`/library/${game.id}`}>
                <img 
                    src={game.thumbnail} 
                    className='rounded-b-none rounded'
                    alt={`${game.title} image`}
                />
                <div className='pl-1'>
                    <h1>{game.title.length > 28 ? game.title.slice(0, 28) + '...' : game.title}</h1>
                    <p>{game.genre}</p>
                </div>
            </Link>

            {hoveredGameId === game.id && videoIds[game.id] && (
                <Link href={`/library/${game.id}`}>
                    <div className='absolute inset-0 z-20'>
                        <iframe 
                            className='w-full h-51.5'
                            src={`https://www.youtube.com/embed/${videoIds[game.id]}?autoplay=1&mute=1&controls=0&rel=0&showinfo=0`}   
                            allow='autoplay'                 
                        />
                    </div>
                </Link>
            )}

            <div className='absolute bottom-4 right-3 z-30 text-xl hover:scale-110 ease-in-out duration-200'>
                <FavoriteButton 
                    gameId={game.id}
                />
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
            <div className='ml-40 mb-5 flex'>
                <SearchIcon 
                    className='size-5 mr-1 mt-1.5'
                />
                <input
                    type='text'
                    placeholder='Search by name or genre...'
                    aria-label='search input'
                    onChange={e => setSearchVal(e.target.value)}
                    className='border-amber-700 border-2 rounded p-1 pl-4 w-80'
                />
            </div>
            <div className='inline-block ml-35'>
                {gameCard}
            </div>
        </div>
    )

}