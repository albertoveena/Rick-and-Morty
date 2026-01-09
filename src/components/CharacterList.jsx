import { Row, Col } from 'react-bootstrap'
import CharacterCard from './CharacterCard'

function CharacterList({ characters, onCharacterClick, favorites = [], onToggleFavorite }) {
  if (characters.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="fs-5 text-muted">No se encontraron personajes</p>
      </div>
    )
  }

  return (
    <Row className="g-4">
      {characters.map(character => (
        <Col key={character.id} xs={12} sm={6} md={4} lg={3}>
          <CharacterCard
            character={character}
            onClick={() => onCharacterClick(character.id)}
            isFavorite={favorites.some(fav => fav.id === character.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </Col>
      ))}
    </Row>
  )
}

export default CharacterList
