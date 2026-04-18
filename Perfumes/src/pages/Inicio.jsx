import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchCategories, fetchIntentions, fetchFeaturedProducts } from '../lib/api'
import { getImageUrl } from '../lib/storage'
import ProductCard from '../components/ProductCard'

export default function Inicio() {
  const [categories, setCategories] = useState([])
  const [intentions, setIntentions] = useState([])
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    fetchCategories().then(setCategories)
    fetchIntentions().then(setIntentions)
    fetchFeaturedProducts().then(setFeatured)
  }, [])

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <img
          src="/images/web/foto1 inicio.jpeg"
          alt="Difusor Sonrisa del Alma con varillas"
          className="hero-bg"
        />
        <div className="hero-content">
          <h1>Habitá tu espacio<br />con intención consciente</h1>
          <Link to="/tienda" className="btn-primary">DESCUBRÍ LA COLECCIÓN</Link>
        </div>
      </section>

      {/* ===== FRAGANCIAS CON ALMA ===== */}
      <section className="fragancias-section">
        <div className="fragancias-content">
          <h2 className="section-title-gold">FRAGANCIAS CON ALMA</h2>
          <p className="fragancias-text">
            Free Elixires es una colección de aromas artesanales creados para armonizar
            espacios, acompañar emociones y conectar con la energía de cada momento.
          </p>
        </div>
      </section>

      {/* ===== EXPLORÁ LA COLECCIÓN ===== */}
      <section className="explora-section">
        <h2 className="section-title">EXPLORÁ LA COLECCIÓN</h2>
        <div className="explora-grid">
          {categories.map((cat) => (
            <Link key={cat.id} to="/tienda" className="explora-card">
              <div className="explora-img-wrapper">
                <img src={getImageUrl(cat.image_url)} alt={cat.name} loading="lazy" />
                <div className="explora-overlay"></div>
              </div>
              <div className="explora-info">
                {cat.limited && <span className="explora-badge">EDICIÓN LIMITADA</span>}
                <h3>{cat.name}</h3>
                <p className="explora-phrase">{cat.phrase}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== ELEGÍ CÓMO QUERÉS SENTIRTE ===== */}
      <section className="intenciones-section">
        <div className="intenciones-header">
          <h2 className="section-title">ELEGÍ CÓMO QUERÉS SENTIRTE</h2>
          <p className="intenciones-subtitle">Sentí la magia de cada elixir en tu vida</p>
        </div>
        <div className="intenciones-grid">
          {intentions.map((int) => (
            <Link
              key={int.name}
              to={`/tienda?intencion=${encodeURIComponent(int.name)}`}
              className="intencion-card"
            >
              <span className="material-icons intencion-icon">{int.icon}</span>
              <h4>{int.name}</h4>
              <p>{int.phrase}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== ELIXIRES FAVORITOS ===== */}
      <section className="favoritos-section">
        <div className="favoritos-header">
          <span className="section-label">ELIXIRES FAVORITOS</span>
          <h2 className="section-title">Los aromas más elegidos</h2>
          <p className="favoritos-subtitle">
            Para acompañar distintos momentos del día.
          </p>
        </div>
        <div className="favoritos-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}
