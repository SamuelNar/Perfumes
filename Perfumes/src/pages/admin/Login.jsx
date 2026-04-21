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
    if (username.trim().toLowerCase() !== 'admin') { setError('Usuario incorrecto'); return }
    setLoading(true)
    const { error: err } = await signIn('admin@freeelixir.com', password)
    if (err) setError(err.message)
    setLoading(false)
  }

  const fieldInput = 'w-full px-[14px] py-2.5 border border-gold/30 rounded-md font-sans text-sm text-dark bg-white focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(193,167,121,0.1)]'

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef] px-4">
      <div className="bg-white p-8 md:p-12 md:px-10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] w-full max-w-[420px]">
        <h1 className="font-serif text-[1.6rem] mb-2 text-dark">Panel de Administración</h1>
        <p className="text-sm text-[#888] mb-8">Iniciá sesión para gestionar tus productos</p>

        {error && (
          <div className="px-4 py-3 rounded-md mb-4 text-sm bg-[#fef2f2] text-[#d9534f] border border-[#fecaca]">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-xs font-semibold tracking-[1px] uppercase text-[#888]">Usuario</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required autoComplete="username" placeholder="admin" className={fieldInput} />
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-xs font-semibold tracking-[1px] uppercase text-[#888]">Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" className={fieldInput} />
          </div>
          <button type="submit" className="btn-primary w-full mt-2" disabled={loading}>
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
