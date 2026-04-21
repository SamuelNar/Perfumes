import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const NAV_LINKS = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/productos', label: 'Productos' },
  { to: '/admin/categorias', label: 'Categorías' },
  { to: '/admin/intenciones', label: 'Intenciones' },
]

export default function Dashboard() {
  const [open, setOpen] = useState(false)
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-[#f5f3ef]">

      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[90] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-64 bg-dark text-white z-[100]
        flex flex-col transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="flex items-center justify-between px-5 h-14 border-b border-white/10 flex-shrink-0">
          <h2 className="font-serif text-lg text-gold">Free Elixires</h2>
          <button
            className="md:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setOpen(false)}
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        <nav className="flex flex-col flex-1 py-3 overflow-y-auto">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-gold/15 transition-all"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-5 border-t border-white/10 flex flex-col gap-2.5 flex-shrink-0">
          <Link to="/" className="text-xs text-white/50 hover:text-gold transition-colors">← Ver sitio</Link>
          <button
            onClick={handleLogout}
            className="bg-transparent border border-white/20 text-white/70 px-4 py-2 text-xs cursor-pointer rounded-md transition-all hover:border-gold hover:text-gold text-left"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-dark flex items-center justify-between px-4 z-[80] flex-shrink-0">
        <h2 className="font-serif text-lg text-gold">Free Elixires</h2>
        <button
          className="text-white/70 hover:text-white transition-colors"
          onClick={() => setOpen(true)}
        >
          <span className="material-icons">menu</span>
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64 min-h-screen">
        <div className="p-4 pt-18 md:pt-8 md:p-10">
          <Outlet />
        </div>
      </div>

    </div>
  )
}
