import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProductById } from '../lib/api'
import { getImageUrl } from '../lib/storage'
import { useCart } from '../contexts/CartContext'

const WHATSAPP = '5493584323047'

export default function ProductoDetalle() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    fetchProductById(id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <main className="page-top"><div className="page-loader"><div className="page-loader-spinner" /></div></main>
  }

  if (!product) {
    return (
      <main className="page-top detalle-not-found">
        <h2>Producto no encontrado</h2>
        <Link to="/tienda" className="btn-primary">Volver a la tienda</Link>
      </main>
    )
  }

  const crystalName = (product.crystal || '').replace('Elixir de ', '')
  const categoryName = product.categories?.name || ''

  const whatsappMsg = encodeURIComponent(
    `¡Hola! Me interesa el producto "${product.name}" (${categoryName}). ¿Podrías darme más información?`
  )
  const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${whatsappMsg}`

  return (
    <main className="page-top">
      <section className="detalle">
        <div className="detalle-grid">
          {/* IMAGEN */}
          <div className="detalle-img-wrapper">
            <img src={getImageUrl(product.image_url)} alt={product.name} className="detalle-img" loading="lazy" />
          </div>

          {/* INFO */}
          <div className="detalle-info">
            <Link to="/tienda" className="detalle-back">
              <span className="material-icons">arrow_back</span> Volver a la tienda
            </Link>

            <h1 className="detalle-name">{product.name}</h1>
            <p className="detalle-crystal">
              <span className="material-icons">diamond</span> {crystalName}
            </p>

            <p className="detalle-price">{product.price}</p>
            <p className="detalle-size">{product.size}</p>

            <div className="detalle-section">
              <h3>Intención Energética</h3>
              <p>{product.energetic_intention}</p>
            </div>

            <div className="detalle-section">
              <h3>Descripción Sensorial</h3>
              <p>{product.sensory_desc}</p>
            </div>

            <div className="detalle-section">
              <h3>Notas</h3>
              <p>{product.notes}</p>
            </div>

            <div className="detalle-section">
              <h3>Sobre el cristal — {crystalName}</h3>
              <p>{product.crystal_desc}</p>
            </div>

            <div className="detalle-section">
              <h3>Uso Recomendado</h3>
              <p>{product.recommended_use}</p>
            </div>

            <div className="detalle-buttons">
              <button className="btn-primary detalle-add-cart" onClick={() => addItem(product)}>
                <span className="material-icons">add_shopping_cart</span>
                AGREGAR AL CARRITO
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                COMPRAR POR WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
