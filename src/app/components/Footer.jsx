export default function Footer() {
    const date = new Date()
    const year = date.getFullYear()

    return (
        <footer className="sticky bottom-0 z-100 flex items-center justify-center bg-gradient-to-br from-amber-600 to-amber-800 p-4">
            {year} Development project
        </footer>
    )
}
