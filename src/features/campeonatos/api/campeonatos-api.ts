import type {
  Campeonato,
  SaveCampeonatoRequest,
} from '@/entities/campeonato/model'
import { requestJson } from '@/shared/api/http-client'
import { env } from '@/shared/config/env'

const baseUrl = `${env.wallyApiUrl}/api/v1/campeonatos`

export function getCampeonatos(token: string) {
  return requestJson<Campeonato[]>(baseUrl, { token })
}

export function createCampeonato(token: string, request: SaveCampeonatoRequest) {
  return requestJson<Campeonato>(baseUrl, {
    method: 'POST',
    token,
    body: JSON.stringify(request),
  })
}

export function updateCampeonato(
  token: string,
  campeonatoId: number,
  request: SaveCampeonatoRequest,
) {
  return requestJson<Campeonato>(`${baseUrl}/${campeonatoId}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(request),
  })
}

export function finalizarCampeonato(token: string, campeonatoId: number) {
  return requestJson<Campeonato>(`${baseUrl}/${campeonatoId}/finalizar`, {
    method: 'PATCH',
    token,
  })
}
