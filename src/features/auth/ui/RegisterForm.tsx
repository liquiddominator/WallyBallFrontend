import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ApiError } from '@/shared/api/api-error'
import { useAuth } from '../model/auth-context'
import './AuthForm.css'

export function RegisterForm() {
  const navigate = useNavigate()
  const { signUpOrganizer } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await signUpOrganizer({
        email,
        password,
        nombreCompleto: nombreCompleto.trim() || null,
      })
      navigate('/dashboard', { replace: true })
    } catch (exception) {
      setError(
        exception instanceof ApiError
          ? exception.message
          : 'No se pudo registrar el organizador.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-card">
      <h1>Registrar organizador</h1>
      <p>El registro crea una cuenta con rol organizador.</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="auth-error">{error}</div>}

        <label>
          Nombre completo
          <input
            autoComplete="name"
            onChange={(event) => setNombreCompleto(event.target.value)}
            type="text"
            value={nombreCompleto}
          />
        </label>

        <label>
          Email
          <input
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>

        <label>
          Password
          <input
            autoComplete="new-password"
            minLength={8}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Registrando...' : 'Registrar'}
        </button>
      </form>

      <div className="auth-links">
        <Link to="/login">Ya tengo cuenta</Link>
      </div>
    </section>
  )
}
