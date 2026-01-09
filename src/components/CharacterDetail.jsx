import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCharacterById, getLocationByUrl } from '../services/api'
import { Container, Row, Col, Button, Badge, Card, Spinner, Alert } from 'react-bootstrap'
import './CharacterDetail.css'

function CharacterDetail() {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [residents, setResidents] = useState([])

  // Carga los datos del personaje y los residentes de su planeta
  // Se ejecuta cuando cambia el ID (al navegar a otro personaje)
  useEffect(() => {
    async function fetchCharacter() {
      const data = await getCharacterById(id)
      setCharacter(data)

      if (data.location.url) {
        const locationData = await getLocationByUrl(data.location.url)

        // Cargamos solo los primeros 6 residentes para no saturar
        // Promise.all espera a que terminen todas las llamadas
        const residentPromises = locationData.residents.slice(0, 6).map(url =>
          fetch(url).then(res => res.json())
        )

        const residentData = await Promise.all(residentPromises)
        setResidents(residentData)
      }

      setLoading(false)
    }

    fetchCharacter()
  }, [id])

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p className="mt-3 text-muted">Cargando personaje...</p>
        </div>
      </Container>
    )
  }

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Alive': return 'success'
      case 'Dead': return 'danger'
      case 'unknown': return 'secondary'
      default: return 'info'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'Alive': return '✅ Vivo'
      case 'Dead': return '💀 Muerto'
      case 'unknown': return '❓ Desconocido'
      default: return status
    }
  }

  return (
    <Container className="py-5">
      <Link to="/" className="btn btn-outline-primary mb-4">
        ⬅ Volver al listado
      </Link>

      <Row className="g-4">
        <Col lg={5} md={6} xs={12} className="text-center">
          <img 
            src={character.image} 
            alt={character.name}
            className="character-detail-image rounded-4 shadow mb-4"
          />
        </Col>

        <Col lg={7} md={6} xs={12}>
          <h1 className="display-5 fw-bold mb-3 character-detail-title">
            {character.name}
          </h1>

          <div className="info-section mb-4">
            <div className="info-row mb-3">
              <span className="info-label">Estado:</span>
              <Badge bg={getStatusBadgeVariant(character.status)} className="info-badge">
                {getStatusLabel(character.status)}
              </Badge>
            </div>

            <div className="info-row mb-3">
              <span className="info-label">Especie:</span>
              <span className="info-value">{character.species}</span>
            </div>

            <div className="info-row mb-3">
              <span className="info-label">Tipo:</span>
              <span className="info-value">{character.type || 'Desconocido'}</span>
            </div>

            <div className="info-row mb-3">
              <span className="info-label">Género:</span>
              <span className="info-value">{character.gender}</span>
            </div>

            <div className="info-row mb-3">
              <span className="info-label">Ubicación actual:</span>
              <span className="info-value fw-semibold text-primary">{character.location.name}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Primera aparición:</span>
              <span className="info-value">{character.created ? new Date(character.created).toLocaleDateString('es-ES') : 'Desconocida'}</span>
            </div>
          </div>
        </Col>
      </Row>

      <hr className="my-5" />

      <div className="residents-section">
        <h2 className="fw-bold mb-4">
          👥 Otros habitantes de {character.location.name}
        </h2>

        {residents.length === 0 ? (
          <Alert variant="info" className="rounded-3">
            No hay otros residentes conocidos de este planeta en la base de datos.
          </Alert>
        ) : (
          <Row className="g-3">
            {residents.map(resident => (
              <Col md={6} lg={4} key={resident.id}>
                <Card className="resident-card h-100 shadow-sm">
                  <Card.Img variant="top" src={resident.image} alt={resident.name} className="resident-image" />
                  <Card.Body>
                    <Card.Title className="fw-bold">{resident.name}</Card.Title>
                    <Card.Text className="text-muted small">
                      <strong>Especie:</strong> {resident.species}
                    </Card.Text>
                    <Badge bg={getStatusBadgeVariant(resident.status)} className="mt-2">
                      {getStatusLabel(resident.status)}
                    </Badge>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
  )
}

export default CharacterDetail
