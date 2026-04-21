import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminFetchCategories, adminDeleteCategory } from '../../lib/adminApi'
import { getImageUrl } from '../../lib/storage'

export default function CategoryList() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    adminFetchCategories().then(setCategories).finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (id, name) => {
    if (!confirm(`¿Eliminar la categoría "${name}"? Los productos de esta categoría quedarán sin categoría.`)) return
    await adminDeleteCategory(id)
    load()
  }

  if (loading) return <p>Cargando categorías…</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-serif text-[1.6rem] text-dark">Categorías</h1>
        <Link to="/admin/categorias/nueva" className="btn-primary">+ Nueva categoría</Link>
      </div>

      <div className="bg-white rounded-xl overflow-x-auto shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gold/15">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {['Imagen','Nombre','Frase','Edición limitada','Orden','Acciones'].map(h => (
                <th key={h} className="text-left px-4 py-[14px] text-[0.72rem] tracking-[1.5px] uppercase text-[#999] border-b border-gold/15 bg-cream">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3 text-sm border-b border-black/4 align-middle">
                  <img src={getImageUrl(c.image_url)} alt={c.name} className="w-[50px] h-[50px] object-cover rounded-md" />
                </td>
                <td className="px-4 py-3 text-sm border-b border-black/4 align-middle">{c.name}</td>
                <td className="px-4 py-3 text-sm border-b border-black/4 align-middle">{c.phrase || '—'}</td>
                <td className="px-4 py-3 text-sm border-b border-black/4 align-middle">{c.limited ? 'Sí' : 'No'}</td>
                <td className="px-4 py-3 text-sm border-b border-black/4 align-middle">{c.sort_order}</td>
                <td className="px-4 py-3 text-sm border-b border-black/4 align-middle">
                  <div className="flex gap-2 whitespace-nowrap">
                    <Link to={`/admin/categorias/${c.id}/editar`} className="px-[14px] py-1.5 text-[0.78rem] bg-gold text-white border-none rounded cursor-pointer hover:bg-gold-dark transition-colors">Editar</Link>
                    <button onClick={() => handleDelete(c.id, c.name)} className="px-[14px] py-1.5 text-[0.78rem] bg-transparent text-[#d9534f] border border-[#d9534f] rounded cursor-pointer hover:bg-[#d9534f] hover:text-white transition-all">Eliminar</button>
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
