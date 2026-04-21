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
    return (
      <main className="pt-[70px]">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-9 h-9 border-[3px] border-gold/20 border-t-gold rounded-full animate-spin" />
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="pt-[70px] text-center py-[120px] px-6">
        <h2 className="font-serif text-2xl mb-6">Producto no encontrado</h2>
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

  const sectionClass = 'mb-6 pb-6 border-b border-gold/15'

  return (
    <main className="pt-[70px]">
      <section className="max-w-[1100px] mx-auto py-10 px-6 pb-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* IMAGEN */}
          <div className="rounded-lg overflow-hidden md:sticky md:top-[90px]">
            <img src={getImageUrl(product.image_url)} alt={product.name} className="w-full aspect-square object-cover" loading="lazy" />
          </div>

          {/* INFO */}
          <div>
            <Link to="/tienda" className="inline-flex items-center gap-1.5 text-sm text-gold mb-6 hover:opacity-70 transition-opacity">
              <span className="material-icons text-[18px]">arrow_back</span> Volver a la tienda
            </Link>

            <h1 className="font-serif text-[2.2rem] max-md:text-[1.6rem] mb-2">{product.name}</h1>
            <p className="flex items-center gap-1.5 text-[0.95rem] text-gold mb-4">
              <span className="material-icons text-[18px]">diamond</span> {crystalName}
            </p>

            <p className="text-xl font-bold text-dark mb-1">{product.price}</p>
            <p className="text-sm text-[#999] mb-8">{product.size}</p>

            <div className={sectionClass}>
              <h3 className="font-serif text-base text-gold mb-2">Intención Energética</h3>
              <p className="text-[0.95rem] leading-[1.7] text-[#555]">{product.energetic_intention}</p>
            </div>

            <div className={sectionClass}>
              <h3 className="font-serif text-base text-gold mb-2">Descripción Sensorial</h3>
              <p className="text-[0.95rem] leading-[1.7] text-[#555]">{product.sensory_desc}</p>
            </div>

            <div className={sectionClass}>
              <h3 className="font-serif text-base text-gold mb-2">Notas</h3>
              <p className="text-[0.95rem] leading-[1.7] text-[#555]">{product.notes}</p>
            </div>

            <div className={sectionClass}>
              <h3 className="font-serif text-base text-gold mb-2">Sobre el cristal — {crystalName}</h3>
              <p className="text-[0.95rem] leading-[1.7] text-[#555]">{product.crystal_desc}</p>
            </div>

            <div className={sectionClass}>
              <h3 className="font-serif text-base text-gold mb-2">Uso Recomendado</h3>
              <p className="text-[0.95rem] leading-[1.7] text-[#555]">{product.recommended_use}</p>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <button className="btn-primary inline-flex items-center justify-center gap-2" onClick={() => addItem(product)}>
                <span className="material-icons text-[20px]">add_shopping_cart</span>
                AGREGAR AL CARRITO
              </button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                COMPRAR POR WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
