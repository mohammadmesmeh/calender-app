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
  const { isVisibleMenu } = useContext(VisibleContext);

  return (
    <div className="flex flex-col h-dvh flex-1  min-h-0">

      {/* Header */}
      <Header className="shrink-0" />

      {/* Body */}
      <div className="flex flex-1 min-h-0">

        {/* Content */}
        <div className="flex-1 min-h-0 flex flex-col">
          <Container>
            <Outlet />
          </Container>
        </div>

        {/* Sidebar/Menu */}
        {isVisibleMenu && (
          <div className="w-[260px] shrink-0">
            <MainMenu />
          </div>
        )}

      </div>

      {/* Footer */}
      <Footer className="shrink-0" />
    </div>
  );
};
// export const MainLayout = () => {
//      const { isVisibleMenu } = useContext(VisibleContext)
//   return (
//     <div className="flex flex-col min-h-screen">

//       {/* Header */}
//       <Header />
//       <Container>

//         {/* Content */}
//         <div

//           className=" flex-1 flex flex-col min-h-0 "
//           style={{
//             flexDirection: isVisibleMenu ? 'row' : 'column'
//           }}
//         >

//           <Outlet />
//           <MainMenu />
//         </div>
//       </Container>

//       {/* Footer */}
//       <Footer />

//     </div>
//   );
// };