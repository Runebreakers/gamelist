'use client'




export default function Button({ children, onClick }){
    

    return (
        
        <button
            className='bg-gradient-to-br from-amber-600 to-amber-800 w-28 h-10 ml-auto mr-auto rounded mt-10 cursor-pointer flex justify-center items-center transform transition-all duration-150 ease-in-out scale-100 hover:scale-115 active:scale-100 focus:outline-none'
            onClick={onClick}
        >
            {children}
        </button>
        
    )

}