import { Footer } from "../Footer"
import { Header } from "../Header"

export const Layout = ({children}) => (
    <div className=" flex flex-col h-screen">

        <Header />
        {children}
        <Footer />
    </div>
    
)