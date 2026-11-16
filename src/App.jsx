import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Menu from './pages/Menu'
import Favorites from './pages/Favorites'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import FoodDetails from './pages/FoodDetails'
import OrderHistory from './pages/OrderHistory'
import OrderTracking from './pages/OrderTracking'
import AdminDashboard from './pages/AdminDashboard'
import AdminMenu from './pages/AdminMenu'

import initialFoods from './data/foods'
import { ToastProvider, useToast } from './context/ToastContext'
import './App.css'

function WebsiteLayout({ cartCount, favoritesCount, isDark, onToggleTheme }) {
  return (
    <>
      <Navbar
        cartCount={cartCount}
        favoritesCount={favoritesCount}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />
      <Outlet />
      <Footer />
    </>
  )
}

function AppContent() {
  const { showToast } = useToast()

  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('tastedash-theme') || 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('tastedash-theme', theme)
    } catch (e) {
      console.error(e)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark'
      showToast(
        nextTheme === 'dark' ? '🌙 Dark mode enabled' : '☀️ Light mode enabled',
        'info',
        2000
      )
      return nextTheme
    })
  }

  // Cart state
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('tastedash-cart') || localStorage.getItem('quickbite-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('tastedash-favorites') || localStorage.getItem('quickbite-favorites')
      return saved ? JSON.parse(saved) : [1, 4, 15, 18]
    } catch {
      return [1, 4, 15, 18]
    }
  })

  // Orders state
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('tastedash-orders') || localStorage.getItem('quickbite-orders')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Foods state
  const [foods, setFoods] = useState(() => {
    try {
      const savedFoods = localStorage.getItem('tastedash-foods') || localStorage.getItem('quickbite-foods')
      return savedFoods ? JSON.parse(savedFoods) : initialFoods
    } catch {
      return initialFoods
    }
  })

  useEffect(() => {
    localStorage.setItem('tastedash-cart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('tastedash-favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('tastedash-orders', JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    localStorage.setItem('tastedash-foods', JSON.stringify(foods))
  }, [foods])

  const addToCart = (food, silent = false) => {
    if (food.available === false) {
      showToast('This meal is currently unavailable.', 'error')
      return
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === food.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentItems, { ...food, quantity: 1 }]
    })

    if (!silent) {
      showToast(`${food.name} added to cart!`, 'success')
    }
  }

  const toggleFavorite = (food) => {
    setFavorites((currentFavs) => {
      const isAlreadyFav = currentFavs.includes(food.id)
      if (isAlreadyFav) {
        showToast(`Removed ${food.name} from favorites.`, 'info')
        return currentFavs.filter((id) => id !== food.id)
      } else {
        showToast(`Added ${food.name} to your favorites!`, 'success')
        return [...currentFavs, food.id]
      }
    })
  }

  const clearFavorites = () => {
    setFavorites([])
    showToast('All saved favorites cleared.', 'info')
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

        <Route
          element={
            <WebsiteLayout
              cartCount={cartCount}
              favoritesCount={favorites.length}
              isDark={theme === 'dark'}
              onToggleTheme={toggleTheme}
            />
          }
        >
          <Route
            path="/"
            element={
              <Home
                foods={foods}
                onAddToCart={addToCart}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />

          <Route
            path="/menu"
            element={
              <Menu
                foods={foods}
                onAddToCart={addToCart}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                foods={foods}
                favorites={favorites}
                onAddToCart={addToCart}
                onToggleFavorite={toggleFavorite}
                onClearFavorites={clearFavorites}
              />
            }
          />

          <Route
            path="/food/:id"
            element={
              <FoodDetails
                foods={foods}
                onAddToCart={addToCart}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
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

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}

export default App
