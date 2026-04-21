import { useEffect, useState } from 'react'
import { adminFetchIntentions, adminDeleteIntention, adminCreateIntention, adminUpdateIntention } from '../../lib/adminApi'

const fieldInput = 'px-[14px] py-2.5 border border-gold/30 rounded-md font-sans text-sm flex-1 min-w-[150px] focus:outline-none focus:border-gold'

export default function IntentionList() {
  const [intentions, setIntentions] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', phrase: '', icon: '' })
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true)
    adminFetchIntentions().then(setIntentions).finally(() => setLoading(false))
  }

  useEffect(load, [])

  const resetForm = () => { setEditing(null); setForm({ name: '', phrase: '', icon: '' }); setError('') }

  const startEdit = (i) => { setEditing(i.id); setForm({ name: i.name, phrase: i.phrase || '', icon: i.icon || '' }) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (editing) { await adminUpdateIntention(editing, form) } else { await adminCreateIntention(form) }
      resetForm()
      load()
    } catch (err) { setError(err.message) }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`¿Eliminar la intención "${name}"?`)) return
    await adminDeleteIntention(id)
    load()
  }

  if (loading) return <p>Cargando intenciones…</p>

  return (
    <div>
      <h1 className="font-serif text-[1.6rem] text-dark mb-6">Intenciones</h1>

      {error && <div className="px-4 py-3 rounded-md mb-4 text-sm bg-[#fef2f2] text-[#d9534f] border border-[#fecaca]">{error}</div>}

      <form onSubmit={handleSubmit} className="flex gap-2.5 items-center flex-wrap mb-6 bg-white p-4 rounded-xl border border-gold/15">
        <input placeholder="Nombre *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className={fieldInput} />
        <input placeholder="Frase" value={form.phrase} onChange={e => setForm(f => ({ ...f, phrase: e.target.value }))} className={fieldInput} />
        <input placeholder="Icono (ej: bolt)" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} style={{ width: 100 }} className="px-[14px] py-2.5 border border-gold/30 rounded-md font-sans text-sm focus:outline-none focus:border-gold w-[100px]" />
        <button type="submit" className="btn-primary">{editing ? 'Guardar' : 'Agregar'}</button>
        {editing && (
          <button
            type="button"
            className="px-9 py-[14px] bg-transparent border border-[#ccc] text-[#555] text-sm tracking-[1px] cursor-pointer hover:border-[#999] hover:text-dark transition-all"
            onClick={resetForm}
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="bg-white rounded-xl overflow-x-auto shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gold/15">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {['Icono','Nombre','Frase','Acciones'].map(h => (
                <th key={h} className="text-left px-4 py-[14px] text-[0.72rem] tracking-[1.5px] uppercase text-[#999] border-b border-gold/15 bg-cream">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {intentions.map((i) => (
              <tr key={i.id}>
                <td className="px-4 py-3 text-sm border-b border-black/4 align-middle">
                  <span className="material-icons" style={{ fontSize: '1.5rem', color: '#c1a779' }}>{i.icon || '—'}</span>
                </td>
                <td className="px-4 py-3 text-sm border-b border-black/4 align-middle">{i.name}</td>
                <td className="px-4 py-3 text-sm border-b border-black/4 align-middle">{i.phrase || '—'}</td>
                <td className="px-4 py-3 text-sm border-b border-black/4 align-middle">
                  <div className="flex gap-2 whitespace-nowrap">
                    <button onClick={() => startEdit(i)} className="px-[14px] py-1.5 text-[0.78rem] bg-gold text-white border-none rounded cursor-pointer hover:bg-gold-dark transition-colors">Editar</button>
                    <button onClick={() => handleDelete(i.id, i.name)} className="px-[14px] py-1.5 text-[0.78rem] bg-transparent text-[#d9534f] border border-[#d9534f] rounded cursor-pointer hover:bg-[#d9534f] hover:text-white transition-all">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
