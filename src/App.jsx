import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container, Navbar } from 'react-bootstrap'
import Home from './pages/Home'
import CharacterDetail from './components/CharacterDetail'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar bg="dark" expand="lg" sticky="top" className="navbar-custom">
          <Container>
            <Navbar.Brand href="/" className="fw-bold fs-4">
              🔫 Rick and Morty App
            </Navbar.Brand>
          </Container>
        </Navbar>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
          </Routes>
        </main>

        <footer className="footer bg-dark text-white text-center py-3 mt-5">
          <p className="mb-0">© 2026 Rick and Morty App | Built with React & Bootstrap</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
