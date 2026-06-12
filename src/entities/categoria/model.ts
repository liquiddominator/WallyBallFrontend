export type Categoria = {
  idCategoria: number
  idCampeonatoCategoria: number | null
  idCampeonato: number | null
  campeonatoNombre: string | null
  nombre: string
  estado: string
  fechaCreacion: string
  fechaActualizacion: string | null
}

export type CreateCategoriaRequest = {
  nombre: string
}
