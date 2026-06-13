
import './App.css'
import { Container } from './component/container'
import { MainLayout } from './component/MainLayout'
// import { CalendarPopover } from './component/CalendarPopover'

import { BrowserRouter } from 'react-router-dom'
import { Routeing } from './routes'
import { MainMenu } from './component/MainMenu'
import { VisibleContextProvider } from './context/VisibleContext'

import { AuthContextProvider } from "./context/authContext";

function App() {

  return (
    <AuthContextProvider>
      <VisibleContextProvider>
        <BrowserRouter>
          <Routeing />
        </BrowserRouter>
      </VisibleContextProvider>
    </AuthContextProvider>
  )
}

export default App
