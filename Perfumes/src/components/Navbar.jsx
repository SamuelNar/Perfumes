import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { totalItems, setOpen } = useCart()

  const isActive = (path) => location.pathname === path ? 'active' : ''

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <img src="/images/logo.webp" alt="Free Elixires" className="navbar-logo-img" />
        </Link>
        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" className={isActive('/')} onClick={() => setMenuOpen(false)}>INICIO</Link></li>
          <li><Link to="/tienda" className={isActive('/tienda')} onClick={() => setMenuOpen(false)}>TIENDA</Link></li>
          <li><Link to="/elixires" className={isActive('/elixires')} onClick={() => setMenuOpen(false)}>ELIXIRES</Link></li>
          <li><Link to="/nosotros" className={isActive('/nosotros')} onClick={() => setMenuOpen(false)}>NOSOTROS</Link></li>
          <li><a href="https://wa.me/5493584323047" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>CONTACTO</a></li>
        </ul>
        <div className="navbar-actions">
          <button
            className="navbar-cart"
            onClick={() => setOpen(true)}
            title="Ver carrito"
          >
            <span className="material-icons">shopping_bag</span>
            {totalItems > 0 && <span className="navbar-cart-badge">{totalItems}</span>}
          </button>
          <button
            className="navbar-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <span className="material-icons">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
