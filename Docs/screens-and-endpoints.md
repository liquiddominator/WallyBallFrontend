# Pantallas y Endpoints

Este documento define las pantallas previstas del frontend y los endpoints backend que consume cada una.

Servicios:

- `personas-service`: autenticacion, personas y gestion de usuarios.
- `wally-service`: dominio deportivo.
- `reportes-service`: reportes desde Cassandra.

## Publicas

### Login

Rol: publico.

Objetivo: autenticar organizadores y jugadores.

Endpoints:

```http
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
GET /api/v1/auth/me
```

Servicio: `personas-service`.

Estado frontend: implementado en `src/pages/auth/LoginPage.tsx`.

### Registro de Organizador

Rol: publico o flujo administrativo inicial.

Objetivo: registrar organizadores.

Endpoints:

```http
POST /api/v1/auth/register
```

Servicio: `personas-service`.

Estado frontend: implementado en `src/pages/auth/RegisterPage.tsx`.

## Organizador

### Dashboard

Rol: `ORGANIZADOR`.

Objetivo: vista inicial con resumen operativo.

Endpoints:

```http
GET /api/v1/campeonatos
GET /api/v1/reportes/equipos
GET /api/v1/reportes/resultados
GET /api/v1/reportes/posiciones
```

Servicios: `wally-service`, `reportes-service`.

### Campeonatos

Rol: `ORGANIZADOR`.

Objetivo: listar, crear, editar y finalizar campeonatos.

Endpoints:

```http
GET /api/v1/campeonatos
GET /api/v1/campeonatos/{campeonatoId}
POST /api/v1/campeonatos
PUT /api/v1/campeonatos/{campeonatoId}
PATCH /api/v1/campeonatos/{campeonatoId}/finalizar
```

Servicio: `wally-service`.

Estado frontend: implementado en `src/pages/organizador/CampeonatosPage.tsx`.

### Categorias

Rol: `ORGANIZADOR`.

Objetivo: administrar categorias reutilizables y asociarlas a campeonatos.

Endpoints:

```http
GET /api/v1/categorias
GET /api/v1/categorias/{categoriaId}
POST /api/v1/categorias
GET /api/v1/campeonatos/{campeonatoId}/categorias
POST /api/v1/campeonatos/{campeonatoId}/categorias
```

Servicio: `wally-service`.

Estado frontend: implementado en `src/pages/organizador/CategoriasPage.tsx`.

### Equipos

Rol: `ORGANIZADOR`.

Objetivo: administrar equipos por categoria de campeonato.

Endpoints:

```http
GET /api/v1/equipos
GET /api/v1/equipos?campeonatoCategoriaId={campeonatoCategoriaId}
GET /api/v1/equipos/{equipoId}
POST /api/v1/campeonatos-categorias/{campeonatoCategoriaId}/equipos
PUT /api/v1/equipos/{equipoId}
GET /api/v1/equipos/{equipoId}/jugadores
```

Servicio: `wally-service`.

### Jugadores

Rol: `ORGANIZADOR`.

Objetivo: registrar jugadores, buscarlos y asignarlos a equipos.

Endpoints:

```http
GET /api/v1/jugadores
GET /api/v1/jugadores?termino={termino}
GET /api/v1/jugadores?cedula={cedula}
GET /api/v1/jugadores?equipoId={equipoId}
GET /api/v1/jugadores/{jugadorId}
POST /api/v1/jugadores
POST /api/v1/equipos/{equipoId}/jugadores
GET /api/v1/equipos/{equipoId}/jugadores
```

Servicio: `wally-service`.

Nota: `POST /api/v1/jugadores` orquesta internamente la creacion de persona y usuario jugador en `personas-service`.

### Fixture

Rol: `ORGANIZADOR`.

Objetivo: generar, consultar y reprogramar partidos.

Endpoints:

```http
GET /api/v1/campeonatos-categorias/{campeonatoCategoriaId}/fixture
POST /api/v1/campeonatos-categorias/{campeonatoCategoriaId}/fixture
PATCH /api/v1/partidos/{partidoId}/reprogramar
```

Servicio: `wally-service`.

### Resultados

Rol: `ORGANIZADOR`.

Objetivo: registrar, modificar, consultar y auditar resultados.

Endpoints:

