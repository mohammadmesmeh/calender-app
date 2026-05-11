// import { Footer } from "../Footer"
// import { Header } from "../Header"

// export const Layout = ({children}) => (
//     <div className=" flex flex-col h-screen">

//         <Header />
//         {children}
//         <Footer />
//     </div>

// )
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Container } from "../container";
import { MainMenu } from "../MainMenu";
import { useContext } from "react";
import { VisibleContext } from "../../context/VisibleContext";

export const MainLayout = () => {
     const { isVisibleMenu } = useContext(VisibleContext)
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <Header />
      <Container>

        {/* Content */}
        <div

          className=" flex h-full justify-between "
          style={{
            flexDirection: isVisibleMenu ? 'row' : 'column'
          }}
        >
          

          <Outlet />


          <MainMenu />
        </div>
      </Container>

      {/* Footer */}
      <Footer />

    </div>
  );
};