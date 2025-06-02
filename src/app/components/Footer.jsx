

export default function Footer(){

    

    const date = new Date()
    const year = date.getFullYear()
    

    return (
        <footer className='items-center justify-center flex p-4 bg-gradient-to-br from-amber-600 to-amber-800 sticky bottom-0 z-100'>
            {year} Development project
        </footer>
    )

}