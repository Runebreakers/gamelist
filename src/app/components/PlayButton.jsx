'use client'

import Button from './Button'

export default function PlayButton({ gameUrl, desc }) {
    const handleRedirect = (url) => {
        if (url) {
            window.open(url, '_blank')
        } else {
            console.log('Problem with URL')
        }
    }

    return <Button onClick={() => handleRedirect(gameUrl)}>{desc}</Button>
}
