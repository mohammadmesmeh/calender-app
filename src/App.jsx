import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Routeing } from './routes'
import { VisibleContextProvider } from './features/sidebar/context/VisibleContext'
import { AuthContextProvider } from './features/auth/context/authContext'
import { ThemeProvider } from './features/settings/context/ThemeContext'
import { NotificationProvider } from './features/notifications/context/NotificationContext'
import { LocalizationProvider } from './i18n/LocalizationProvider'

function App() {
  return (
    <LocalizationProvider>
      <AuthContextProvider>
        <VisibleContextProvider>
          <ThemeProvider>
            <BrowserRouter>
              <NotificationProvider>
                <Routeing />
              </NotificationProvider>
            </BrowserRouter>
          </ThemeProvider>
        </VisibleContextProvider>
      </AuthContextProvider>
    </LocalizationProvider>
  )
}

export default App
