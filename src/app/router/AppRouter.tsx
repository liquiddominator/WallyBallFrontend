import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { ChangePasswordPage } from '@/pages/auth/ChangePasswordPage'
import { CampeonatosPage } from '@/pages/organizador/CampeonatosPage'
import { CategoriasPage } from '@/pages/organizador/CategoriasPage'
import { DashboardPage } from '@/pages/organizador/DashboardPage'
import { useAuth } from '@/features/auth/model/auth-context'

function PublicLayout() {
  return (
    <main className="auth-layout">
      <Outlet />
    </main>
  )
}

function ProtectedLayout() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />
  }

  return (
    <main className="app-shell">
      <Outlet />
    </main>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/campeonatos" element={<CampeonatosPage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/cambiar-password" element={<ChangePasswordPage />} />
        </Route>

        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="*" element={<Navigate replace to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  )
}
