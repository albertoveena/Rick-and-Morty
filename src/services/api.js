const BASE_URL = 'https://rickandmortyapi.com/api'

// Obtiene la lista completa de personajes de la API
// Nota: la API devuelve results, no directamente el array
export async function getCharacters() {
  const response = await fetch(`${BASE_URL}/character`)
  if (!response.ok) {
    throw new Error('Error al obtener los personajes')
  }
  const data = await response.json()
  return data.results
}

export async function getCharacterById(id) {
  const response = await fetch(`${BASE_URL}/character/${id}`)
  if (!response.ok) {
    throw new Error('Error al obtener el personaje')
  }
  return response.json()
}

// Obtiene los datos de una localización usando su URL completa
// Se usa para cargar los residentes de un planeta en CharacterDetail
export async function getLocationByUrl(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Error al obtener la localización')
  }
  return response.json()
}

