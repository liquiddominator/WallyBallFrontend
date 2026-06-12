# Estructura del Proyecto

```text
WallyBallFrontend/
|-- Docs/
|   |-- architecture.md
|   |-- environment.md
|   |-- project-setup.md
|   `-- project-structure.md
|-- public/
|-- src/
|   |-- app/
|   |   |-- App.css
|   |   |-- App.tsx
|   |   |-- layouts/
|   |   |-- providers/
|   |   `-- router/
|   |-- pages/
|   |   |-- auth/
|   |   |-- jugador/
|   |   |-- organizador/
|   |   `-- reportes/
|   |-- features/
|   |   |-- auth/
|   |   |-- campeonatos/
|   |   |-- categorias/
|   |   |-- equipos/
|   |   |-- fixture/
|   |   |-- jugadores/
|   |   |-- portal-jugador/
|   |   |-- posiciones/
|   |   |-- reportes/
|   |   `-- resultados/
|   |-- entities/
|   |   |-- campeonato/
|   |   |-- categoria/
|   |   |-- equipo/
|   |   |-- jugador/
|   |   |-- partido/
|   |   |-- posicion/
|   |   `-- resultado/
|   |-- widgets/
|   |   |-- app-sidebar/
|   |   |-- data-table/
|   |   `-- topbar/
|   |-- shared/
|   |   |-- api/
|   |   |-- config/
|   |   |-- hooks/
|   |   |-- lib/
|   |   |-- styles/
|   |   |-- types/
|   |   `-- ui/
|   |-- index.css
|   `-- main.tsx
|-- index.html
|-- package.json
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.node.json
`-- vite.config.ts
```

## Carpetas Principales

- `app`: configuracion global de aplicacion.
- `pages`: rutas y pantallas finales.
- `features`: unidades funcionales del sistema.
- `entities`: tipos y logica cercana a entidades del dominio.
- `widgets`: composiciones visuales de varias entidades o features.
- `shared`: infraestructura y reutilizables sin dependencia del dominio.
