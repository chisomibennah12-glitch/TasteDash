import { Link } from 'react-router-dom'
import { Heart, ArrowRight, Trash2 } from 'lucide-react'
import FoodCard from '../components/FoodCard'

function Favorites({ foods, favorites, onAddToCart, onToggleFavorite, onClearFavorites }) {
  const favoriteFoods = foods.filter((food) => favorites.includes(food.id))

  return (
    <main className="favorites-page">
      <div className="favorites-header">
        <div>
          <span className="eyebrow">SAVED MEALS</span>
          <h1>My Favorites</h1>
          <p>
            {favoriteFoods.length === 0
              ? 'Your wishlist is empty.'
              : `You have saved ${favoriteFoods.length} meal${favoriteFoods.length === 1 ? '' : 's'}.`}
          </p>
        </div>

        {favoriteFoods.length > 0 && onClearFavorites && (
          <button
            type="button"
            className="clear-favorites-btn"
            onClick={onClearFavorites}
          >
            <Trash2 size={16} />
            Clear All
          </button>
        )}
      </div>

      {favoriteFoods.length > 0 ? (
        <div className="food-grid">
          {favoriteFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onAddToCart={onAddToCart}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="favorites-empty">
          <div className="favorites-empty-icon">
            <Heart size={48} />
          </div>
          <h2>No favorite meals saved yet</h2>
          <p>
            Browse our delicious menu and tap the heart icon on any meal to keep track of your favorites!
          </p>
          <Link to="/menu" className="primary-button">
            Explore Menu <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </main>
  )
}

export default Favorites
