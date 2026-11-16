import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Zap, ShieldCheck, Utensils, Heart } from 'lucide-react'
import FoodCard from '../components/FoodCard'

function Home({ foods, onAddToCart, favorites = [], onToggleFavorite }) {
  const featuredFoods = foods
    .filter((food) => food.available !== false)
    .slice(0, 4)

  return (
    <>
      <main className="hero">
        <div className="hero-content">
          <span className="eyebrow">
            <Sparkles size={14} style={{ display: 'inline', marginRight: 6 }} />
            FRESH GOURMET, LIGHTNING DELIVERY
          </span>

          <h1>
            Delicious food,
            <span> delivered at dash speed.</span>
          </h1>

          <p>
            Experience authentic Nigerian favorites, artisan pizzas, sizzling burgers,
            and refreshing drinks freshly prepared by top culinary masters.
          </p>

          <div className="hero-actions">
            <Link to="/menu" className="primary-button">
              Explore Full Menu <ArrowRight size={18} />
            </Link>

            <Link to="/favorites" className="secondary-button">
              <Heart size={16} /> Saved Favorites
            </Link>
          </div>

          <div className="hero-stats-row">
            <div>
              <strong>30+</strong>
              <span>Curated Meals</span>
            </div>
            <div className="stats-divider" />
            <div>
              <strong>25 Min</strong>
              <span>Average Delivery</span>
            </div>
            <div className="stats-divider" />
            <div>
              <strong>4.9 ★</strong>
              <span>Customer Rating</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900"
            alt="Delicious gourmet dishes served hot"
          />
        </div>
      </main>

      <section className="categories" id="featured">
        <div className="section-heading">
          <span className="eyebrow">CHEF'S PICKS</span>
          <h2>Popular Customer Favorites</h2>
          <p>Discover our top-rated meals loved by thousands of food enthusiasts.</p>
        </div>

        <div className="food-grid">
          {featuredFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onAddToCart={onAddToCart}
              isFavorite={favorites.includes(food.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>

        {featuredFoods.length === 0 && (
          <p className="no-results">
            No meals are currently available.
          </p>
        )}

        <div className="view-menu">
          <Link to="/menu">
            Explore All Dishes <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Special Promo Highlight Banner */}
      <section className="promo-highlight-banner">
        <div className="promo-banner-content">
          <span className="promo-tag">LIMITED SPECIAL</span>
          <h2>Get 10% Off Your First TasteDash Order!</h2>
          <p>Treat your tastebuds today. Fast, hot, and hygienic delivery straight to your door.</p>
          <div className="promo-coupon-badge">
            Use Code: <strong>TASTEDASH10</strong>
          </div>
        </div>
        <Link to="/menu" className="promo-cta-btn">
          Order Now
        </Link>
      </section>

      <section className="why-tastedash" id="about">
        <div className="section-heading">
          <span className="eyebrow">THE TASTEDASH PROMISE</span>
          <h2>Good food, made extraordinary.</h2>
          <p>We combine culinary mastery with reliable, rapid delivery.</p>
        </div>

        <div className="benefit-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              <Utensils size={24} />
            </div>
            <h3>Freshly Prepared</h3>
            <p>Every single order is cooked fresh upon receipt using only top-tier ingredients.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <Zap size={24} />
            </div>
            <h3>Dash Fast Delivery</h3>
            <p>Our dedicated delivery fleet ensures your food arrives hot, crisp, and ready to savor.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <ShieldCheck size={24} />
            </div>
            <h3>Hygiene & Quality</h3>
            <p>Tamper-proof sealed packaging maintaining restaurant quality standards throughout transit.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
