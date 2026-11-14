
import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useState } from 'react'

function Navbar({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        QuickBite<span>.</span>
      </Link>

      <nav className={menuOpen ? 'nav-links active' : 'nav-links'}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/menu" onClick={closeMenu}>Menu</Link>
        <Link to="/orders" onClick={closeMenu}>My Orders</Link>
        <Link to="/admin" onClick={closeMenu}>Admin</Link>
        <a href="/#about" onClick={closeMenu}>About</a>
        <a href="/#contact" onClick={closeMenu}>Contact</a>
      </nav>

      <Link to="/cart" className="cart-button">
        <ShoppingCart size={18} />
        <span>Cart ({cartCount})</span>
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  )
}

export default Navbar
