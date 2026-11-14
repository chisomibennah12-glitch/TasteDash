
function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <div>
          <a href="/" className="logo">
            QuickBite<span>.</span>
          </a>
          <p>
            Delicious food, freshly prepared and delivered
            straight to your door.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/menu">Our Menu</a>
          <a href="#about">About Us</a>
        </div>

        <div>
          <h3>Contact</h3>
          <p>Email: hello@quickbite.com</p>
          <p>Phone: +234 800 000 0000</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} QuickBite. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
