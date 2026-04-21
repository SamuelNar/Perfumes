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
  const [selectedSize, setSelectedSize] = useState(null)
  const [imageLoading, setImageLoading] = useState(false)
  const [displayedImageSrc, setDisplayedImageSrc] = useState('')
  const { addItem } = useCart()

  useEffect(() => {
    fetchProductById(id)
      .then((data) => {
        setProduct(data)

        const sizes = data?.size
          ? data.size.split('/').map(s => s.trim()).filter(Boolean)
          : []

        const initialSize = sizes[0] || null
        setSelectedSize(initialSize)
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  const sizes = product?.size
    ? product.size.split('/').map(s => s.trim()).filter(Boolean)
    : []

  const hasVariants = sizes.length > 1

  const getCurrentImageUrl = () => {
    if (!product) return ''

    if (!hasVariants) return product.image_url

    if (selectedSize?.includes('200')) {
      return product.image_url200ml || product.image_url
    }

    return product.image_url
  }

  const currentImageUrl = getCurrentImageUrl()
  const currentImageSrc = currentImageUrl ? getImageUrl(currentImageUrl) : ''

  useEffect(() => {
    if (!currentImageSrc) {
      setDisplayedImageSrc('')
      return
    }

    // primera carga: mostrar directo si todavía no hay imagen previa
    if (!displayedImageSrc) {
      setImageLoading(true)

      const img = new window.Image()
      img.src = currentImageSrc

      img.onload = () => {
        setDisplayedImageSrc(currentImageSrc)
        setImageLoading(false)
      }

      img.onerror = () => {
        setDisplayedImageSrc(currentImageSrc)
        setImageLoading(false)
      }

      return
    }

    // si es la misma imagen, no hacer nada
    if (displayedImageSrc === currentImageSrc) return

    // cambio de variante: precargar antes de reemplazar
    setImageLoading(true)

    const img = new window.Image()
    img.src = currentImageSrc

    img.onload = () => {
      setDisplayedImageSrc(currentImageSrc)
      setImageLoading(false)
    }

    img.onerror = () => {
      setDisplayedImageSrc(currentImageSrc)
      setImageLoading(false)
    }
  }, [currentImageSrc, displayedImageSrc])

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
  const sectionClass = 'mb-6 pb-6 border-b border-gold/15'

  const whatsappMsg = encodeURIComponent(
    `¡Hola! Me interesa el producto "${product.name}"${selectedSize ? ` (${selectedSize})` : ''} (${categoryName}). ¿Podrías darme más información?`
  )
  const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${whatsappMsg}`

  return (
    <main className="pt-[70px]">
      <section className="max-w-[1100px] mx-auto py-10 px-6 pb-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          <div className="md:sticky md:top-[90px]">
  <div className="relative overflow-hidden rounded-[28px] border border-[#e8dccb] bg-[#f6f1ea] p-4 md:p-6 shadow-[0_18px_50px_rgba(0,0,0,0.07)]">
    
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.22)_45%,transparent_70%)] opacity-40" />

    <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[22px] bg-transparent">
      {imageLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#f6f1ea]/72 backdrop-blur-[1.5px]">
          <div className="h-8 w-8 rounded-full border-[3px] border-gold/20 border-t-gold animate-spin" />
        </div>
      )}

      {displayedImageSrc && (
        <img
          src={displayedImageSrc}
          alt={`${product.name}${selectedSize ? ` ${selectedSize}` : ''}`}
          className={`h-full w-full object-contain transition-all duration-500 ease-out ${
            imageLoading ? 'scale-[0.985] opacity-70' : 'scale-100 opacity-100'
          }`}
          loading="eager"
        />
      )}
    </div>

    <div className="pointer-events-none absolute bottom-4 left-4 z-20 flex flex-col gap-2 md:bottom-5 md:left-5">
      <span className="rounded-full border border-white/50 bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7b6a52] backdrop-blur-md">
        Free Elixires
      </span>

      {product.categories?.limited && (
        <span className="rounded-full border border-white/50 bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7b6a52] backdrop-blur-md">
          Edición limitada
        </span>
      )}

      {selectedSize && (
        <span className="rounded-full border border-white/50 bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7b6a52] backdrop-blur-md">
          {selectedSize}
        </span>
      )}
    </div>
  </div>
</div>

          <div>
            <Link to="/tienda" className="inline-flex items-center gap-1.5 text-sm text-gold mb-6 hover:opacity-70 transition-opacity">
              <span className="material-icons text-[18px]">arrow_back</span> Volver a la tienda
            </Link>

            <h1 className="font-serif text-[2.2rem] max-md:text-[1.6rem] mb-2">{product.name}</h1>
            <p className="flex items-center gap-1.5 text-[0.95rem] text-gold mb-4">
              <span className="material-icons text-[18px]">diamond</span> {crystalName}
            </p>

            <p className="text-xl font-bold text-dark mb-1">{product.price}</p>

            {hasVariants ? (
              <div className="mb-8">
                <p className="text-sm text-[#999] mb-2">Tamaño</p>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm border rounded-md cursor-pointer transition-all ${selectedSize === size
                          ? 'border-gold bg-gold text-white'
                          : 'border-gold/30 bg-white text-dark hover:border-gold'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#999] mb-8">{product.size}</p>
            )}

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
              <button
                className="btn-primary inline-flex items-center justify-center gap-2"
                onClick={() => addItem({ ...product, selectedSize })}
              >
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