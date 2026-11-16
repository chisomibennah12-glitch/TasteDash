import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <div>
          <Link to="/" className="logo">
            TasteDash<span>.</span>
          </Link>
          <p>
            Delicious food, freshly prepared by top chefs and delivered
            straight to your doorstep in record time.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/menu">Our Menu</Link>
          <Link to="/favorites">My Favorites</Link>
          <Link to="/orders">Order History</Link>
          <a href="/#about">About Us</a>
        </div>

        <div>
          <h3>Contact & Support</h3>
          <p>Email: hello@tastedash.com</p>
          <p>Phone: +234 800 827 8332</p>
          <p>Hours: 8:00 AM - 11:00 PM Daily</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} TasteDash. Made with{' '}
          <Heart size={14} style={{ display: 'inline', color: '#EF4444', verticalAlign: 'middle' }} fill="currentColor" />{' '}
          for food lovers. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