```http
GET /api/v1/resultados
GET /api/v1/resultados?campeonatoCategoriaId={campeonatoCategoriaId}
GET /api/v1/resultados/{resultadoId}
GET /api/v1/partidos/{partidoId}/resultado
POST /api/v1/partidos/{partidoId}/resultado
PUT /api/v1/resultados/{resultadoId}
GET /api/v1/resultados/{resultadoId}/auditoria
```

Servicio: `wally-service`.

### Posiciones

Rol: `ORGANIZADOR`.

Objetivo: consultar tabla de posiciones por categoria de campeonato.

Endpoints:

```http
GET /api/v1/campeonatos-categorias/{campeonatoCategoriaId}/posiciones
```

Servicio: `wally-service`.

### Reportes

Rol: `ORGANIZADOR`.

Objetivo: consultar reportes oficiales respaldados por Cassandra.

Endpoints:

```http
GET /api/v1/reportes/equipos
GET /api/v1/reportes/equipos?campeonatoId={campeonatoId}
GET /api/v1/reportes/equipos?campeonatoCategoriaId={campeonatoCategoriaId}

GET /api/v1/reportes/jugadores
GET /api/v1/reportes/jugadores?campeonatoId={campeonatoId}
GET /api/v1/reportes/jugadores?campeonatoCategoriaId={campeonatoCategoriaId}
GET /api/v1/reportes/jugadores?equipoId={equipoId}

GET /api/v1/reportes/resultados
GET /api/v1/reportes/resultados?campeonatoCategoriaId={campeonatoCategoriaId}
GET /api/v1/reportes/resultados?fechaDesde={fechaDesde}&fechaHasta={fechaHasta}

GET /api/v1/reportes/posiciones
GET /api/v1/reportes/posiciones?campeonatoId={campeonatoId}
GET /api/v1/reportes/posiciones?campeonatoCategoriaId={campeonatoCategoriaId}
```

Servicio: `reportes-service`.

## Jugador

### Portal del Jugador

Rol: `JUGADOR`.

Objetivo: vista inicial del jugador.

Endpoints:

```http
GET /api/v1/auth/me
GET /api/v1/portal/jugador/fixture
GET /api/v1/portal/jugador/resultados
GET /api/v1/portal/jugador/posiciones
```

Servicios: `personas-service`, `wally-service`.

### Mi Fixture

Rol: `JUGADOR`.

Objetivo: consultar proximos partidos de sus equipos.

Endpoints:

```http
GET /api/v1/portal/jugador/fixture
```

Servicio: `wally-service`.

### Mis Resultados

Rol: `JUGADOR`.

Objetivo: consultar resultados de las categorias donde participa.

Endpoints:

```http
GET /api/v1/portal/jugador/resultados
```

Servicio: `wally-service`.

### Mis Posiciones

Rol: `JUGADOR`.

Objetivo: consultar tablas de posiciones y posicion de su equipo.

Endpoints:

```http
GET /api/v1/portal/jugador/posiciones
```

Servicio: `wally-service`.

## Administracion de Acceso

### Gestion de Roles

Rol: `ORGANIZADOR`.

Objetivo: consultar roles disponibles.

Endpoints:

```http
GET /api/v1/gestion/roles
GET /api/v1/gestion/roles/{rolId}
```

Servicio: `personas-service`.

Estado frontend: implementado en `src/pages/auth/ChangePasswordPage.tsx`.

### Gestion de Usuarios

Rol: `ORGANIZADOR`.

Objetivo: consultar usuarios registrados.

Endpoints:

```http
GET /api/v1/gestion/usuarios
GET /api/v1/gestion/usuarios/{usuarioId}
```

Servicio: `personas-service`.

### Cambio de Contrasena

Rol: usuario autenticado.

Objetivo: permitir al usuario cambiar su password.

Endpoints:

```http
POST /api/v1/auth/change-password
```

Servicio: `personas-service`.

## Pantallas de Soporte

### No Autorizado

Objetivo: informar que el usuario no tiene permisos.

Endpoints: ninguno.

### No Encontrado

Objetivo: manejar rutas inexistentes.

Endpoints: ninguno.

### Estado de Sesion Expirada

Objetivo: redirigir a login cuando falle refresh token o expire sesion.

Endpoints:

```http
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
```

Servicio: `personas-service`.
