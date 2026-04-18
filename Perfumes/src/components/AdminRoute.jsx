import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <div className="admin-loading page-top"><p>Cargando…</p></div>
  if (!user) return <Navigate to="/admin/login" replace />

  return children
}
