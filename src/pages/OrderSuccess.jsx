
import { Link, useLocation, Navigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

function OrderSuccess() {
  const location = useLocation()
  const order = location.state?.order

  if (!order) {
    return <Navigate to="/menu" replace />
  }

  return (
    <main className="success-page">
      <div className="success-content">
        <CheckCircle size={60} />

        <span className="eyebrow">ORDER RECEIVED</span>

        <h1>Thank you for your order!</h1>

        <p>
          Your order has been recorded successfully.
          We appreciate you choosing QuickBite.
        </p>

        <div className="success-reference">
          <span>Your Order Number</span>
          <strong>{order.id}</strong>
        </div>

        <div className="success-order-details">
          <div>
            <span>Customer</span>
            <strong>{order.customer.name}</strong>
          </div>

          <div>
            <span>Phone</span>
            <strong>{order.customer.phone}</strong>
          </div>

          <div>
            <span>Delivery Address</span>
            <strong>{order.customer.address}</strong>
          </div>

          <div>
            <span>Payment Method</span>
            <strong>{order.paymentMethod}</strong>
          </div>

          <div>
            <span>Order Status</span>
            <strong>{order.status}</strong>
          </div>

          <div>
            <span>Order Total</span>
            <strong>₦{order.total.toLocaleString()}</strong>
          </div>
        </div>

        <div className="success-items">
          <h2>Items Ordered</h2>

          {order.items.map((item) => (
            <div key={item.id}>
              <span>{item.name} × {item.quantity}</span>
              <strong>
                ₦{(item.price * item.quantity).toLocaleString()}
              </strong>
            </div>
          ))}
        </div>

        <div className="success-actions">
          <Link
            to={`/track/${order.id}`}
            className="primary-button"
          >
            Track My Order
          </Link>

          <Link
            to="/orders"
            className="secondary-button"
          >
            View Order History
          </Link>
        </div>
      </div>
    </main>
  )
}

export default OrderSuccess
