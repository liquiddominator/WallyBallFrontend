export type AuthUser = {
  idUsuario: number
  email: string
  nombreCompleto: string | null
  roles: string[]
}

export type AuthSession = {
  accessToken: string
  expiresAtUtc: string
  refreshToken: string
  refreshTokenExpiresAtUtc: string
  user: AuthUser
}

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  email: string
  password: string
  nombreCompleto: string | null
}

export type ChangePasswordRequest = {
  currentPassword: string
  newPassword: string
}
