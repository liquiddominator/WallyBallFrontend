import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import * as authApi from '../api/auth-api'
import {
  clearStoredSession,
  getStoredSession,
  storeSession,
} from '../lib/auth-storage'
import type {
  AuthSession,
  ChangePasswordRequest,
  LoginRequest,
  RegisterRequest,
} from './auth-types'
import { AuthContext, type AuthContextValue } from './auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() =>
    getStoredSession(),
  )

  const setAuthenticatedSession = useCallback((nextSession: AuthSession) => {
    storeSession(nextSession)
    setSession(nextSession)
  }, [])

  const signIn = useCallback(
    async (request: LoginRequest) => {
      const nextSession = await authApi.login(request)
      setAuthenticatedSession(nextSession)
    },
    [setAuthenticatedSession],
  )

  const signUpOrganizer = useCallback(
    async (request: RegisterRequest) => {
      const nextSession = await authApi.register(request)
      setAuthenticatedSession(nextSession)
    },
    [setAuthenticatedSession],
  )

  const signOut = useCallback(async () => {
    const currentSession = session
    clearStoredSession()
    setSession(null)

    if (currentSession) {
      await authApi.logout(
        currentSession.accessToken,
        currentSession.refreshToken,
      )
    }
  }, [session])

  const changePassword = useCallback(
    async (request: ChangePasswordRequest) => {
      if (!session) {
        throw new Error('No existe una sesion activa.')
      }

      await authApi.changePassword(session.accessToken, request)
    },
    [session],
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: session !== null,
      accessToken: session?.accessToken ?? null,
      roles: session?.user.roles ?? [],
      signIn,
      signUpOrganizer,
      signOut,
      changePassword,
    }),
    [changePassword, session, signIn, signOut, signUpOrganizer],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
