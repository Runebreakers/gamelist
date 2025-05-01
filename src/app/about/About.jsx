import React from 'react'


export default function About(){
    
    
    return (
        <div className='flex-column justify-center border-2 rounded-md border-amber-700 mr-100 ml-100 mt-10 pb-130 pt-2 h-2/3 '>
            <h1 className='flex text-4xl justify-center'>About Gamelist</h1>
            <div className='flex mt-5 text-2xl justify-center'>
                <ul>
                    <li>Gamelist is the ultimate listing site for your games.</li>
                    <br />
                    <li>You can store all games on your local machine here.</li>
                    <br />
                    <li>It provides cleaner, modern UI that is easy to navigate.</li>
                    <br />
                    <li>Logged in users can also connect their Steam profile to display their Steam library.</li> 
                </ul>
            </div>
        </div>
    )
}