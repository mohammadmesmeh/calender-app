import { useContext } from "react"
import { MainMenu } from "../../component/MainMenu"
import { Routeing } from "../../routes"
import { VisibleContext } from "../../context/VisibleContext"
export const HomePage = () => {
    const { isVisibleMenu } = useContext(VisibleContext)
    return (
        <div className=" flex h-full"
            style={{
                flexDirection: isVisibleMenu ? 'row' : 'column'
            }}
        >

            <Routeing />
            <MainMenu />
        </div>


    )
}