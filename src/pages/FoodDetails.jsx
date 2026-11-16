import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Heart, Star, Clock, User } from 'lucide-react'
import { useToast } from '../context/ToastContext'

const INITIAL_REVIEWS = [
  {
    id: 1,
    author: 'Adebayo T.',
    rating: 5,
    date: '2 days ago',
    comment: 'Super flavorful and freshly prepared. Delivered hot in less than 25 minutes!'
  },
  {
    id: 2,
    author: 'Chioma O.',
    rating: 5,
    date: '1 week ago',
    comment: 'One of the best meals I have ordered on TasteDash. Seasoning was absolute perfection.'
  },
  {
    id: 3,
    author: 'Michael B.',
    rating: 4,
    date: '2 weeks ago',
    comment: 'Generous portions and great packaging. Will definitely order again.'
  }
]

function FoodDetails({ foods, onAddToCart, favorites = [], onToggleFavorite }) {
  const { id } = useParams()
  const { showToast } = useToast()
  const food = foods.find((item) => String(item.id) === id)
  const [quantity, setQuantity] = useState(1)

  // Reviews state persisted per food item
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(`tastedash-reviews-${id}`)
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS
    } catch {
      return INITIAL_REVIEWS
    }
  })

  // Review form state
  const [reviewerName, setReviewerName] = useState('')
  const [newRating, setNewRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewComment, setReviewComment] = useState('')

  if (!food) {
    return (
      <main className="food-details-page">
        <h1>Meal not found</h1>
        <p>Sorry, this meal is not available in our current catalog.</p>
        <Link to="/menu" className="primary-button">
          Back to Menu
        </Link>
      </main>
    )
  }

  const isFavorite = favorites.includes(food.id)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(food, true) // Pass flag to avoid multiple duplicate toasts if called in loop
    }
    showToast(`Added ${quantity}x ${food.name} to your cart!`, 'success')
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!reviewerName.trim() || !reviewComment.trim()) {
      showToast('Please provide your name and review message.', 'error')
      return
    }

    const newReviewItem = {
      id: Date.now(),
      author: reviewerName.trim(),
      rating: newRating,
      date: 'Just now',
      comment: reviewComment.trim()
    }

    const updated = [newReviewItem, ...reviews]
    setReviews(updated)
    try {
      localStorage.setItem(`tastedash-reviews-${food.id}`, JSON.stringify(updated))
    } catch (e) {
      console.error(e)
    }

    setReviewerName('')
    setReviewComment('')
    setNewRating(5)
    showToast('Thank you! Your review has been published.', 'success')
  }

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1)

  return (
    <main className="food-details-page">
      <Link to="/menu" className="back-to-menu">
        <ArrowLeft size={18} />
        Back to Menu
      </Link>

      <div className="food-details-layout">
        <div className="food-details-image">
          <img src={food.image} alt={food.name} />
          {food.isChefSpecial && (
            <span className="details-special-badge">⭐ Chef's Signature</span>
          )}
        </div>

        <div className="food-details-content">
          <div className="food-details-header-row">
            <span className="eyebrow">{food.category}</span>
            {onToggleFavorite && (
              <button
                type="button"
                className={`details-favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(food)}
                title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
              >
                <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                <span>{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
            )}
          </div>

          <h1>{food.name}</h1>

          <div className="food-details-rating-banner">
            <div className="stars-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  fill={star <= Math.round(averageRating) ? '#F59E0B' : 'none'}
                  color="#F59E0B"
                />
              ))}
            </div>
            <strong>{averageRating}</strong>
            <span className="rating-count">({reviews.length} customer reviews)</span>
          </div>

          <div className="food-details-tags">
            {food.prepTime && (
              <span className="detail-tag">
                <Clock size={14} /> Est. {food.prepTime}
              </span>
            )}
            {food.isSpicy && <span className="detail-tag tag-spicy">🌶️ Spicy</span>}
            {food.isVeg && <span className="detail-tag tag-veg">🥬 Vegetarian</span>}
            <span className="detail-tag">✨ Made Fresh Daily</span>
          </div>

          <p className="food-details-description">{food.description}</p>

          <strong className="food-details-price">
            ₦{food.price.toLocaleString()}
          </strong>

          <div className="details-quantity">
            <span>Quantity</span>

            <div className="quantity-control">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="food-details-total">
            <span>Total Price</span>
            <strong>₦{(food.price * quantity).toLocaleString()}</strong>
          </div>

          <button
            type="button"
            className="details-add-button"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="meal-reviews-section">
        <div className="section-heading-row">
          <div>
            <h2>Customer Reviews & Ratings</h2>
            <p>What our food lovers are saying about this dish</p>
          </div>
          <div className="rating-summary-pill">
            <Star size={18} fill="#F59E0B" color="#F59E0B" />
            <span>{averageRating} / 5.0</span>
          </div>
        </div>

        <div className="reviews-layout">
          {/* Reviews List */}
          <div className="reviews-list">
            {reviews.map((rev) => (
              <article key={rev.id} className="review-card">
                <div className="review-card-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      <User size={16} />
                    </div>
                    <div>
                      <strong>{rev.author}</strong>
                      <span className="review-date">{rev.date}</span>
                    </div>
                  </div>
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        fill={star <= rev.rating ? '#F59E0B' : 'none'}
                        color="#F59E0B"
                      />
                    ))}
                  </div>
                </div>
                <p className="review-text">{rev.comment}</p>
              </article>
            ))}
          </div>

          {/* Write a Review Form */}
          <div className="review-form-card">
            <h3>Leave a Review</h3>
            <p>Enjoyed this meal? Share your experience with the community.</p>

            <form onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label>Your Rating</label>
                <div className="star-rating-selector">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="star-btn"
                      onClick={() => setNewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`Rate ${star} star`}
                    >
                      <Star
                        size={22}
                        fill={(hoverRating || newRating) >= star ? '#F59E0B' : 'none'}
                        color="#F59E0B"
                      />
                    </button>
                  ))}
                  <span className="selected-rating-label">
                    {hoverRating || newRating} / 5 Stars
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reviewerName">Your Name</label>
                <input
                  id="reviewerName"
                  type="text"
                  placeholder="e.g. Tunde A."
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="reviewComment">Review</label>
                <textarea
                  id="reviewComment"
                  rows={3}
                  placeholder="Tell us what you liked about the flavor, portion, delivery..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-review-btn">
                Publish Review
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default FoodDetails
