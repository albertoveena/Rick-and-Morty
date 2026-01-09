import { Card, Button } from 'react-bootstrap'
import './CharacterCard.css'

function CharacterCard({ character, onClick, isFavorite, onToggleFavorite }) {
  return (
    <Card className="character-card h-100 shadow-sm">
      <Card.Img variant="top" src={character.image} alt={character.name} className="character-image" />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="character-name">{character.name}</Card.Title>
        <Card.Text className="text-muted small">
          <strong>Especie:</strong> {character.species}
        </Card.Text>
        <Card.Text className="text-muted small mb-3">
          <strong>Planeta:</strong> {character.origin.name}
        </Card.Text>
        <div className="mt-auto d-flex gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={onClick}
            className="flex-grow-1"
          >
            Ver detalles
          </Button>
          <Button
            variant="light"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(character)
            }}
            className={`favorite-btn ${isFavorite ? 'favorite' : ''}`}
          >
            {isFavorite ? '💖' : '🤍'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default CharacterCard
