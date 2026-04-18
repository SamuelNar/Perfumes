import { Link } from 'react-router-dom'

export default function Elixires() {
  return (
    <main className="page-top">
      {/* ===== HERO ===== */}
      <section className="elixires-hero">
        <img src="/images/web/foto1 elixires.jpeg" alt="Piedras de distintas alturas" className="elixires-hero-img" />
        <div className="elixires-hero-overlay"></div>
        <div className="elixires-hero-content">
          <h1>Donde la energía<br />se vuelve intención</h1>
        </div>
      </section>

      {/* ===== ¿QUÉ ES UN ELIXIR? ===== */}
      <section className="elixires-que-es">
        <h2 className="section-title">¿Qué es un Elixir Free?</h2>
        <p>
          Un elixir es mucho más que una fragancia.
        </p>
        <p>
          Es la fusión consciente entre aromaterapia y gemoterapia, creada con intención
          para armonizar, elevar y sostener la energía de tus espacios.
        </p>
        <p>
          Cada uno guarda una frecuencia única que acompaña la energía que elegís habitar.
        </p>
      </section>

      {/* ===== GEMOTERAPIA & AROMATERAPIA ===== */}
      <section className="elixires-terapias">
        <div className="terapia-card">
          <div className="terapia-img-wrapper">
            <img src="/images/web/foto2 elixires gemoterapia.jpeg" alt="Gemoterapia – Piedras y cristales" loading="lazy" />
          </div>
          <div className="terapia-content">
            <h3>Gemoterapia</h3>
            <p>
              Es el arte de conectar con la energía sutil de los cristales para armonizar
              emociones y espacios.
            </p>
            <p>
              En cada elixir, la piedra es intención, presencia y vibración.
            </p>
          </div>
        </div>

        <div className="terapia-card">
          <div className="terapia-img-wrapper">
            <img src="/images/web/foto 3 elixires aromaterapia.jpeg" alt="Aromaterapia – Limones, flores y hojas" loading="lazy" />
          </div>
          <div className="terapia-content">
            <h3>Aromaterapia</h3>
            <p>
              Nace del poder sutil de las esencias capaces de despertar los sentidos
              y expandir la energía del espacio.
            </p>
            <p>
              En cada fragancia, el aroma se convierte en intención, presencia y
              transformación consciente.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FOTO + CTA ===== */}
      <section className="elixires-cta">
        <div className="elixires-cta-inner">
          <img
            src="/images/web/foto mia sosteniendo piedra.jpeg"
            alt="Sostené la energía que querés habitar"
            className="elixires-cta-img"
            loading="lazy"
          />
          <div className="elixires-cta-overlay"></div>
          <div className="elixires-cta-content">
            <h2>Sostené la energía que querés habitar</h2>
            <Link to="/tienda" className="btn-primary">ELEGIR MI ELIXIR</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
