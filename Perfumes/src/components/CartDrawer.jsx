import { useCart } from '../contexts/CartContext'
import { getImageUrl } from '../lib/storage'

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty, clearCart, totalItems, sendWhatsApp } = useCart()

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/35 z-[1100]" onClick={() => setOpen(false)} />}

      <div className={`fixed top-0 right-0 w-[380px] max-w-[90vw] h-screen bg-white z-[1200] flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.1)] transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>

        <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20">
          <h3 className="font-serif text-[1.2rem]">Tu carrito ({totalItems})</h3>
          <button className="bg-transparent border-none text-[#666] cursor-pointer text-2xl flex hover:text-dark transition-colors" onClick={() => setOpen(false)}>
            <span className="material-icons">close</span>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-[#999]">
            <span className="material-icons" style={{ fontSize: '3rem', color: '#ddd' }}>shopping_bag</span>
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto list-none p-0">
              {items.map((item) => (
                <li key={item.cartKey} className="flex gap-3 px-6 py-4 border-b border-black/5 items-center">
                  <img src={getImageUrl(item.image_url)} alt={item.name} className="w-[60px] h-[60px] object-cover rounded-md flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-[0.9rem] mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</h4>
                    <p className="text-xs text-[#999]">{item.category}</p>
                    {item.size && <p className="text-xs text-gold">{item.size}</p>}
                    {item.price && <p className="text-[0.85rem] font-bold text-dark mt-0.5">{item.price}</p>}
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        onClick={() => updateQty(item.cartKey, item.qty - 1)}
                        className="w-[26px] h-[26px] border border-gold/30 bg-white rounded cursor-pointer text-base flex items-center justify-center text-[#555] hover:border-gold hover:text-gold transition-all"
                      >−</button>
                      <span className="text-[0.9rem] font-semibold min-w-[16px] text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.cartKey, item.qty + 1)}
                        className="w-[26px] h-[26px] border border-gold/30 bg-white rounded cursor-pointer text-base flex items-center justify-center text-[#555] hover:border-gold hover:text-gold transition-all"
                      >+</button>
                    </div>
                  </div>
                  <button className="bg-transparent border-none text-[#ccc] cursor-pointer hover:text-[#d9534f] transition-colors" onClick={() => removeItem(item.cartKey)}>
                    <span className="material-icons">delete</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="px-6 py-5 border-t border-gold/20 flex flex-col gap-2.5">
              <button className="btn-whatsapp w-full" onClick={sendWhatsApp}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.01a9.855 9.855 0 01-5.022-1.378l-.36-.214-3.742.982.999-3.648-.235-.374A9.86 9.86 0 012.16 12.05C2.16 6.594 6.594 2.16 12.05 2.16c2.652 0 5.145 1.034 7.021 2.91a9.857 9.857 0 012.909 7.021c-.003 5.456-4.437 9.89-9.893 9.89l-.037.004zm8.413-18.298A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.414z"/>
                </svg>
                ENVIAR PEDIDO POR WHATSAPP
              </button>
              <button className="bg-transparent border-none text-xs text-[#999] cursor-pointer text-center hover:text-[#d9534f] transition-colors" onClick={clearCart}>
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
