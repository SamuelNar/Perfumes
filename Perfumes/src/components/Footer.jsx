import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cierre">
        <h2>Fragancias que elevan</h2>
      </div>
      <div className="footer-top">
        <div className="footer-brand">
          <img src="/images/logo.webp" alt="Free Elixires" className="footer-logo" />
          <p>La esencia de lo invisible hecha aroma. Fragancias con alma, creadas con intención.</p>
        </div>
        <div className="footer-col">
          <h4>NAVEGACIÓN</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/tienda">Tienda</Link></li>
            <li><Link to="/elixires">Elixires</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>CONTACTO</h4>
          <ul>
            <li>Tel: 358 432-3047</li>
            <li>sandrapeano@hotmail.com</li>
            <li>Envíos: Correo Argentino · Mensajería local · Punto de retiro</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>SEGUINOS</h4>
          <div className="footer-social">
            <a href="https://www.instagram.com/freeelixires" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Free Elixires">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-social-icon">
                <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm10.5 1.5a1.25 1.25 0 1 1 0 2.5a1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6" />
              </svg>
            </a>
            <a href="https://wa.me/5493584323047" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de Free Elixires">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-social-icon">
                <path fill="currentColor" d="M19.05 4.94A9.94 9.94 0 0 0 12 2C6.48 2 2 6.47 2 12c0 1.77.46 3.5 1.34 5.03L2 22l5.1-1.31A9.95 9.95 0 0 0 12 22a10 10 0 0 0 7.05-17.06M12 20.01a8 8 0 0 1-4.07-1.11l-.29-.17l-3.03.78l.81-2.95l-.19-.3A8 8 0 1 1 12 20m4.39-5.47c-.24-.12-1.4-.69-1.61-.76s-.36-.12-.52.12s-.6.76-.73.91s-.27.18-.51.06a6.5 6.5 0 0 1-1.91-1.18a7.2 7.2 0 0 1-1.33-1.66c-.14-.24-.01-.37.11-.49c.11-.11.24-.28.36-.42c.12-.15.16-.24.24-.4c.08-.15.04-.3-.02-.42s-.52-1.26-.71-1.72c-.19-.46-.38-.4-.52-.41h-.44c-.15 0-.4.06-.61.3c-.21.24-.8.78-.8 1.9s.82 2.2.94 2.36s1.62 2.47 3.91 3.46c.55.24.98.39 1.31.5c.55.18 1.06.15 1.46.09c.45-.07 1.4-.57 1.6-1.12s.2-1.03.14-1.12s-.22-.15-.46-.27" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Free Elixires. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
