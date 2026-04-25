import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminFetchProducts, adminDeleteProduct } from '../../lib/adminApi'
import { getProductImageUrl } from '../../lib/storage'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    adminFetchProducts().then(setProducts).finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (id, name) => {
    if (!confirm(`¿Eliminar "${name}"?`)) return
    await adminDeleteProduct(id)
    load()
  }

  if (loading) return <p>Cargando productos…</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-serif text-[1.6rem] text-dark">Productos</h1>
        <Link to="/admin/productos/nuevo" className="btn-primary">+ Nuevo producto</Link>
      </div>

      <div className="bg-white rounded-xl overflow-x-auto shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gold/15">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {['Imagen','Nombre','Categoría','Precio','Destacado','Acciones'].map(h => (
                <th key={h} className="text-left px-4 py-[14px] text-[0.72rem] tracking-[1.5px] uppercase text-[#999] border-b border-gold/15 bg-cream">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 text-sm border-b border-black/4 align-middle">
                  <img src={getProductImageUrl(p)} alt={p.name} className="w-[50px] h-[50px] object-cover rounded-md" />
                </td>
                <td className="px-4 py-3 text-sm border-b border-black/4 align-middle">{p.name}</td>
                <td className="px-4 py-3 text-sm border-b border-black/4 align-middle">{p.categories?.name || '—'}</td>
                <td className="px-4 py-3 text-sm border-b border-black/4 align-middle">{p.price || '—'}</td>
                <td className="px-4 py-3 text-sm border-b border-black/4 align-middle">{p.featured ? '⭐' : '—'}</td>
                <td className="px-4 py-3 text-sm border-b border-black/4 align-middle">
                  <div className="flex gap-2 whitespace-nowrap">
                    <Link to={`/admin/productos/${p.id}/editar`} className="px-[14px] py-1.5 text-[0.78rem] bg-gold text-white border-none rounded cursor-pointer hover:bg-gold-dark transition-colors">Editar</Link>
                    <button onClick={() => handleDelete(p.id, p.name)} className="px-[14px] py-1.5 text-[0.78rem] bg-transparent text-[#d9534f] border border-[#d9534f] rounded cursor-pointer hover:bg-[#d9534f] hover:text-white transition-all">Eliminar</button>
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
