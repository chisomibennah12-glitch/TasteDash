
import { Link, useParams } from 'react-router-dom'
import { CheckCircle, Clock } from 'lucide-react'

const orderStages = [
  'Order Received',
  'Preparing Your Food',
  'Out for Delivery',
  'Delivered'
]

function OrderTracking({ orders }) {
  const { orderId } = useParams()

  const order = orders.find((item) => item.id === orderId)

  if (!order) {
    return (
      <main className="order-tracking-page">
        <div className="empty-cart">
          <h1>Order not found</h1>
          <p>We couldn't find an order with that reference number.</p>
          <Link to="/orders" className="primary-button">
            View Order History
          </Link>
        </div>
      </main>
    )
  }

  const currentStage = orderStages.indexOf(order.status)

  return (
    <main className="order-tracking-page">
      <div className="tracking-heading">
        <span className="eyebrow">ORDER PROGRESS</span>
        <h1>Track Your Order</h1>
        <p>Follow the progress of your TasteDash order in real time.</p>
      </div>

      <section className="tracking-order-summary">
        <div>
          <span>Order Number</span>
          <strong>{order.id}</strong>
        </div>

        <div>
          <span>Order Date</span>
          <strong>
            {new Date(order.orderDate).toLocaleString()}
          </strong>
        </div>

        <div>
          <span>Order Total</span>
          <strong>₦{order.total.toLocaleString()}</strong>
        </div>
      </section>

      <section className="tracking-progress">
        <h2>Delivery Status</h2>

        <div className="tracking-timeline">
          {orderStages.map((stage, index) => {
            const completed = index <= currentStage
            const current = index === currentStage

            return (
              <div
                className={`tracking-stage ${completed ? 'completed' : ''}`}
                key={stage}
              >
                <div className="tracking-stage-icon">
                  {completed ? (
                    <CheckCircle size={22} />
                  ) : (
                    <Clock size={22} />
                  )}
                </div>

                <div className="tracking-stage-text">
                  <strong>{stage}</strong>

                  <span>
                    {current
                      ? 'Current order status'
                      : completed
                        ? 'Completed'
                        : 'Waiting for update'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <p className="tracking-note">
          Your order status will change when the restaurant updates its progress.
        </p>
      </section>

      <section className="tracking-items">
        <h2>Items in Your Order</h2>

        {order.items.map((item) => (
          <div className="tracking-item" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div>
              <strong>{item.name}</strong>
              <span>Quantity: {item.quantity}</span>
            </div>

            <strong>
              ₦{(item.price * item.quantity).toLocaleString()}
            </strong>
          </div>
        ))}
      </section>

      <div className="tracking-actions">
        <Link to="/orders" className="secondary-button">
          Back to Order History
        </Link>

        <Link to="/menu" className="primary-button">
          Order More Food
        </Link>
      </div>
    </main>
  )
}

export default OrderTracking
