import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts, fetchCategories, fetchIntentions } from '../lib/api'
import ProductCard from '../components/ProductCard'

const INPUT_CLASS = 'px-[14px] py-2.5 border border-gold/30 rounded-md font-sans text-sm text-dark bg-white cursor-pointer appearance-auto focus:outline-none focus:border-gold w-full'

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

  const categoryOrder = useMemo(() => categories.map(c => c.name), [categories])

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
    return (
      <main className="pt-[70px]">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-9 h-9 border-[3px] border-gold/20 border-t-gold rounded-full animate-spin" />
        </div>
      </main>
    )
  }

  return (
    <main className="pt-[70px]">
      {/* ===== HERO ===== */}
      <section className="relative w-full">
        <img src="/images/web/Tienda.webp" alt="La Colección Free Elixires" className="w-full h-auto block" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-black/45" />
        <div className="absolute inset-0 flex items-center justify-center z-[2]">
          <div className="text-center text-white px-6 max-w-[700px]">
            <h1 className="font-serif text-5xl max-md:text-[2rem] font-normal leading-[1.3] mb-4">La Colección Free Elixires</h1>
          </div>
        </div>
      </section>

      {/* ===== FILTROS ===== */}
      <section className="max-w-[1200px] mx-auto py-10 px-6 pb-5">
        <div className="flex gap-5 items-end flex-wrap max-md:flex-col max-md:gap-3">
          <div className="flex flex-col gap-1.5 flex-1 min-w-[180px] max-md:min-w-full">
            <label htmlFor="filtro-cat" className="text-xs font-semibold tracking-[1.5px] uppercase text-[#999]">Productos</label>
            <select id="filtro-cat" value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className={INPUT_CLASS}>
              <option value="">Todos</option>
              {categoryOrder.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 flex-1 min-w-[180px] max-md:min-w-full">
            <label htmlFor="filtro-int" className="text-xs font-semibold tracking-[1.5px] uppercase text-[#999]">Energía / Intención</label>
            <select id="filtro-int" value={filterIntention} onChange={e => setFilterIntention(e.target.value)} className={INPUT_CLASS}>
              <option value="">Todas</option>
              {intentions.map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 flex-1 min-w-[180px] max-md:min-w-full">
            <label htmlFor="filtro-cry" className="text-xs font-semibold tracking-[1.5px] uppercase text-[#999]">Elixir</label>
            <select id="filtro-cry" value={filterCrystal} onChange={e => setFilterCrystal(e.target.value)} className={INPUT_CLASS}>
              <option value="">Todos</option>
              {crystals.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {hasFilters && (
            <button
              className="px-5 py-2.5 bg-transparent border border-gold text-gold text-xs tracking-[1px] cursor-pointer rounded-md transition-all hover:bg-gold hover:text-white whitespace-nowrap"
              onClick={clearFilters}
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </section>

      {/* ===== PRODUCTOS POR CATEGORÍA ===== */}
      <section className="max-w-[1200px] mx-auto py-5 px-6 pb-[80px]">
        {categoryOrder.map(cat => {
          const catProducts = grouped[cat]
          if (!catProducts || catProducts.length === 0) return null
          const desc = categoryMap[cat]

          return (
            <div key={cat} className="mb-[60px]">
              <div className="text-center mb-8 pb-4 border-b border-gold/20">
                <h2 className="font-serif text-[1.8rem] text-dark">{cat}</h2>
                {desc && <p className="text-[0.95rem] text-[#888] mt-2">{desc.phrase}</p>}
                {desc?.limited && (
                  <span className="inline-block bg-gold text-white px-3 py-0.5 text-[0.65rem] tracking-[1.5px] uppercase mt-2">
                    Edición Limitada
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catProducts.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-[60px] px-6 text-[#888]">
            <p className="mb-6 text-lg">No se encontraron productos con los filtros seleccionados.</p>
            <button className="btn-primary" onClick={clearFilters}>Ver todos los productos</button>
          </div>
        )}
      </section>
    </main>
  )
}
