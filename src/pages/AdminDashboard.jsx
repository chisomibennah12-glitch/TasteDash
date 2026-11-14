
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  ShoppingBag,
  Clock,
  TrendingUp,
  Search,
  Utensils
} from 'lucide-react'

function AdminDashboard({ orders, setOrders }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')

  const statuses = [
    'Order Received',
    'Preparing Your Food',
    'Out for Delivery',
    'Delivered',
    'Cancelled'
  ]

  const activeOrders = orders.filter(
    (order) =>
      order.status !== 'Delivered' &&
      order.status !== 'Cancelled'
  )

  const deliveredOrders = orders.filter(
    (order) => order.status === 'Delivered'
  )

  const totalRevenue = deliveredOrders.reduce(
    (total, order) => total + Number(order.total || 0),
    0
  )

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.phone?.includes(searchTerm)

    const matchesStatus =
      selectedStatus === 'All' || order.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderNumber, newStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.orderNumber === orderNumber
          ? { ...order, status: newStatus }
          : order
      )
    )
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link to="/admin" className="admin-logo">
          QuickBite<span>.</span>
          <small>ADMIN PANEL</small>
        </Link>

        <nav className="admin-sidebar-nav">
          <Link to="/admin" className="admin-nav-link active">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <a href="#orders" className="admin-nav-link">
            <ShoppingBag size={18} />
            Orders
          </a>

          <Link to="/admin/menu" className="admin-nav-link">
            <Utensils size={18} />
            Food Menu
          </Link>
        </nav>

        <Link to="/" className="admin-back-link">
          Back to Website
        </Link>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Dashboard</h1>
            <p>Manage your restaurant and customer orders.</p>
          </div>

          <span className="admin-header-label">Administrator</span>
        </header>

        <section className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <ShoppingBag size={20} />
            </div>
            <p>Total Orders</p>
            <h2>{orders.length}</h2>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Clock size={20} />
            </div>
            <p>Active Orders</p>
            <h2>{activeOrders.length}</h2>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <TrendingUp size={20} />
            </div>
            <p>Delivered Orders</p>
            <h2>{deliveredOrders.length}</h2>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <TrendingUp size={20} />
            </div>
            <p>Revenue</p>
            <h2>₦{totalRevenue.toLocaleString()}</h2>
          </div>
        </section>

        <section className="admin-orders-section" id="orders">
          <div className="admin-section-heading">
            <div>
              <h2>Order Management</h2>
              <p>View and manage customer orders.</p>
            </div>
          </div>

          <div className="admin-order-filters">
            <div className="admin-search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search order, customer or phone..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
            >
              <option value="All">All Orders</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.orderNumber}>
                      <td>
                        <strong>{order.orderNumber}</strong>
                      </td>

                      <td>
                        <div className="admin-customer-info">
                          <strong>{order.customer?.name || 'N/A'}</strong>
                          <span>{order.customer?.phone || 'N/A'}</span>
                        </div>
                      </td>

                      <td>{order.items?.length || 0} items</td>

                      <td>
                        <strong>
                          ₦{Number(order.total || 0).toLocaleString()}
                        </strong>
                      </td>

                      <td>
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString()
                          : 'N/A'}
                      </td>

                      <td>
                        <span
                          className={`admin-status status-${order.status
                            ?.toLowerCase()
                            .replaceAll(' ', '-')}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td>
                        <select
                          className="admin-status-select"
                          value={order.status}
                          onChange={(event) =>
                            updateOrderStatus(
                              order.orderNumber,
                              event.target.value
                            )
                          }
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="admin-empty-state">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminDashboard
