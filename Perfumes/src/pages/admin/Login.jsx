import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Login() {
  const { user, signIn } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to="/admin" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (username.trim().toLowerCase() !== 'admin') {
      setError('Usuario incorrecto')
      return
    }

    setLoading(true)
    const { error: err } = await signIn('admin@freeelixir.com', password)
    if (err) setError(err.message)
    setLoading(false)
  }

  return (
    <div className="admin-login page-top">
      <div className="admin-login-card">
        <h1>Panel de Administración</h1>
        <p className="admin-login-sub">Iniciá sesión para gestionar tus productos</p>
        {error && <div className="admin-alert admin-alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="admin-field">
            <label>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="admin"
            />
          </div>
          <div className="admin-field">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn-primary admin-btn-full" disabled={loading}>
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
