import Button from './Button'
import Link from 'next/link'

export default function MainPage() {
    return (
        <div className="font-revalia mt-50 flex flex-col">
            <h1 className="mr-auto mb-4 ml-auto h-10 text-5xl font-extrabold">
                Welcome to Gamelist!
            </h1>
            <p className="mr-auto ml-auto text-3xl">
                THE place to browse your games!
            </p>
            <Link href={'/library'} className="mt-10 mr-auto ml-auto flex">
                <Button aria-label="library-button" type="button">
                    Library
                </Button>
            </Link>
        </div>
    )
}
