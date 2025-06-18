export default function About() {
    return (
        <div className="flex-column font-revalia mt-auto mr-auto mb-auto ml-auto h-2/3 justify-center rounded-md border-2 border-amber-700 p-5 pt-2 pb-130">
            <h1 className="flex justify-center text-4xl">About Gamelist</h1>
            <div className="mt-5 flex justify-center text-2xl">
                <ul>
                    <li>
                        Gamelist is the ultimate listing site for your games.
                    </li>
                    <hr />
                    <li>You can store all games on your local machine here.</li>
                    <hr />
                    <li>
                        It provides cleaner, modern UI that is easy to navigate.
                    </li>
                    <hr />
                    <li>
                        Logged in users can also connect their Steam profile to
                        display their Steam library.
                    </li>
                    <hr />
                </ul>
            </div>
        </div>
    )
}
