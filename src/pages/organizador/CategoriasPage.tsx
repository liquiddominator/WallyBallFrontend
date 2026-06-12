import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from 'react'
import { Link } from 'react-router-dom'
import type { Campeonato } from '@/entities/campeonato/model'
import type { Categoria } from '@/entities/categoria/model'
import { useAuth } from '@/features/auth/model/auth-context'
import { getCampeonatos } from '@/features/campeonatos/api/campeonatos-api'
import {
  addCategoriaToCampeonato,
  createCategoria,
  getCategorias,
} from '@/features/categorias/api/categorias-api'
import { ApiError } from '@/shared/api/api-error'
import '@/shared/ui/Page.css'

export function CategoriasPage() {
  const { accessToken } = useAuth()
  const [campeonatos, setCampeonatos] = useState<Campeonato[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [selectedCampeonatoId, setSelectedCampeonatoId] = useState('')
  const [selectedCategoriaId, setSelectedCategoriaId] = useState('')
  const [nombre, setNombre] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const campeonatoId = selectedCampeonatoId
    ? Number(selectedCampeonatoId)
    : undefined

  const categoriasCatalogo = useMemo(
    () =>
      categorias.filter((categoria) => categoria.idCampeonatoCategoria === null),
    [categorias],
  )

  const loadData = useCallback(async (nextCampeonatoId = campeonatoId) => {
    if (!accessToken) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const [nextCampeonatos, nextCategorias] = await Promise.all([
        getCampeonatos(accessToken),
        getCategorias(accessToken, nextCampeonatoId),
      ])
      setCampeonatos(nextCampeonatos)
      setCategorias(nextCategorias)
    } catch (exception) {
      setError(getErrorMessage(exception, 'No se pudieron cargar categorias.'))
    } finally {
      setLoading(false)
    }
  }, [accessToken, campeonatoId])

  useEffect(() => {
    queueMicrotask(() => {
      void loadData()
    })
  }, [loadData])

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!accessToken) {
      return
    }

    setError(null)
    setMessage(null)

    try {
      await createCategoria(accessToken, { nombre })
      setNombre('')
      setMessage('Categoria creada.')
      await loadData()
    } catch (exception) {
      setError(getErrorMessage(exception, 'No se pudo crear la categoria.'))
    }
  }

  async function handleAddToCampeonato(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!accessToken || !selectedCampeonatoId || !selectedCategoriaId) {
      return
    }

    setError(null)
    setMessage(null)

    try {
      await addCategoriaToCampeonato(
        accessToken,
        Number(selectedCampeonatoId),
        Number(selectedCategoriaId),
      )
      setSelectedCategoriaId('')
      setMessage('Categoria asociada al campeonato.')
      await loadData(Number(selectedCampeonatoId))
    } catch (exception) {
      setError(
        getErrorMessage(exception, 'No se pudo asociar la categoria.'),
      )
    }
  }

  async function handleFilterChange(value: string) {
    setSelectedCampeonatoId(value)
    setSelectedCategoriaId('')
    await loadData(value ? Number(value) : undefined)
  }

  return (
    <section className="page-panel">
      <header className="page-toolbar">
        <div>
          <p className="app-kicker">Organizador</p>
          <h1>Categorias</h1>
        </div>
        <div className="page-actions">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/campeonatos">Campeonatos</Link>
        </div>
      </header>

      {message && <div className="auth-success">{message}</div>}
      {error && <div className="auth-error">{error}</div>}

      <div className="content-grid">
        <section className="form-panel">
          <h2>Crear categoria</h2>
          <form className="basic-form" onSubmit={handleCreate}>
            <label>
              Nombre
              <input
                onChange={(event) => setNombre(event.target.value)}
                required
                value={nombre}
              />
            </label>
            <button type="submit">Crear categoria</button>
          </form>

          <hr />

          <h2>Asociar a campeonato</h2>
          <form className="basic-form" onSubmit={handleAddToCampeonato}>
            <label>
              Campeonato
              <select
                onChange={(event) =>
                  void handleFilterChange(event.target.value)
                }
                required
                value={selectedCampeonatoId}
              >
                <option value="">Seleccionar</option>
                {campeonatos.map((campeonato) => (
                  <option
                    key={campeonato.idCampeonato}
                    value={campeonato.idCampeonato}
                  >
                    {campeonato.nombre}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Categoria
              <select
                onChange={(event) => setSelectedCategoriaId(event.target.value)}
                required
                value={selectedCategoriaId}
              >
                <option value="">Seleccionar</option>
                {categoriasCatalogo.map((categoria) => (
                  <option
                    key={categoria.idCategoria}
                    value={categoria.idCategoria}
                  >
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit">Asociar</button>
          </form>
        </section>

        <section className="table-panel">
          <div className="page-toolbar">
            <h2>Listado</h2>
            <select
              onChange={(event) => void handleFilterChange(event.target.value)}
              value={selectedCampeonatoId}
            >
              <option value="">Catalogo general</option>
              {campeonatos.map((campeonato) => (
                <option
                  key={campeonato.idCampeonato}
                  value={campeonato.idCampeonato}
                >
                  {campeonato.nombre}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="status-message">Cargando categorias...</div>
          ) : (
            <table className="basic-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Campeonato</th>
                  <th>Estado</th>
                  <th>Id relacion</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria) => (
                  <tr
                    key={`${categoria.idCategoria}-${categoria.idCampeonatoCategoria ?? 'catalogo'}`}
                  >
                    <td>{categoria.nombre}</td>
                    <td>{categoria.campeonatoNombre ?? '-'}</td>
                    <td>{categoria.estado}</td>
                    <td>{categoria.idCampeonatoCategoria ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </section>
  )
}

function getErrorMessage(exception: unknown, fallback: string) {
  return exception instanceof ApiError ? exception.message : fallback
}
