
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ShoppingCart } from 'lucide-react'

function FoodDetails({ foods, onAddToCart }) {
  const { id } = useParams()
  const food = foods.find((item) => String(item.id) === id)
  const [quantity, setQuantity] = useState(1)

  if (!food) {
    return (
      <main className="food-details-page">
        <h1>Meal not found</h1>
        <p>Sorry, this meal is not available.</p>
        <Link to="/menu" className="primary-button">
          Back to Menu
        </Link>
      </main>
    )
  }

  if (food.available === false) {
    return (
      <main className="food-details-page">
        <Link to="/menu" className="back-to-menu">
          <ArrowLeft size={18} />
          Back to Menu
        </Link>

        <div className="unavailable-food-message">
          <h1>{food.name}</h1>
          <p>This meal is currently unavailable.</p>
          <Link to="/menu" className="primary-button">
            Explore Other Meals
          </Link>
        </div>
      </main>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(food)
    }
  }

  return (
    <main className="food-details-page">
      <Link to="/menu" className="back-to-menu">
        <ArrowLeft size={18} />
        Back to Menu
      </Link>

      <div className="food-details-layout">
        <div className="food-details-image">
          <img src={food.image} alt={food.name} />
        </div>

        <div className="food-details-content">
          <span className="eyebrow">{food.category}</span>

          <h1>{food.name}</h1>

          <p className="food-details-description">
            {food.description}
          </p>

          <strong className="food-details-price">
            ₦{food.price.toLocaleString()}
          </strong>

          <div className="details-quantity">
            <span>Quantity</span>

            <div className="quantity-control">
              <button
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                aria-label="Decrease quantity"
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                onClick={() => setQuantity((current) => current + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="food-details-total">
            <span>Total Price</span>
            <strong>
              ₦{(food.price * quantity).toLocaleString()}
            </strong>
          </div>

          <button
            className="details-add-button"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  )
}

export default FoodDetails
