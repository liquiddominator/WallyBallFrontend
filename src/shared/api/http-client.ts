import { ApiError } from './api-error'

type RequestOptions = RequestInit & {
  token?: string | null
}

export async function requestJson<TResponse>(
  url: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  const headers = new Headers(options.headers)

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json')
  }

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`)
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (response.status === 204) {
    return undefined as TResponse
  }

  const contentType = response.headers.get('content-type') ?? ''
  const payload = contentType.includes('application/json')
    ? await response.json()
    : null

  if (!response.ok) {
    const message =
      payload?.message ??
      payload?.title ??
      'No se pudo completar la solicitud.'

    throw new ApiError(message, response.status, payload?.code)
  }

  return payload as TResponse
}
