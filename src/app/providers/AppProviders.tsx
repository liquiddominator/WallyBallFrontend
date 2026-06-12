import type { ReactNode } from 'react'
import { AuthProvider } from '@/features/auth/model/AuthProvider'

export function AppProviders({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
