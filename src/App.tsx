import BookingPage from './pages/BookingPage'
import LandingPage from './pages/LandingPage'
import PortalPacientePage from './pages/PortalPacientePage'

function App() {
  if (window.location.pathname === '/reservar') {
    return <BookingPage />
  }

  if (window.location.pathname === '/portal') {
    return <PortalPacientePage />
  }

  return <LandingPage />
}

export default App
