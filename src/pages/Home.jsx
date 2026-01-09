import { useEffect, useState } from 'react'
import { getCharacters } from '../services/api'
import CharacterList from '../components/CharacterList'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { Container, Alert, Button, Badge } from 'react-bootstrap'
import './Home.css'

function Home() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    name: '',
    species: '',
    location: ''
  })
  // Los favoritos se recuperan desde localStorage al cargar la página
  // Si no hay nada guardado, empieza con un array vacío
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites')
    return stored ? JSON.parse(stored) : []
  })
  const [showFavorites, setShowFavorites] = useState(false)

  const navigate = useNavigate()

  function handleFilterChange(field, value) {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Añade o quita un personaje de favoritos y lo guarda en localStorage
  function toggleFavorite(character) {
    setFavorites(prev => {
      let updated
      // Si ya está en favoritos, lo quitamos; si no, lo añadimos
      if (prev.find(c => c.id === character.id)) {
        updated = prev.filter(c => c.id !== character.id)
      } else {
        updated = [...prev, character]
      }
      localStorage.setItem('favorites', JSON.stringify(updated))
      return updated
    })
  }

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const data = await getCharacters()
        setCharacters(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [])

  if (error) return (
    <Container className="mt-5">
      <Alert variant="danger">
        <Alert.Heading>¡Error!</Alert.Heading>
        <p>{error}</p>
      </Alert>
    </Container>
  )

  // Filtra los personajes por nombre, especie y planeta
  // Todos los filtros deben cumplirse (AND logic)
  const filteredCharacters = characters.filter(character => {
    return (
      character.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      character.species.toLowerCase().includes(filters.species.toLowerCase()) &&
      character.origin.name.toLowerCase().includes(filters.location.toLowerCase())
    )
  })

  return (
    <Container className="py-5">
      <div className="mb-4">
        <h1 className="display-5 fw-bold mb-2">
          🔫 Personajes Rick and Morty
        </h1>
        <p className="text-muted fs-5">Explora el universo de tus personajes favoritos</p>
      </div>

      <SearchBar
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {favorites.length > 0 && (
        <div className="mb-3">
          <Button
            variant={showFavorites ? 'danger' : 'success'}
            onClick={() => setShowFavorites(prev => !prev)}
            className="d-flex align-items-center gap-2"
          >
            {showFavorites ? 'Mostrar todos' : '💖 Ver favoritos'}
            <Badge bg="secondary">{favorites.length}</Badge>
          </Button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando personajes...</p>
        </div>
      ) : (
        <>
          {showFavorites && favorites.length > 0 && (
            <Alert variant="info" className="mb-4">
              Mostrando <strong>{favorites.length}</strong> personajes favoritos
            </Alert>
          )}
          {!showFavorites && (
            <Alert variant="info" className="mb-4">
              Se encontraron <strong>{filteredCharacters.length}</strong> personajes
            </Alert>
          )}
          <CharacterList
            characters={showFavorites ? favorites : filteredCharacters}
            onCharacterClick={(id) => navigate(`/character/${id}`)}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </>
      )}
    </Container>
  )
}

export default Home
