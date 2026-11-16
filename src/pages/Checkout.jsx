/* eslint-disable react-hooks/purity */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Tag, CheckCircle2 } from 'lucide-react'
import { useToast } from '../context/ToastContext'

function Checkout({ cartItems, setCartItems, addOrder }) {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')
  const [couponCode, setCouponCode] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState('')

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const discountAmount = Math.round((subtotal * discountPercent) / 100)
  const deliveryFee = cartItems.length > 0 ? 1000 : 0
  const total = Math.max(0, subtotal - discountAmount + deliveryFee)

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    const cleanCode = couponCode.trim().toUpperCase()

    if (cleanCode === 'TASTEDASH10') {
      setDiscountPercent(10)
      setAppliedCoupon('TASTEDASH10 (10% OFF)')
      showToast('Promo code TASTEDASH10 applied successfully! 10% saved.', 'success')
      setCouponCode('')
    } else if (cleanCode === 'FIRSTBITE' || cleanCode === 'CHOP15') {
      setDiscountPercent(15)
      setAppliedCoupon(`${cleanCode} (15% OFF)`)
      showToast(`Promo code ${cleanCode} applied! 15% discount granted.`, 'success')
      setCouponCode('')
    } else {
      showToast('Invalid or expired promo code. Try TASTEDASH10!', 'error')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const orderNumber = `TD-${Date.now()}`

    const order = {
      id: orderNumber,
      customer: {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        notes: formData.get('notes')
      },
      items: cartItems,
      paymentMethod,
      subtotal,
      discountAmount,
      appliedCoupon,
      deliveryFee,
      total,
      status: 'Order Received',
      orderDate: new Date().toISOString()
    }

    addOrder(order)
    setCartItems([])
    showToast('Your TasteDash order has been placed!', 'success')

    navigate('/order-success', {
      state: { order }
    })
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="empty-cart">
          <h1>Your cart is empty</h1>
          <p>Add some delicious meals before proceeding to checkout.</p>
          <Link to="/menu" className="primary-button">
            Explore Menu
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <div className="checkout-heading">
        <span className="eyebrow">FINAL STEP</span>
        <h1>Checkout</h1>
        <p>Enter your delivery details to complete your TasteDash order.</p>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <section className="checkout-form">
          <div className="checkout-section">
            <h2>Delivery Information</h2>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="08012345678"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <textarea
                id="address"
                name="address"
                rows="3"
                placeholder="Enter your complete delivery address, apartment or office number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">
                Delivery Instructions (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="2"
                placeholder="Gate code, landmark, or special delivery instructions"
              />
            </div>
          </div>

          <div className="checkout-section">
            <h2>Payment Method</h2>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={paymentMethod === 'Cash on Delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>
                <strong>Cash on Delivery</strong>
                <small>Pay cash or POS upon food arrival.</small>
              </span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Bank Transfer"
                checked={paymentMethod === 'Bank Transfer'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>
                <strong>Bank Transfer / Online</strong>
                <small>
                  Secure bank transfer on delivery confirmation.
                </small>
              </span>
            </label>
          </div>
        </section>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="checkout-order-items">
            {cartItems.map((item) => (
              <div className="checkout-order-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div>
                  <strong>{item.name}</strong>
                  <span>Qty: {item.quantity}</span>
                </div>

                <strong>
                  ₦{(item.price * item.quantity).toLocaleString()}
                </strong>
              </div>
            ))}
          </div>

          {/* Coupon Code Section */}
          <div className="coupon-box">
            <label htmlFor="couponInput">
              <Tag size={14} style={{ display: 'inline', marginRight: 4 }} />
              Have a Promo Code?
            </label>
            <div className="coupon-input-row">
              <input
                id="couponInput"
                type="text"
                placeholder="e.g. TASTEDASH10"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                type="button"
                className="coupon-apply-btn"
                onClick={handleApplyCoupon}
              >
                Apply
              </button>
            </div>
            {appliedCoupon && (
              <div className="coupon-applied-tag">
                <CheckCircle2 size={14} /> Applied: {appliedCoupon}
              </div>
            )}
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>

          {discountAmount > 0 && (
            <div className="summary-row discount-row">
              <span>Discount</span>
              <span>-₦{discountAmount.toLocaleString()}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₦{deliveryFee.toLocaleString()}</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-total">
            <strong>Total</strong>
            <strong>₦{total.toLocaleString()}</strong>
          </div>

          <button type="submit" className="checkout-button">
            Place Order • ₦{total.toLocaleString()}
          </button>

          <Link to="/cart" className="continue-shopping">
            Return to Cart
          </Link>
        </aside>
      </form>
    </main>
  )
}

export default Checkout
