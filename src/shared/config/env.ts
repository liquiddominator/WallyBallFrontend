export const env = {
  personasApiUrl:
    import.meta.env.VITE_PERSONAS_API_URL?.replace(/\/$/, '') ??
    'http://localhost:5097',
  wallyApiUrl:
    import.meta.env.VITE_WALLY_API_URL?.replace(/\/$/, '') ??
    'http://localhost:5167',
}
