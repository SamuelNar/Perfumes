import { useCart } from '../contexts/CartContext'
import { getImageUrl } from '../lib/storage'

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty, clearCart, totalItems, sendWhatsApp } = useCart()

  return (
    <>
      {open && <div className="cart-backdrop" onClick={() => setOpen(false)} />}
      <div className={`cart-drawer ${open ? 'cart-open' : ''}`}>
        <div className="cart-header">
          <h3>Tu carrito ({totalItems})</h3>
          <button className="cart-close" onClick={() => setOpen(false)}>
            <span className="material-icons">close</span>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <span className="material-icons" style={{ fontSize: '3rem', color: '#ddd' }}>shopping_bag</span>
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={getImageUrl(item.image_url)} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p className="cart-item-cat">{item.category}</p>
                    {item.price && <p className="cart-item-price">{item.price}</p>}
                    <div className="cart-qty">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeItem(item.id)}>
                    <span className="material-icons">delete</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <button className="btn-whatsapp cart-wa-btn" onClick={sendWhatsApp}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.01a9.855 9.855 0 01-5.022-1.378l-.36-.214-3.742.982.999-3.648-.235-.374A9.86 9.86 0 012.16 12.05C2.16 6.594 6.594 2.16 12.05 2.16c2.652 0 5.145 1.034 7.021 2.91a9.857 9.857 0 012.909 7.021c-.003 5.456-4.437 9.89-9.893 9.89l-.037.004zm8.413-18.298A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.414z"/>
                </svg>
                ENVIAR PEDIDO POR WHATSAPP
              </button>
              <button className="cart-clear" onClick={clearCart}>Vaciar carrito</button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
