import { createContext, useContext } from 'react'
import type {
  AuthSession,
  ChangePasswordRequest,
  LoginRequest,
  RegisterRequest,
} from './auth-types'

export type AuthContextValue = {
  session: AuthSession | null
  isAuthenticated: boolean
  accessToken: string | null
  roles: string[]
  signIn: (request: LoginRequest) => Promise<void>
  signUpOrganizer: (request: RegisterRequest) => Promise<void>
  signOut: () => Promise<void>
  changePassword: (request: ChangePasswordRequest) => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider.')
  }

  return context
}
