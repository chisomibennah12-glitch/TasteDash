import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Heart, Menu, X, Sun, Moon } from 'lucide-react'
import { useState } from 'react'

function Navbar({ cartCount = 0, favoritesCount = 0, isDark = false, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        TasteDash<span>.</span>
      </Link>

      <nav className={menuOpen ? 'nav-links active' : 'nav-links'}>
        <Link
          to="/"
          className={location.pathname === '/' ? 'active-link' : ''}
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          to="/menu"
          className={location.pathname === '/menu' ? 'active-link' : ''}
          onClick={closeMenu}
        >
          Menu
        </Link>
        <Link
          to="/favorites"
          className={`nav-favorites-link ${location.pathname === '/favorites' ? 'active-link' : ''}`}
          onClick={closeMenu}
        >
          <Heart size={16} fill={favoritesCount > 0 ? 'currentColor' : 'none'} />
          Favorites
          {favoritesCount > 0 && <span className="nav-badge">{favoritesCount}</span>}
        </Link>
        <Link
          to="/orders"
          className={location.pathname === '/orders' ? 'active-link' : ''}
          onClick={closeMenu}
        >
          My Orders
        </Link>
        <Link
          to="/admin"
          className={location.pathname.startsWith('/admin') ? 'active-link' : ''}
          onClick={closeMenu}
        >
          Admin
        </Link>
        <a href="/#about" onClick={closeMenu}>About</a>
        <a href="/#contact" onClick={closeMenu}>Contact</a>
      </nav>

      <div className="navbar-actions">
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={19} className="theme-icon sun" /> : <Moon size={19} className="theme-icon moon" />}
        </button>

        <Link to="/favorites" className="mobile-favorites-btn" title="View favorites">
          <Heart size={19} fill={favoritesCount > 0 ? 'currentColor' : 'none'} />
          {favoritesCount > 0 && <span className="nav-badge">{favoritesCount}</span>}
        </Link>

        <Link to="/cart" className="cart-button">
          <ShoppingCart size={18} />
          <span>Cart ({cartCount})</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}

export default Navbar
