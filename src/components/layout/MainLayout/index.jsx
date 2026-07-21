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
import { Container } from "../Container";
import { MainMenu } from "@/components/navigation/MainMenu";
import { useContext } from "react";
import { VisibleContext } from "@/features/sidebar/context/VisibleContext";

export const MainLayout = () => {
  const { isVisibleMenu } = useContext(VisibleContext);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <Header className="shrink-0" />

      <div className="flex flex-1 min-h-0 flex-col overflow-hidden lg:flex-row">
        <main className="flex flex-1 min-h-0 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <Container>
              <Outlet />
            </Container>
          </div>
        </main>

        {isVisibleMenu && (
          <aside className="w-full border-t border-border bg-surface/90 shadow-subtle lg:w-64 lg:border-l lg:border-t-0">
            <div className="h-full overflow-y-auto">
              <MainMenu />
            </div>
          </aside>
        )}
      </div>

      <Footer className="shrink-0" />
    </div>
  );
};