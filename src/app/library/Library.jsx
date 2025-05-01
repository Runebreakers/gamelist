'use client'

import React, { useEffect, useState } from 'react'
import { FaSearch as SearchIcon } from 'react-icons/fa'
import Spinner from '../components/Loading.jsx'

export function generateStaticParams(data){
    return data.map(game => (
        {slug: game.title}
    ))
}

export default function Library(){
    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchVal, setSearchVal] = useState('')

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
    
    const filteredGames = searchVal ? data.filter(game => (
        game.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        game.genre.toLowerCase().includes(searchVal.toLowerCase())
    )) : data

    

    const gameCard = filteredGames.map(game => (

        <div 
            key={game.id} 
            className='bg-amber-700 w-91 h-63 rounded inline-block ml-5 mb-5 hover:scale-105 ease-in-out duration-150 cursor-pointer'
        >
            <img 
                src={game.thumbnail} 
                className='rounded-b-none rounded'
                alt={game.title}
            />
            <h1>{game.title}</h1>
            <p>{game.genre}</p>
        </div>

    ))

        
    if (loading) {
        return <Spinner />
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
                    className='border-amber-700 border-2 rounded p-1 focus:scale-155'
                />
            </div>
            <div className='inline-block ml-35'>
                {gameCard}
            </div>
        </div>
    )

}