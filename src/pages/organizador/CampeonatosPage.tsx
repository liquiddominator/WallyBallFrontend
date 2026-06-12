import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type {
  Campeonato,
  SaveCampeonatoRequest,
} from '@/entities/campeonato/model'
import { useAuth } from '@/features/auth/model/auth-context'
import {
  createCampeonato,
  finalizarCampeonato,
  getCampeonatos,
  updateCampeonato,
} from '@/features/campeonatos/api/campeonatos-api'
import { ApiError } from '@/shared/api/api-error'
import '@/shared/ui/Page.css'

const emptyForm: SaveCampeonatoRequest = {
  nombre: '',
  fechaInicio: '',
  fechaFin: '',
}

export function CampeonatosPage() {
  const { accessToken } = useAuth()
  const [campeonatos, setCampeonatos] = useState<Campeonato[]>([])
  const [form, setForm] = useState<SaveCampeonatoRequest>(emptyForm)
  const [editing, setEditing] = useState<Campeonato | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const loadCampeonatos = useCallback(async () => {
    if (!accessToken) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      setCampeonatos(await getCampeonatos(accessToken))
    } catch (exception) {
      setError(getErrorMessage(exception, 'No se pudieron cargar campeonatos.'))
    } finally {
      setLoading(false)
    }
  }, [accessToken])

  useEffect(() => {
    queueMicrotask(() => {
      void loadCampeonatos()
    })
  }, [loadCampeonatos])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!accessToken) {
      return
    }

    setError(null)
    setMessage(null)

    try {
      if (editing) {
        await updateCampeonato(accessToken, editing.idCampeonato, form)
        setMessage('Campeonato actualizado.')
      } else {
        await createCampeonato(accessToken, form)
        setMessage('Campeonato creado.')
      }

      setForm(emptyForm)
      setEditing(null)
      await loadCampeonatos()
    } catch (exception) {
      setError(getErrorMessage(exception, 'No se pudo guardar el campeonato.'))
    }
  }

  async function handleFinalize(campeonatoId: number) {
    if (!accessToken) {
      return
    }

    setError(null)
    setMessage(null)

    try {
      await finalizarCampeonato(accessToken, campeonatoId)
      setMessage('Campeonato finalizado.')
      await loadCampeonatos()
    } catch (exception) {
      setError(getErrorMessage(exception, 'No se pudo finalizar el campeonato.'))
    }
  }

  function startEdit(campeonato: Campeonato) {
    setEditing(campeonato)
    setForm({
      nombre: campeonato.nombre,
      fechaInicio: campeonato.fechaInicio,
      fechaFin: campeonato.fechaFin ?? '',
    })
    setMessage(null)
    setError(null)
  }

  return (
    <section className="page-panel">
      <header className="page-toolbar">
        <div>
          <p className="app-kicker">Organizador</p>
          <h1>Campeonatos</h1>
        </div>
        <div className="page-actions">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/categorias">Categorias</Link>
        </div>
      </header>

      {message && <div className="auth-success">{message}</div>}
      {error && <div className="auth-error">{error}</div>}

      <div className="content-grid">
        <section className="form-panel">
          <h2>{editing ? 'Editar campeonato' : 'Crear campeonato'}</h2>
          <form className="basic-form" onSubmit={handleSubmit}>
            <label>
              Nombre
              <input
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    nombre: event.target.value,
                  }))
                }
                required
                value={form.nombre}
              />
            </label>
            <label>
              Fecha inicio
              <input
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    fechaInicio: event.target.value,
                  }))
                }
                required
                type="date"
                value={form.fechaInicio}
              />
            </label>
            <label>
              Fecha fin
              <input
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    fechaFin: event.target.value,
                  }))
                }
                required
                type="date"
                value={form.fechaFin}
              />
            </label>
            <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(null)
                  setForm(emptyForm)
                }}
              >
                Cancelar edicion
              </button>
            )}
          </form>
        </section>

        <section className="table-panel">
          <h2>Listado</h2>
          {loading ? (
            <div className="status-message">Cargando campeonatos...</div>
          ) : (
            <table className="basic-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fechas</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {campeonatos.map((campeonato) => (
                  <tr key={campeonato.idCampeonato}>
                    <td>{campeonato.nombre}</td>
                    <td>
                      {campeonato.fechaInicio} / {campeonato.fechaFin ?? '-'}
                    </td>
                    <td>{campeonato.estado}</td>
                    <td>
                      <div className="page-actions">
                        <button
                          className="table-action"
                          type="button"
                          onClick={() => startEdit(campeonato)}
                        >
                          Editar
                        </button>
                        <button
                          className="table-action danger"
                          type="button"
                          onClick={() =>
                            void handleFinalize(campeonato.idCampeonato)
                          }
                        >
                          Finalizar
                        </button>
                      </div>
                    </td>
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
