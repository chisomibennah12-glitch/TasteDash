import { Link } from 'react-router-dom'
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'

function Cart({ cartItems, setCartItems }) {
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

  const removeItem = (id) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    )
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
          <ShoppingBag size={48} />

          <h1>Your cart is empty</h1>

          <p>
            You haven't added anything to your cart yet.
            Explore our menu and find something delicious.
          </p>

          <Link to="/menu" className="primary-button">
            Explore Menu
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <div className="cart-heading">
        <span className="eyebrow">YOUR ORDER</span>
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

                <strong>
                  ₦{item.price.toLocaleString()}
                </strong>

                <div className="quantity-control">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    <Minus size={15} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
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
                  className="remove-item"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={17} />
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₦{deliveryFee.toLocaleString()}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <strong>Total</strong>
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