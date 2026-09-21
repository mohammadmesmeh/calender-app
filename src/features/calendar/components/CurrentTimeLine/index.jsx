import { useEffect, useState } from "react"

const HOUR_HEIGHT = 56
export const CurrentTimeLine = () => {
    const [top, setTop] = useState(0)

    useEffect(() => {
        const update = () => {
            const now = new Date()

            const minutes =
                now.getHours() * 60 +
                now.getMinutes() +
                now.getSeconds() / 60

            const pixels = (minutes / 60) * HOUR_HEIGHT

            setTop(pixels)
        }

        update()
        const interval = setInterval(update, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div
            className="absolute left-0 w-full h-px bg-danger z-20 pointer-events-none before:content-[''] before:absolute before:w-2.5 before:h-2.5 before:-top-1 before:-left-1 before:rounded-full before:bg-danger"
            style={{ top: `${top}px` }}
        />
    )
}
