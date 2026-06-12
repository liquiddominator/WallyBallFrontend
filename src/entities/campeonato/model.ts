export type Campeonato = {
  idCampeonato: number
  nombre: string
  fechaInicio: string
  fechaFin: string | null
  estado: string
  fechaCreacion: string
  fechaActualizacion: string | null
}

export type SaveCampeonatoRequest = {
  nombre: string
  fechaInicio: string
  fechaFin: string
}
