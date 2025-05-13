'use client'

import Button from './Button'

export default function PlayButton( { gameUrl, desc } ) {

    const handleRedirect = url => {
        url ? window.open(url, '_blank') : console.log('Problem with URL')
    }

    return (
        <Button onClick={() => handleRedirect(gameUrl)}>{desc}</Button>
    )

}