import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/model/auth-context'

export function DashboardPage() {
  const { session, roles, signOut } = useAuth()

  return (
    <section className="dashboard-panel">
      <div>
        <p className="app-kicker">Sesion activa</p>
        <h1>Dashboard</h1>
        <p className="app-description">
          {session?.user.nombreCompleto || session?.user.email}
        </p>
      </div>

      <dl className="session-list">
        <div>
          <dt>Email</dt>
          <dd>{session?.user.email}</dd>
        </div>
        <div>
          <dt>Roles</dt>
          <dd>{roles.join(', ') || 'Sin roles'}</dd>
        </div>
      </dl>

      <div className="auth-links">
        <Link to="/campeonatos">Campeonatos</Link>
        <Link to="/categorias">Categorias</Link>
        <Link to="/cambiar-password">Cambiar password</Link>
        <button type="button" onClick={() => void signOut()}>
          Cerrar sesion
        </button>
      </div>
    </section>
  )
}
