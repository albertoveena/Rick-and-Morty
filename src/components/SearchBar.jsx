import { Form, Row, Col } from 'react-bootstrap'

function SearchBar({ filters, onFilterChange }) {
  return (
    <Form className="mb-4 p-3 bg-light rounded-3">
      <Row className="g-3">
        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">Buscar por nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa un nombre..."
              value={filters.name}
              onChange={(e) => onFilterChange('name', e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">Filtrar por especie</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Human, Alien..."
              value={filters.species}
              onChange={(e) => onFilterChange('species', e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">Filtrar por planeta</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Earth, Citadel..."
              value={filters.location}
              onChange={(e) => onFilterChange('location', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchBar
