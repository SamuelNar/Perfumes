import { memo } from 'react'
import { Link } from 'react-router-dom'
import { getImageUrl } from '../lib/storage'
import { useCart } from '../contexts/CartContext'

export default memo(function ProductCard({ product }) {
  const categoryName = product.categories?.name || product.category || ''
  const crystal = product.crystal || ''
  const { addItem } = useCart()

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group bg-white rounded-lg overflow-hidden border border-gold/15 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(193,167,121,0.15)] hover:-translate-y-0.5 block"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={getImageUrl(product.image_url)}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white px-4 pb-3 pt-10 text-sm italic leading-snug [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
          {product.short_desc}
        </div>
        <button
          className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/90 border-none text-gold cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-[2] hover:bg-gold hover:text-white"
          onClick={handleAdd}
          title="Agregar al carrito"
        >
          <span className="material-icons text-[20px]">add_shopping_cart</span>
        </button>
      </div>
      <div className="p-4">
        <h4 className="font-serif text-base mb-1">{product.name}</h4>
        <p className="text-sm text-[#666]">{categoryName} – {crystal.replace('Elixir de ', '')}</p>
      </div>
    </Link>
  )
})
