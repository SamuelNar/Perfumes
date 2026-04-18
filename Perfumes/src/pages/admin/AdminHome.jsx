import { useEffect, useState } from 'react'
import { fetchCategories, fetchIntentions, fetchProducts } from '../../lib/api'

export default function AdminHome() {
  const [stats, setStats] = useState({ products: 0, categories: 0, intentions: 0 })

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories(), fetchIntentions()])
      .then(([p, c, i]) => setStats({ products: p.length, categories: c.length, intentions: i.length }))
  }, [])

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span className="admin-stat-number">{stats.products}</span>
          <span className="admin-stat-label">Productos</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-number">{stats.categories}</span>
          <span className="admin-stat-label">Categorías</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-number">{stats.intentions}</span>
          <span className="admin-stat-label">Intenciones</span>
        </div>
      </div>
    </div>
  )
}
