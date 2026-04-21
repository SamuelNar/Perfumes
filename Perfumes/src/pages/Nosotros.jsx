import { Link } from 'react-router-dom'

export default function Nosotros() {
  return (
    <main className="pt-[70px]">
      {/* ===== HERO ===== */}
      <section className="relative w-full">
        <img src="/images/web/foto1 nosotros.jpeg" alt="Nuestra Historia" className="w-full h-auto block" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-black/45" />
        <div className="absolute inset-0 flex items-center justify-center z-[2]">
          <div className="text-center text-white px-6 max-w-[700px]">
            <h1 className="font-serif text-5xl max-md:text-[2rem] font-normal leading-[1.3] mb-4">Nuestra Historia</h1>
          </div>
        </div>
      </section>

      {/* ===== TEXTO ===== */}
      <section className="py-[80px] px-6 max-w-[700px] mx-auto">
        <p className="text-lg leading-[1.8] text-[#555] mb-5">
          Free Elixires nace desde una búsqueda personal: crear espacios que se sientan refugio.
        </p>
        <p className="text-lg leading-[1.8] text-[#555] mb-5">
          Soy Sandra, y siempre sentí que el aroma tiene el poder de transformar la energía de un lugar.
          Cuando descubrí la gemoterapia, algo hizo clic: unir fragancias con la vibración de los cristales
          era el camino para crear algo con alma.
        </p>
        <p className="text-lg leading-[1.8] text-[#555] mb-5">
          Cada elixir está pensado con intención. No es solo un producto, es una experiencia sensorial
          que combina aromaterapia y gemoterapia para que tus espacios vibren diferente.
        </p>
        <p className="text-lg leading-[1.8] text-[#555] mb-5">
          Free Elixires es para quienes buscan más que un buen aroma: es para quienes eligen habitar
          sus espacios de forma consciente, con intención y con energía que se siente.
        </p>
        <p className="font-serif italic text-gold mt-8 text-[1.15rem]">
          Sandra, Fundadora de Free Elixires
        </p>
      </section>

      {/* ===== FOTO 2 ===== */}
      <section className="max-w-[800px] mx-auto px-6 pb-10">
        <img src="/images/web/foto2 nosotros.jpeg" alt="Free Elixires – Sandra" loading="lazy" className="w-full h-auto rounded-lg block" />
      </section>

      {/* ===== CTA ===== */}
      <section className="text-center py-[60px] px-6 pb-[80px]">
        <h2 className="font-serif text-[1.8rem] mb-6 text-dark">Sentí la magia de cada elixir en tu vida</h2>
        <Link to="/tienda" className="btn-primary">DESCUBRÍ LA COLECCIÓN</Link>
      </section>
    </main>
  )
}
