import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminFetchProducts, adminDeleteProduct } from '../../lib/adminApi'
import { getImageUrl } from '../../lib/storage'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    adminFetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
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
      <div className="admin-page-header">
        <h1 className="admin-page-title">Productos</h1>
        <Link to="/admin/productos/nuevo" className="btn-primary">+ Nuevo producto</Link>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Destacado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img
                    src={getImageUrl(p.image_url)}
                    alt={p.name}
                    className="admin-thumb"
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.categories?.name || '—'}</td>
                <td>{p.price || '—'}</td>
                <td>{p.featured ? '⭐' : '—'}</td>
                <td className="admin-actions">
                  <Link to={`/admin/productos/${p.id}/editar`} className="admin-btn-edit">Editar</Link>
                  <button onClick={() => handleDelete(p.id, p.name)} className="admin-btn-delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
