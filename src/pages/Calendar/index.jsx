import { useContext } from "react"
import { MainMenu } from "../../component/MainMenu"
import { Routeing } from "../../routes"
import { VisibleContext } from "../../context/VisibleContext"
import { MainLayout } from "../../component/MainLayout"
import { Container } from "../../component/container"
// import { motion } from "framer-motion";
export const Calendar = () => {
    const { isVisibleMenu } = useContext(VisibleContext)

    return (
        // <MainLayout>  
            <Container>
                <div

                    className=" flex h-dvh justify-between "
                    style={{
                        flexDirection: isVisibleMenu ? 'row' : 'column'
                    }}
                >


                    <MainMenu />
                </div>
            </Container>
        // </MainLayout>

    )
}