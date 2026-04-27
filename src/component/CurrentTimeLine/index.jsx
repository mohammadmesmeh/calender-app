import { useEffect, useState } from "react"

const HOUR_HEIGHT = 60 // غيّرها حسب تصميمك

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
            className="absolute  w-full   left-0 h-[1.3px] bg-red-500 z-50  before:content-[''] before:absolute before:w-3 before:h-3  before:top-1/2
      before:-translate-y-1/2 before:-left-1 before:rounded-full before:bg-red-500"
            style={{ top: `${top}px` }}
       />
        
    )
}