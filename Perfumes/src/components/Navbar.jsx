import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

const NAV_LINKS = [
  { to: '/', label: 'INICIO' },
  { to: '/tienda', label: 'TIENDA' },
  { to: '/elixires', label: 'ELIXIRES' },
  { to: '/nosotros', label: 'NOSOTROS' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { totalItems, setOpen } = useCart()

  const close = () => setMenuOpen(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white/97 backdrop-blur-[10px] border-b border-gold/20 shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 h-[70px]">

        <Link to="/" onClick={close}>
          <img src="/images/logo.webp" alt="Free Elixires" className="h-[50px] w-auto" />
        </Link>

        <ul className={`list-none items-center
          md:flex md:flex-row md:static md:bg-transparent md:backdrop-blur-none
          md:shadow-none md:py-0 md:px-0 md:gap-8
          ${menuOpen
            ? 'flex flex-col absolute top-[70px] left-0 right-0 bg-white/98 backdrop-blur-[10px] py-5 px-6 gap-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
            : 'hidden md:flex'
          }`}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={close}
                className={`text-[0.8rem] font-semibold tracking-[2px] uppercase transition-colors ${
                  location.pathname === to ? 'text-gold' : 'text-[#555] hover:text-gold'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://wa.me/5493584323047"
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="text-[0.8rem] font-semibold tracking-[2px] uppercase text-[#555] hover:text-gold transition-colors"
            >
              CONTACTO
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <button
            className="relative bg-transparent border-none text-gold cursor-pointer transition-colors flex items-center hover:text-gold-dark"
            onClick={() => setOpen(true)}
            title="Ver carrito"
          >
            <span className="material-icons text-[24px]">shopping_bag</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gold text-white text-[0.6rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="md:hidden bg-transparent border-none text-gold cursor-pointer text-[28px] flex items-center"
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
