
import { Link } from 'react-router-dom'

function OrderHistory({ orders }) {
  if (orders.length === 0) {
    return (
      <main className="order-history-page">
        <div className="empty-cart">
          <h1>No orders yet</h1>
          <p>Your completed orders will appear here.</p>
          <Link to="/menu" className="primary-button">
            Explore Menu
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="order-history-page">
      <div className="order-history-heading">
        <span className="eyebrow">YOUR ACTIVITY</span>
        <h1>Order History</h1>
        <p>View and track your previous orders.</p>
      </div>

      <div className="order-history-list">
        {orders.map((order) => (
          <article className="history-order" key={order.id}>
            <div className="history-order-top">
              <div>
                <span>Order Number</span>
                <h3>{order.id}</h3>
              </div>

              <span className="order-status">
                {order.status}
              </span>
            </div>

            <div className="history-order-info">
              <div>
                <span>Order Date</span>
                <strong>
                  {new Date(order.orderDate).toLocaleDateString()}
                </strong>
              </div>

              <div>
                <span>Items</span>
                <strong>
                  {order.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </strong>
              </div>

              <div>
                <span>Total Amount</span>
                <strong>₦{order.total.toLocaleString()}</strong>
              </div>
            </div>

            <div className="history-order-bottom">
              <p>
                {order.items.map((item) => item.name).join(', ')}
              </p>

              <Link to={`/track/${order.id}`}>
                Track Order
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default OrderHistory
