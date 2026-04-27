
import './App.css'
import { Container } from './component/container'
import { Layout } from './component/Layout'
// import { CalendarPopover } from './component/CalendarPopover'
import { HomePage } from './pages/HomePage'
import { BrowserRouter } from 'react-router-dom'
import { Routeing } from './routes'
import { MainMenu } from './component/MainMenu'
import { VisibleContextProvider } from './context/VisibleContext'

function App() {
  
  return (
    <BrowserRouter>
    <VisibleContextProvider >
      <Layout >
        <Container>
          <HomePage/>
        </Container>
      </Layout>
    </VisibleContextProvider>
    </BrowserRouter>
  )
}

export default App
