import { Link } from 'react-router-dom'

export default function Elixires() {
  return (
    <main className="pt-[70px]">
      {/* ===== HERO ===== */}
      <section className="relative w-full">
        <img src="/images/web/foto1 elixires.jpeg" alt="Piedras de distintas alturas" className="w-full h-auto block" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-black/45" />
        <div className="absolute inset-0 flex items-center justify-center z-[2]">
          <div className="text-center text-white px-6 max-w-[700px]">
            <h1 className="font-serif text-5xl max-md:text-[2rem] font-normal leading-[1.3] mb-4">
              Donde la energía<br />se vuelve intención
            </h1>
          </div>
        </div>
      </section>

      {/* ===== ¿QUÉ ES UN ELIXIR? ===== */}
      <section className="text-center py-[80px] px-6 max-w-[700px] mx-auto">
        <h2 className="font-serif text-[2rem] text-dark text-center mb-4">¿Qué es un Elixir Free?</h2>
        <p className="text-lg leading-[1.8] text-[#555] mb-4">Un elixir es mucho más que una fragancia.</p>
        <p className="text-lg leading-[1.8] text-[#555] mb-4">
          Es la fusión consciente entre aromaterapia y gemoterapia, creada con intención
          para armonizar, elevar y sostener la energía de tus espacios.
        </p>
        <p className="text-lg leading-[1.8] text-[#555] mb-4">
          Cada uno guarda una frecuencia única que acompaña la energía que elegís habitar.
        </p>
      </section>

      {/* ===== GEMOTERAPIA & AROMATERAPIA ===== */}
      <section className="max-w-[1000px] mx-auto px-6 pb-[80px] flex flex-col gap-12">
        {/* Card 1 — normal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-lg overflow-hidden aspect-[4/3]">
            <img src="/images/web/foto2 elixires gemoterapia.jpeg" alt="Gemoterapia – Piedras y cristales" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-serif text-2xl mb-4 text-gold">Gemoterapia</h3>
            <p className="text-base leading-[1.7] text-[#555] mb-3">
              Es el arte de conectar con la energía sutil de los cristales para armonizar
              emociones y espacios.
            </p>
            <p className="text-base leading-[1.7] text-[#555] mb-3">
              En cada elixir, la piedra es intención, presencia y vibración.
            </p>
          </div>
        </div>

        {/* Card 2 — reversed on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-lg overflow-hidden aspect-[4/3] md:order-last">
            <img src="/images/web/foto 3 elixires aromaterapia.jpeg" alt="Aromaterapia – Limones, flores y hojas" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-serif text-2xl mb-4 text-gold">Aromaterapia</h3>
            <p className="text-base leading-[1.7] text-[#555] mb-3">
              Nace del poder sutil de las esencias capaces de despertar los sentidos
              y expandir la energía del espacio.
            </p>
            <p className="text-base leading-[1.7] text-[#555] mb-3">
              En cada fragancia, el aroma se convierte en intención, presencia y
              transformación consciente.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FOTO + CTA ===== */}
      <section className="px-6 pb-[80px] max-w-[1000px] mx-auto">
        <div className="relative rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center">
          <img
            src="/images/web/foto mia sosteniendo piedra.jpeg"
            alt="Sostené la energía que querés habitar"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 z-[1]" />
          <div className="relative z-[2] text-center text-white py-10 px-6">
            <h2 className="font-serif text-[2rem] mb-6">Sostené la energía que querés habitar</h2>
            <Link to="/tienda" className="btn-primary">ELEGIR MI ELIXIR</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
