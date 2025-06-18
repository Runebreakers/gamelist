import GameDescription from './GameDescription'
import PlayButton from '../../components/PlayButton'
import MoreDescription from './MoreDescription'

async function getGame(id) {
    const res = await fetch(`https://www.freetogame.com/api/game?id=${id}`)

    if (!res.ok) {
        throw new Error(`Failed to fetch game: ${res.status} ${res.statusText}`)
    }

    return res.json()
}

export default async function LibraryGameDetail({ params }) {
    try {
        const { id } = await params
        const game = await getGame(id)
        const {
            thumbnail,
            title,
            description,
            publisher,
            game_url,
            minimum_system_requirements,
            genre,
            developer,
            release_date,
            screenshots,
            platform,
        } = game
        console.log(game)

        return (
            <main className="font-revalia mt-15 mr-auto ml-auto flex max-w-210">
                <div className="mr-10 flex-col">
                    <img src={thumbnail} className="justify-start rounded" />
                    <div className="flex items-center justify-center pb-8">
                        <PlayButton gameUrl={game_url} desc={'PLAY NOW'} />
                    </div>
                </div>
                <div className="w-110 p-2">
                    <h1 className="mb-2 text-2xl">{title}</h1>
                    <h2 className="mb-2 text-xl">{publisher}</h2>
                    <h3 className="text-xl">Description:</h3>
                    <GameDescription description={description} />
                    <MoreDescription
                        req={minimum_system_requirements}
                        genre={genre}
                        developer={developer}
                        imgs={screenshots}
                        relDate={release_date}
                        webBrowser={platform === 'Web Browser' ? true : false}
                    />
                </div>
            </main>
        )
    } catch (err) {
        console.error(err)
        return <h1>There was a problem fetching the game.</h1>
    }
}
