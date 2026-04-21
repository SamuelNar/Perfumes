import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="text-center py-14 px-6 bg-cream border-t border-gold/20">
        <span className="block tracking-[4px] uppercase text-xs text-gold/70 mb-3">Free Elixires</span>
        <h2 className="font-serif text-[1.8rem] text-dark leading-tight mb-3">Fragancias que elevan</h2>
        <div className="w-12 h-px bg-gold/50 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 max-w-[1200px] mx-auto py-[60px] px-6 border-t border-gold/20">
        <div>
          <img src="/images/logo.webp" alt="Free Elixires" className="h-[45px] mb-4" />
          <p className="text-sm text-[#888] leading-relaxed">La esencia de lo invisible hecha aroma. Fragancias con alma, creadas con intención.</p>
        </div>

        <div>
          <h4 className="text-xs tracking-[2px] uppercase text-gold mb-4">NAVEGACIÓN</h4>
          <ul className="list-none">
            <li className="mb-2 text-sm text-[#666]"><Link to="/" className="hover:text-gold transition-colors">Inicio</Link></li>
            <li className="mb-2 text-sm text-[#666]"><Link to="/tienda" className="hover:text-gold transition-colors">Tienda</Link></li>
            <li className="mb-2 text-sm text-[#666]"><Link to="/elixires" className="hover:text-gold transition-colors">Elixires</Link></li>
            <li className="mb-2 text-sm text-[#666]"><Link to="/nosotros" className="hover:text-gold transition-colors">Nosotros</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-[2px] uppercase text-gold mb-4">CONTACTO</h4>
          <ul className="list-none">
            <li className="mb-2 text-sm text-[#666]">Tel: 358 432-3047</li>
            <li className="mb-2 text-sm text-[#666]">sandrapeano@hotmail.com</li>
            <li className="mb-2 text-sm text-[#666]">Envíos: Correo Argentino · Mensajería local · Punto de retiro</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-[2px] uppercase text-gold mb-4">SEGUINOS</h4>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/freeelixires"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Free Elixires"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-white transition-all"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
                <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm10.5 1.5a1.25 1.25 0 1 1 0 2.5a1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6" />
              </svg>
            </a>
            <a
              href="https://wa.me/5493584323047"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Free Elixires"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-white transition-all"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
                <path fill="currentColor" d="M19.05 4.94A9.94 9.94 0 0 0 12 2C6.48 2 2 6.47 2 12c0 1.77.46 3.5 1.34 5.03L2 22l5.1-1.31A9.95 9.95 0 0 0 12 22a10 10 0 0 0 7.05-17.06M12 20.01a8 8 0 0 1-4.07-1.11l-.29-.17l-3.03.78l.81-2.95l-.19-.3A8 8 0 1 1 12 20m4.39-5.47c-.24-.12-1.4-.69-1.61-.76s-.36-.12-.52.12s-.6.76-.73.91s-.27.18-.51.06a6.5 6.5 0 0 1-1.91-1.18a7.2 7.2 0 0 1-1.33-1.66c-.14-.24-.01-.37.11-.49c.11-.11.24-.28.36-.42c.12-.15.16-.24.24-.4c.08-.15.04-.3-.02-.42s-.52-1.26-.71-1.72c-.19-.46-.38-.4-.52-.41h-.44c-.15 0-.4.06-.61.3c-.21.24-.8.78-.8 1.9s.82 2.2.94 2.36s1.62 2.47 3.91 3.46c.55.24.98.39 1.31.5c.55.18 1.06.15 1.46.09c.45-.07 1.4-.57 1.6-1.12s.2-1.03.14-1.12s-.22-.15-.46-.27" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-5 px-6 border-t border-gold/15 text-xs text-[#aaa]">
        <p>&copy; 2025 Free Elixires. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
