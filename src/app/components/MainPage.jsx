

import Button from './Button'
import Link from 'next/link'


export default function MainPage(){
    
    
    return (
        <div className='grid mt-50'>
            <h1 className='h-10 font-extrabold text-5xl ml-auto mr-auto mb-4'>Welcome to Gamelist!</h1>
            <p className='text-3xl ml-auto mr-auto'>THE place to browse your games!</p>
            <Link href={'/library'}>
                    <Button
                        aria-label='library-button'
                    >
                        Library
                    </Button>
            </Link>
        </div>
    )

}