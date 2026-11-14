
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import FoodDetails from './pages/FoodDetails'
import OrderHistory from './pages/OrderHistory'
import OrderTracking from './pages/OrderTracking'
import AdminDashboard from './pages/AdminDashboard'
import AdminMenu from './pages/AdminMenu'

import initialFoods from './data/foods'
import './App.css'

function WebsiteLayout({ cartCount }) {
  return (
    <>
      <Navbar cartCount={cartCount} />
      <Outlet />
      <Footer />
    </>
  )
}

function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('quickbite-cart')) || []
    } catch {
      return []
    }
  })

  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('quickbite-orders')) || []
    } catch {
      return []
    }
  })

  const [foods, setFoods] = useState(() => {
    try {
      const savedFoods = localStorage.getItem('quickbite-foods')
      return savedFoods ? JSON.parse(savedFoods) : initialFoods
    } catch {
      return initialFoods
    }
  })

  useEffect(() => {
    localStorage.setItem('quickbite-cart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('quickbite-orders', JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    localStorage.setItem('quickbite-foods', JSON.stringify(foods))
  }, [foods])

  const addToCart = (food) => {
    if (food.available === false) {
      alert('This meal is currently unavailable.')
      return
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === food.id
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentItems, { ...food, quantity: 1 }]
    })

    alert(`${food.name} added to cart!`)
  }

  const addOrder = (order) => {
    setOrders((currentOrders) => [order, ...currentOrders])
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminDashboard
              orders={orders}
              setOrders={setOrders}
            />
          }
        />

        <Route
          path="/admin/menu"
          element={
            <AdminMenu
              foods={foods}
              setFoods={setFoods}
            />
          }
        />

        <Route element={<WebsiteLayout cartCount={cartCount} />}>
          <Route
            path="/"
            element={
              <Home
                foods={foods}
                onAddToCart={addToCart}
              />
            }
          />

          <Route
            path="/menu"
            element={
              <Menu
                foods={foods}
                onAddToCart={addToCart}
              />
            }
          />

          <Route
            path="/food/:id"
            element={
              <FoodDetails
                foods={foods}
                onAddToCart={addToCart}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
                setCartItems={setCartItems}
                addOrder={addOrder}
              />
            }
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          <Route
            path="/orders"
            element={<OrderHistory orders={orders} />}
          />

          <Route
            path="/track/:orderId"
            element={<OrderTracking orders={orders} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
