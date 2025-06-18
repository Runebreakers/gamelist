'use client'

export default function Button({ children, onClick, type }) {
    return (
        <button
            className="mr-auto ml-auto flex h-10 w-28 scale-100 transform cursor-pointer items-center justify-center rounded bg-gradient-to-br from-amber-600 to-amber-800 transition-all duration-150 ease-in-out hover:scale-115 focus:outline-none active:scale-100"
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    )
}
