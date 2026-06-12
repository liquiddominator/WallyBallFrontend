# Entorno

## Requisitos

- Node.js compatible con el template actual de Vite.
- npm.
- Backend WallyBall ejecutandose segun el flujo de desarrollo.

## Variables de Entorno

Crear `.env.local` cuando se conecten servicios reales:

```text
VITE_PERSONAS_API_URL=http://localhost:5097
VITE_WALLY_API_URL=http://localhost:5167
VITE_REPORTES_API_URL=http://localhost:5187
```

## Scripts

```powershell
npm run dev
npm run build
npm run lint
npm run preview
```

## Puertos Backend Esperados

- `personas-service`: `http://localhost:5097`
- `wally-service`: `http://localhost:5167`
- `reportes-service`: `http://localhost:5187`
