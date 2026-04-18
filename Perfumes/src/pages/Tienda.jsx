import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts, fetchCategories, fetchIntentions } from '../lib/api'
import ProductCard from '../components/ProductCard'

export default function Tienda() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [intentions, setIntentions] = useState([])
  const [loading, setLoading] = useState(true)

  const [filterCategory, setFilterCategory] = useState('')
  const [filterIntention, setFilterIntention] = useState('')
  const [filterCrystal, setFilterCrystal] = useState('')

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories(), fetchIntentions()])
      .then(([prods, cats, ints]) => {
        setAllProducts(prods)
        setCategories(cats)
        setIntentions(ints)
      })
      .finally(() => setLoading(false))
  }, [])

  // Read initial filters from URL params (e.g. coming from Inicio intenciones)
  useEffect(() => {
    const intencion = searchParams.get('intencion')
    const categoria = searchParams.get('categoria')
    if (intencion) setFilterIntention(intencion)
    if (categoria) setFilterCategory(categoria)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const crystals = useMemo(
    () => [...new Set(allProducts.map(p => p.crystal))].sort(),
    [allProducts]
  )

  const categoryOrder = useMemo(
    () => categories.map(c => c.name),
    [categories]
  )

  // Build a lookup map for category metadata
  const categoryMap = useMemo(() => {
    const m = {}
    categories.forEach(c => { m[c.name] = c })
    return m
  }, [categories])

  const filtered = useMemo(() => {
    return allProducts.filter(p => {
      const catName = p.categories?.name || ''
      const intName = p.intentions?.name || ''
      if (filterCategory && catName !== filterCategory) return false
      if (filterIntention && intName !== filterIntention) return false
      if (filterCrystal && p.crystal !== filterCrystal) return false
      return true
    })
  }, [allProducts, filterCategory, filterIntention, filterCrystal])

  // Group filtered products by category name
  const grouped = useMemo(() => {
    const map = {}
    filtered.forEach(p => {
      const catName = p.categories?.name || 'Sin categoría'
      if (!map[catName]) map[catName] = []
      map[catName].push(p)
    })
    return map
  }, [filtered])

  const clearFilters = () => {
    setFilterCategory('')
    setFilterIntention('')
    setFilterCrystal('')
    setSearchParams({})
  }

  const hasFilters = filterCategory || filterIntention || filterCrystal

  if (loading) {
    return <main className="page-top"><div className="page-loader"><div className="page-loader-spinner" /></div></main>
  }

  return (
    <main className="page-top">
      {/* ===== HERO ===== */}
      <section className="tienda-hero">
        <img src="/images/web/Tienda.webp" alt="La Colección Free Elixires" className="tienda-hero-img" />
        <div className="tienda-hero-overlay"></div>
        <div className="tienda-hero-content">
          <h1>La Colección Free Elixires</h1>
        </div>
      </section>

      {/* ===== FILTROS ===== */}
      <section className="tienda-filtros">
        <div className="filtros-row">
          <div className="filtro-group">
            <label htmlFor="filtro-cat">Productos</label>
            <select
              id="filtro-cat"
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
            >
              <option value="">Todos</option>
              {categoryOrder.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="filtro-group">
            <label htmlFor="filtro-int">Energía / Intención</label>
            <select
              id="filtro-int"
              value={filterIntention}
              onChange={e => setFilterIntention(e.target.value)}
            >
              <option value="">Todas</option>
              {intentions.map(i => (
                <option key={i.name} value={i.name}>{i.name}</option>
              ))}
            </select>
          </div>

          <div className="filtro-group">
            <label htmlFor="filtro-cry">Elixir</label>
            <select
              id="filtro-cry"
              value={filterCrystal}
              onChange={e => setFilterCrystal(e.target.value)}
            >
              <option value="">Todos</option>
              {crystals.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {hasFilters && (
            <button className="filtro-clear" onClick={clearFilters}>
              Limpiar filtros
            </button>
          )}
        </div>
      </section>

      {/* ===== PRODUCTOS POR CATEGORÍA ===== */}
      <section className="tienda-productos">
        {categoryOrder.map(cat => {
          const catProducts = grouped[cat]
          if (!catProducts || catProducts.length === 0) return null
          const desc = categoryMap[cat]

          return (
            <div key={cat} className="tienda-categoria">
              <div className="tienda-cat-header">
                <h2>{cat}</h2>
                {desc && <p className="tienda-cat-phrase">{desc.phrase}</p>}
                {desc?.limited && <span className="badge-limited">Edición Limitada</span>}
              </div>

              <div className="products-grid">
                {catProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="tienda-empty">
            <p>No se encontraron productos con los filtros seleccionados.</p>
            <button className="btn-primary" onClick={clearFilters}>Ver todos los productos</button>
          </div>
        )}
      </section>
    </main>
  )
}
