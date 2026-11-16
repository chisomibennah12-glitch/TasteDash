import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, Star, Clock } from 'lucide-react'

function FoodCard({ food, onAddToCart, isFavorite = false, onToggleFavorite }) {
  return (
    <article className="food-card">
      <div className="food-card-image-wrap">
        <Link to={`/food/${food.id}`} className="food-card-image-link">
          <img src={food.image} alt={food.name} loading="lazy" />
        </Link>

        {onToggleFavorite && (
          <button
            type="button"
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onToggleFavorite(food)
            }}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-label={isFavorite ? `Remove ${food.name} from favorites` : `Add ${food.name} to favorites`}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        )}

        {food.isChefSpecial && (
          <span className="badge badge-special">⭐ Chef's Pick</span>
        )}
      </div>

      <div className="food-card-content">
        <div className="food-card-meta">
          <span className="food-category">{food.category}</span>
          <div className="food-rating">
            <Star size={14} className="star-icon" fill="currentColor" />
            <span>{food.rating || 4.8}</span>
            <span className="review-count">({food.reviewsCount || 30})</span>
          </div>
        </div>

        <Link to={`/food/${food.id}`} className="food-card-title">
          <h3>{food.name}</h3>
        </Link>

        <p>{food.description}</p>

        <div className="food-card-tags">
          {food.isSpicy && <span className="tag tag-spicy">🌶️ Spicy</span>}
          {food.isVeg && <span className="tag tag-veg">🥬 Vegetarian</span>}
          {food.prepTime && (
            <span className="tag tag-time">
              <Clock size={12} /> {food.prepTime}
            </span>
          )}
        </div>

        <div className="food-card-bottom">
          <strong>₦{food.price.toLocaleString()}</strong>

          <button
            type="button"
            onClick={() => onAddToCart(food)}
            aria-label={`Add ${food.name} to cart`}
          >
            <ShoppingCart size={17} />
            Add
          </button>
        </div>
      </div>
    </article>
  )
}

export default FoodCard
