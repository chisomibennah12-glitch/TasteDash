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
          <Heart
            size={16}
            fill={favoritesCount > 0 ? '#EF4444' : 'none'}
            color={favoritesCount > 0 ? '#EF4444' : 'currentColor'}
          />
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

        <div className="mobile-drawer-footer">
          <button
            type="button"
            className="drawer-theme-btn"
            onClick={onToggleTheme}
          >
            {isDark ? <Sun size={17} className="theme-icon sun" /> : <Moon size={17} className="theme-icon moon" />}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </nav>

      <div className="navbar-actions">
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={18} className="theme-icon sun" /> : <Moon size={18} className="theme-icon moon" />}
        </button>

        <Link
          to="/favorites"
          className="mobile-favorites-btn"
          title="View saved favorites"
          aria-label={`Favorites, ${favoritesCount} items`}
        >
          <Heart
            size={18}
            fill={favoritesCount > 0 ? '#EF4444' : 'none'}
            color={favoritesCount > 0 ? '#EF4444' : 'currentColor'}
          />
          {favoritesCount > 0 && <span className="nav-badge">{favoritesCount}</span>}
        </Link>

        <Link
          to="/cart"
          className="cart-button"
          aria-label={`View Cart, ${cartCount} items`}
        >
          <ShoppingCart size={17} />
          <span className="cart-text">Cart ({cartCount})</span>
          <span className="cart-text-mobile">({cartCount})</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )
}

export default Navbar
