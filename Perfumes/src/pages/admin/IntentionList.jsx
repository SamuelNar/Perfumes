import { useEffect, useState } from 'react'
import { adminFetchIntentions, adminDeleteIntention, adminCreateIntention, adminUpdateIntention } from '../../lib/adminApi'

export default function IntentionList() {
  const [intentions, setIntentions] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', phrase: '', icon: '' })
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true)
    adminFetchIntentions()
      .then(setIntentions)
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const resetForm = () => {
    setEditing(null)
    setForm({ name: '', phrase: '', icon: '' })
    setError('')
  }

  const startEdit = (i) => {
    setEditing(i.id)
    setForm({ name: i.name, phrase: i.phrase || '', icon: i.icon || '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (editing) {
        await adminUpdateIntention(editing, form)
      } else {
        await adminCreateIntention(form)
      }
      resetForm()
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`¿Eliminar la intención "${name}"?`)) return
    await adminDeleteIntention(id)
    load()
  }

  if (loading) return <p>Cargando intenciones…</p>

  return (
    <div>
      <h1 className="admin-page-title">Intenciones</h1>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="admin-inline-form">
        <input
          placeholder="Nombre *"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />
        <input
          placeholder="Frase"
          value={form.phrase}
          onChange={(e) => setForm((f) => ({ ...f, phrase: e.target.value }))}
        />
        <input
          placeholder="Icono (ej: bolt)"
          value={form.icon}
          onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
          style={{ width: 100 }}
        />
        <button type="submit" className="btn-primary">
          {editing ? 'Guardar' : 'Agregar'}
        </button>
        {editing && (
          <button type="button" className="admin-btn-cancel" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Icono</th>
              <th>Nombre</th>
              <th>Frase</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {intentions.map((i) => (
              <tr key={i.id}>
                <td><span className="material-icons" style={{ fontSize: '1.5rem', color: '#c1a779' }}>{i.icon || '—'}</span></td>
                <td>{i.name}</td>
                <td>{i.phrase || '—'}</td>
                <td className="admin-actions">
                  <button onClick={() => startEdit(i)} className="admin-btn-edit">Editar</button>
                  <button onClick={() => handleDelete(i.id, i.name)} className="admin-btn-delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
