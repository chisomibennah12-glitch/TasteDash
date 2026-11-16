import { Link } from 'react-router-dom'
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, Heart } from 'lucide-react'
import { useToast } from '../context/ToastContext'

function Cart({ cartItems, setCartItems }) {
  const { showToast } = useToast()

  const updateQuantity = (id, amount) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (item) => {
    setCartItems((currentItems) =>
      currentItems.filter((i) => i.id !== item.id)
    )
    showToast(`Removed ${item.name} from cart.`, 'info')
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const deliveryFee = cartItems.length > 0 ? 1000 : 0
  const total = subtotal + deliveryFee

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <ShoppingBag size={52} />

          <h1>Your cart is empty</h1>

          <p>
            You haven't added anything to your cart yet.
            Explore our delicious menu or check your saved favorites!
          </p>

          <div className="empty-cart-actions">
            <Link to="/menu" className="primary-button">
              Explore Menu <ArrowRight size={17} />
            </Link>
            <Link to="/favorites" className="secondary-button">
              <Heart size={16} /> Saved Favorites
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <div className="cart-heading">
        <span className="eyebrow">YOUR TASTEDASH ORDER</span>
        <h1>Shopping Cart</h1>
        <p>Review your selected meals before checkout.</p>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <span>{item.category}</span>
                <h3>{item.name}</h3>

                <strong>₦{item.price.toLocaleString()}</strong>

                <div className="quantity-control">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, -1)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    <Minus size={15} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              <div className="cart-item-actions">
                <strong>
                  ₦{(item.price * item.quantity).toLocaleString()}
                </strong>

                <button
                  type="button"
                  className="remove-item"
                  onClick={() => removeItem(item)}
                  aria-label={`Remove ${item.name} from cart`}
                  title="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₦{subtotal.toLocaleString()}</strong>
          </div>

          <div className="summary-row">
            <span>Estimated Delivery Fee</span>
            <strong>₦{deliveryFee.toLocaleString()}</strong>
          </div>

          <div className="summary-divider" />

          <div className="summary-total">
            <span>Total</span>
            <strong>₦{total.toLocaleString()}</strong>
          </div>

          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>

          <Link to="/menu" className="continue-shopping">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  )
}

export default Cart
