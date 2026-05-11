
import './App.css'
import { Container } from './component/container'
import { MainLayout } from './component/MainLayout'
// import { CalendarPopover } from './component/CalendarPopover'

import { BrowserRouter } from 'react-router-dom'
import { Routeing } from './routes'
import { MainMenu } from './component/MainMenu'
import { VisibleContextProvider } from './context/VisibleContext'
import { motion } from 'framer-motion'

function App() {

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>

      <BrowserRouter>
        <VisibleContextProvider >

            <Routeing />
        
        </VisibleContextProvider>
      </BrowserRouter>
    </motion.div>
  )
}

export default App
