import './App.css'

export function App() {
  return (
    <main className="app-shell">
      <section className="app-header">
        <p className="app-kicker">WallyBall</p>
        <h1>Frontend preparado</h1>
        <p className="app-description">
          Base React + TypeScript organizada para consumir personas-service,
          wally-service y reportes-service.
        </p>
      </section>

      <section className="module-grid" aria-label="Modulos principales">
        <article>
          <h2>Organizador</h2>
          <p>Campeonatos, categorias, equipos, jugadores, fixture y resultados.</p>
        </article>
        <article>
          <h2>Jugador</h2>
          <p>Portal personal con fixture, resultados y posiciones.</p>
        </article>
        <article>
          <h2>Reportes</h2>
          <p>Lecturas optimizadas desde reportes-service y Cassandra.</p>
        </article>
      </section>
    </main>
  )
}
