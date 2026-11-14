
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import FoodCard from '../components/FoodCard'

function Home({ foods, onAddToCart }) {
  const featuredFoods = foods
    .filter((food) => food.available !== false)
    .slice(0, 4)

  return (
    <>
      <main className="hero">
        <div className="hero-content">
          <span className="eyebrow">FRESH FOOD, FAST DELIVERY</span>

          <h1>
            Delicious food,
            <span> delivered to you.</span>
          </h1>

          <p>
            Discover your favourite meals, order in seconds,
            and enjoy delicious food delivered straight to your door.
          </p>

          <div className="hero-actions">
            <Link to="/menu" className="primary-button">
              Explore Menu
            </Link>

            <a href="#featured" className="secondary-button">
              View Popular Meals
            </a>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900"
            alt="Fresh and delicious food"
          />
        </div>
      </main>

      <section className="categories" id="featured">
        <div className="section-heading">
          <span className="eyebrow">OUR SELECTION</span>
          <h2>Popular meals</h2>
          <p>Explore some of our customers' favourites.</p>
        </div>

        <div className="food-grid">
          {featuredFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onAddToCart={onAddToCart}
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
            View Full Menu <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="why-quickbite" id="about">
        <div className="section-heading">
          <span className="eyebrow">WHY QUICKBITE?</span>
          <h2>Good food, made convenient.</h2>
        </div>

        <div className="benefit-grid">
          <div>
            <h3>Freshly Prepared</h3>
            <p>Enjoy meals prepared with fresh ingredients.</p>
          </div>

          <div>
            <h3>Easy Ordering</h3>
            <p>Find your favourite meals and order with ease.</p>
          </div>

          <div>
            <h3>Fast Delivery</h3>
            <p>Get your meals delivered right to your doorstep.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
