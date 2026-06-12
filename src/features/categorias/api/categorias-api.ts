import type {
  Categoria,
  CreateCategoriaRequest,
} from '@/entities/categoria/model'
import { requestJson } from '@/shared/api/http-client'
import { env } from '@/shared/config/env'

const categoriasUrl = `${env.wallyApiUrl}/api/v1/categorias`
const campeonatosUrl = `${env.wallyApiUrl}/api/v1/campeonatos`

export function getCategorias(token: string, campeonatoId?: number) {
  const url = campeonatoId
    ? `${categoriasUrl}?campeonatoId=${campeonatoId}`
    : categoriasUrl

  return requestJson<Categoria[]>(url, { token })
}

export function createCategoria(token: string, request: CreateCategoriaRequest) {
  return requestJson<Categoria>(categoriasUrl, {
    method: 'POST',
    token,
    body: JSON.stringify(request),
  })
}

export function addCategoriaToCampeonato(
  token: string,
  campeonatoId: number,
  idCategoria: number,
) {
  return requestJson<Categoria>(
    `${campeonatosUrl}/${campeonatoId}/categorias`,
    {
      method: 'POST',
      token,
      body: JSON.stringify({ idCategoria }),
    },
  )
}
