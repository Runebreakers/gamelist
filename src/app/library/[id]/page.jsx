import GameDescription from './GameDescription'
import PlayButton from '../../components/PlayButton'
import MoreDescription from './MoreDescription'


async function getGame(id){

    const res = await fetch(`https://www.freetogame.com/api/game?id=${id}`)

    if (!res.ok){
        throw new Error (`Failed to fetch game: ${res.status} ${res.statusText}`)
    }

    return res.json()

}

export default async function LibraryGameDetail( { params } ){

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
            platform
            } = game
        console.log(game)

        return (
            <main className='flex  mt-15 max-w-210 ml-auto mr-auto font-revalia'>
                <div className='mr-10 flex-col'> 
                    <img src={thumbnail} className='rounded justify-start' />
                    <div className='flex justify-center items-center pb-8'>
                        <PlayButton 
                            gameUrl = {game_url}
                            desc = {'PLAY NOW'}
                        />
                    </div>
                </div>
                <div className='w-110 p-2'>
                    <h1 className='text-2xl mb-2'>{title}</h1>
                    <h2 className='text-xl mb-2'>{publisher}</h2>
                    <h3 className='text-xl'>Description:</h3>
                    <GameDescription 
                        description={description}
                    />
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