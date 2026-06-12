import { Navigate } from 'react-router-dom'
import { RegisterForm } from '@/features/auth/ui/RegisterForm'
import { useAuth } from '@/features/auth/model/auth-context'

export function RegisterPage() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate replace to="/dashboard" />
  }

  return <RegisterForm />
}
