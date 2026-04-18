import { Link } from 'react-router-dom'

export default function Nosotros() {
  return (
    <main className="page-top">
      {/* ===== HERO ===== */}
      <section className="nosotros-hero">
        <img src="/images/web/foto1 nosotros.jpeg" alt="Nuestra Historia" className="nosotros-hero-img" />
        <div className="nosotros-hero-overlay"></div>
        <div className="nosotros-hero-content">
          <h1>Nuestra Historia</h1>
        </div>
      </section>

      {/* ===== TEXTO NOSOTROS ===== */}
      <section className="nosotros-texto">
        <div className="nosotros-texto-inner">
          <p>
            Free Elixires nace desde una búsqueda personal: crear espacios que se sientan refugio.
          </p>
          <p>
            Soy Sandra, y siempre sentí que el aroma tiene el poder de transformar la energía de un lugar.
            Cuando descubrí la gemoterapia, algo hizo clic: unir fragancias con la vibración de los cristales
            era el camino para crear algo con alma.
          </p>
          <p>
            Cada elixir está pensado con intención. No es solo un producto, es una experiencia sensorial
            que combina aromaterapia y gemoterapia para que tus espacios vibren diferente.
          </p>
          <p>
            Free Elixires es para quienes buscan más que un buen aroma: es para quienes eligen habitar
            sus espacios de forma consciente, con intención y con energía que se siente.
          </p>
          <p className="nosotros-firma">
            Sandra, Fundadora de Free Elixires
          </p>
        </div>
      </section>

      {/* ===== FOTO 2 ===== */}
      <section className="nosotros-foto2">
        <img src="/images/web/foto2 nosotros.jpeg" alt="Free Elixires – Sandra" loading="lazy" />
      </section>

      {/* ===== CTA ===== */}
      <section className="nosotros-cta">
        <h2>Sentí la magia de cada elixir en tu vida</h2>
        <Link to="/tienda" className="btn-primary">DESCUBRÍ LA COLECCIÓN</Link>
      </section>
    </main>
  )
}
