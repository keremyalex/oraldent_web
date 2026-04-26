import BookingPage from './pages/BookingPage'
import LandingPage from './pages/LandingPage'

function App() {
  if (window.location.pathname === '/reservar') {
    return <BookingPage />
  }

  return <LandingPage />
}

export default App
