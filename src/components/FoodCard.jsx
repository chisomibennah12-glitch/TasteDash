
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

function FoodCard({ food, onAddToCart }) {
  return (
    <article className="food-card">
      <Link
        to={`/food/${food.id}`}
        className="food-card-image-link"
      >
        <img src={food.image} alt={food.name} />
      </Link>

      <div className="food-card-content">
        <span className="food-category">{food.category}</span>

        <Link
          to={`/food/${food.id}`}
          className="food-card-title"
        >
          <h3>{food.name}</h3>
        </Link>

        <p>{food.description}</p>

        <div className="food-card-bottom">
          <strong>₦{food.price.toLocaleString()}</strong>

          <button
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
