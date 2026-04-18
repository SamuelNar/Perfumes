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
    <Link to={`/producto/${product.id}`} className="product-card">
      <div className="product-card-img">
        <img src={getImageUrl(product.image_url)} alt={product.name} loading="lazy" />
        <div className="product-card-phrase">{product.short_desc}</div>
        <button className="product-card-add" onClick={handleAdd} title="Agregar al carrito">
          <span className="material-icons">add_shopping_cart</span>
        </button>
      </div>
      <div className="product-card-body">
        <h4 className="product-card-name">{product.name}</h4>
        <p className="product-card-meta">
          {categoryName} – {crystal.replace('Elixir de ', '')}
        </p>
      </div>
    </Link>
  )
})
