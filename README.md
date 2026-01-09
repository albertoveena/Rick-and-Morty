
# Rick and Morty - Frontend (versión simple)

Cómo ejecutar

Requisitos:
- Node.js (v16 o superior) y npm

Pasos:
```powershell
cd c:\Users\josea\rick-morty-frontend
npm install
npm run dev
```

Abrir en el navegador la dirección que muestre Vite (normalmente `http://localhost:5173`).

Para compilar y ver la versión de producción:
```powershell
npm run build
npm run preview
```

Qué hace la aplicación

- Muestra personajes del universo Rick and Morty usando la API pública.
- Permite buscar, filtrar, ver detalles y marcar favoritos.

Arquitectura en pocas palabras

- La app está hecha con React.
- `src/services/api.js` hace las llamadas a la API.
- Componentes principales: `Home`, `CharacterList`, `CharacterCard`, `CharacterDetail`, `SearchBar`.
- El estado se guarda con hooks; los favoritos se guardan en `localStorage`.

Decisiones técnicas (explicado simple)

- React: para dividir la interfaz en componentes.
- Vite: para un arranque rápido en desarrollo.
- Bootstrap: para estilos rápidos sin mucho CSS.
- No hay backend propio: la app usa la API pública.

Qué mejoraría con más tiempo (en lenguaje sencillo)

- Guardar favoritos en un servidor para poder verlos desde otros dispositivos.
- Añadir login para que cada usuario tenga sus favoritos.
- Escribir tests básicos para asegurar que las partes importantes funcionan.
- Mejorar los filtros de búsqueda por especie, estado o género.


