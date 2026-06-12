# Guia de Setup

## Instalacion

```powershell
npm install
```

## Desarrollo

Crear `.env.local` si los puertos son distintos a los valores por defecto:

```powershell
Copy-Item .\.env.example .\.env.local
```

```powershell
npm run dev
```

## Build

```powershell
npm run build
```

## Lint

```powershell
npm run lint
```

## Primeras Tareas Funcionales

1. Implementar `shared/config` para leer URLs desde variables `VITE_*`.
2. Implementar `shared/api` con cliente HTTP y manejo de JWT.
3. Crear rutas en `app/router`.
4. Implementar login en `features/auth`.
5. Implementar layout de organizador y layout de jugador.
