import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminFetchCategories, adminDeleteCategory } from '../../lib/adminApi'
import { getImageUrl } from '../../lib/storage'

export default function CategoryList() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    adminFetchCategories()
      .then(setCategories)
      .finally(() => setLoading(false))
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
      <div className="admin-page-header">
        <h1 className="admin-page-title">Categorías</h1>
        <Link to="/admin/categorias/nueva" className="btn-primary">+ Nueva categoría</Link>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Frase</th>
              <th>Edición limitada</th>
              <th>Orden</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td>
                  <img
                    src={getImageUrl(c.image_url)}
                    alt={c.name}
                    className="admin-thumb"
                  />
                </td>
                <td>{c.name}</td>
                <td>{c.phrase || '—'}</td>
                <td>{c.limited ? 'Sí' : 'No'}</td>
                <td>{c.sort_order}</td>
                <td className="admin-actions">
                  <Link to={`/admin/categorias/${c.id}/editar`} className="admin-btn-edit">Editar</Link>
                  <button onClick={() => handleDelete(c.id, c.name)} className="admin-btn-delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
