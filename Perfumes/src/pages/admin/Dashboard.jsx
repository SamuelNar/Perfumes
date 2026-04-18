import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Dashboard() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="admin page-top">
      <div className="admin-sidebar">
        <h2 className="admin-sidebar-title">Free Elixires</h2>
        <nav className="admin-nav">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/productos">Productos</Link>
          <Link to="/admin/categorias">Categorías</Link>
          <Link to="/admin/intenciones">Intenciones</Link>
        </nav>
        <div className="admin-sidebar-bottom">
          <Link to="/" className="admin-link-site">← Ver sitio</Link>
          <button onClick={handleLogout} className="admin-btn-logout">Cerrar sesión</button>
        </div>
      </div>
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  )
}
