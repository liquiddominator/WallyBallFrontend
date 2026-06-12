import { requestJson } from '@/shared/api/http-client'
import { env } from '@/shared/config/env'
import type {
  AuthSession,
  ChangePasswordRequest,
  LoginRequest,
  RegisterRequest,
} from '../model/auth-types'

const authBaseUrl = `${env.personasApiUrl}/api/v1/auth`

export function login(request: LoginRequest) {
  return requestJson<AuthSession>(`${authBaseUrl}/login`, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

export function register(request: RegisterRequest) {
  return requestJson<AuthSession>(`${authBaseUrl}/register`, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

export function getMe(accessToken: string) {
  return requestJson<AuthSession['user']>(`${authBaseUrl}/me`, {
    token: accessToken,
  })
}

export function changePassword(
  accessToken: string,
  request: ChangePasswordRequest,
) {
  return requestJson<void>(`${authBaseUrl}/change-password`, {
    method: 'POST',
    token: accessToken,
    body: JSON.stringify(request),
  })
}

export function logout(accessToken: string, refreshToken: string) {
  return requestJson<void>(`${authBaseUrl}/logout`, {
    method: 'POST',
    token: accessToken,
    body: JSON.stringify({ refreshToken }),
  })
}
