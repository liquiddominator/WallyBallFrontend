# Arquitectura Frontend

`WallyBallFrontend` usa React + TypeScript + Vite. La estructura queda preparada para consumir tres servicios backend:

- `personas-service`: autenticacion, personas, usuarios y roles.
- `wally-service`: dominio deportivo transaccional.
- `reportes-service`: reportes respaldados por Cassandra.

## Estilo Arquitectonico

Se usa una organizacion feature-first con separacion por responsabilidad:

- `app`: bootstrap de React, providers, router y layouts globales.
- `pages`: pantallas compuestas y rutas de alto nivel.
- `features`: casos de uso funcionales.
- `entities`: modelos y helpers por entidad de negocio.
- `widgets`: bloques visuales compuestos reutilizables.
- `shared`: infraestructura comun, UI base, hooks, tipos y utilidades.

## Reglas

- Las llamadas HTTP viven en `shared/api` o dentro del feature cuando son especificas.
- Los tipos compartidos del backend viven en `entities` o `shared/types`.
- Las pantallas no deben contener reglas de negocio complejas; coordinan features y widgets.
- Los componentes visuales reutilizables viven en `shared/ui`.
- La autenticacion debe centralizar el token y anexarlo a requests protegidos.

## Servicios Backend

Configuracion prevista:

- `VITE_PERSONAS_API_URL`
- `VITE_WALLY_API_URL`
- `VITE_REPORTES_API_URL`

Estas variables se documentan en `Docs/environment.md`.
