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
      <section className="relative w-full">
        <img
          src="/images/web/foto1 inicio.jpeg"
          alt="Difusor Sonrisa del Alma con varillas"
          className="w-full h-auto block"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-black/45" />
        <div className="absolute inset-0 flex items-center justify-center z-[2]">
          <div className="text-center text-white px-6 max-w-[700px]">
            <h1 className="font-serif text-5xl max-md:text-[2rem] font-normal leading-[1.3] mb-4">
              Habitá tu espacio<br />con intención consciente
            </h1>
            <Link to="/tienda" className="btn-primary">DESCUBRÍ LA COLECCIÓN</Link>
          </div>
        </div>
      </section>

      {/* ===== FRAGANCIAS CON ALMA ===== */}
      <section className="text-center py-[80px] px-6 max-w-[750px] mx-auto">
        <h2 className="font-serif text-[2rem] text-gold text-center mb-4">FRAGANCIAS CON ALMA</h2>
        <p className="text-[1.15rem] leading-[1.8] text-[#555] mt-2">
          Free Elixires es una colección de aromas artesanales creados para armonizar
          espacios, acompañar emociones y conectar con la energía de cada momento.
        </p>
      </section>

      {/* ===== EXPLORÁ LA COLECCIÓN ===== */}
      <section className="py-[60px] px-6 pb-[80px] max-w-[1200px] mx-auto">
        <h2 className="font-serif text-[2rem] text-dark text-center mb-4">EXPLORÁ LA COLECCIÓN</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6 mt-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/tienda?categoria=${encodeURIComponent(cat.name)}`}
              className="group relative overflow-hidden rounded-lg cursor-pointer block"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={getImageUrl(cat.image_url)}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-[1]">
                {cat.limited && (
                  <span className="inline-block bg-gold text-white px-2.5 py-0.5 text-[0.65rem] tracking-[1.5px] uppercase mb-1.5">
                    EDICIÓN LIMITADA
                  </span>
                )}
                <h3 className="font-serif text-[1.15rem] mb-1">{cat.name}</h3>
                <p className="text-xs opacity-85">{cat.phrase}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== ELEGÍ CÓMO QUERÉS SENTIRTE ===== */}
      <section className="py-[60px] px-6 pb-[80px] max-w-[1100px] mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-serif text-[2rem] text-dark text-center mb-4">ELEGÍ CÓMO QUERÉS SENTIRTE</h2>
          <p className="text-base text-[#888] mt-2">Sentí la magia de cada elixir en tu vida</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
          {intentions.map((int) => (
            <Link
              key={int.name}
              to={`/tienda?intencion=${encodeURIComponent(int.name)}`}
              className="bg-white border border-gold/25 rounded-lg p-6 px-4 text-center cursor-pointer transition-all duration-300 hover:shadow-[0_6px_20px_rgba(193,167,121,0.15)] hover:-translate-y-0.5 block"
            >
              <span className="material-icons text-[2rem] text-gold mb-2 block">{int.icon}</span>
              <h4 className="font-serif text-base mb-1.5">{int.name}</h4>
              <p className="text-xs text-[#888] leading-[1.5]">{int.phrase}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== ELIXIRES FAVORITOS ===== */}
      <section className="py-[60px] px-6 pb-[80px] max-w-[1200px] mx-auto">
        <div className="text-center mb-10">
          <span className="block text-center tracking-[3px] uppercase text-xs text-gold mb-2">ELIXIRES FAVORITOS</span>
          <h2 className="font-serif text-[2rem] text-dark text-center mb-4">Los aromas más elegidos</h2>
          <p className="text-base text-[#888] mt-2">Para acompañar distintos momentos del día.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}
