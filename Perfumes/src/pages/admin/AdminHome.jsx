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
      <h1 className="font-serif text-[1.6rem] text-dark mb-6">Dashboard</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5">
        {[
          { label: 'Productos', value: stats.products },
          { label: 'Categorías', value: stats.categories },
          { label: 'Intenciones', value: stats.intentions },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl p-7 px-5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gold/15">
            <span className="block font-serif text-[2.2rem] text-gold mb-1">{value}</span>
            <span className="text-xs text-[#888] tracking-[1px] uppercase">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
