import type { AuthSession } from '../model/auth-types'

const storageKey = 'wallyball.auth.session'

export function getStoredSession(): AuthSession | null {
  const rawValue = localStorage.getItem(storageKey)

  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue) as AuthSession
  } catch {
    localStorage.removeItem(storageKey)
    return null
  }
}

export function storeSession(session: AuthSession) {
  localStorage.setItem(storageKey, JSON.stringify(session))
}

export function clearStoredSession() {
  localStorage.removeItem(storageKey)
}
