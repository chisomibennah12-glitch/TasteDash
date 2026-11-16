import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import FoodCard from '../components/FoodCard'
import CategoryList from '../components/CategoryList'

function Menu({ foods, onAddToCart, favorites = [], onToggleFavorite }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [dietaryFilter, setDietaryFilter] = useState('all') // 'all', 'special', 'spicy', 'veg'
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('default')

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const isAvailable = food.available !== false

      const matchesCategory =
        selectedCategory === 'All' ||
        food.category === selectedCategory

      const matchesSearch =
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (food.description && food.description.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesDietary =
        dietaryFilter === 'all' ||
        (dietaryFilter === 'special' && food.isChefSpecial) ||
        (dietaryFilter === 'spicy' && food.isSpicy) ||
        (dietaryFilter === 'veg' && food.isVeg)

      return isAvailable && matchesCategory && matchesSearch && matchesDietary
    }).sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0)
      }
      if (sortBy === 'price-low') {
        return a.price - b.price
      }
      if (sortBy === 'price-high') {
        return b.price - a.price
      }
      return 0
    })
  }, [foods, selectedCategory, dietaryFilter, searchTerm, sortBy])

  return (
    <main className="menu-page">
      <div className="menu-heading">
        <span className="eyebrow">FRESH & FLAVORFUL</span>
        <h1>Our Menu</h1>
        <p>Explore chef-crafted meals made from the freshest ingredients.</p>
      </div>

      <div className="menu-controls-wrapper">
        <div className="menu-search">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search for your favourite food, ingredients, or cuisine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="menu-sort-box">
          <SlidersHorizontal size={16} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort meals"
          >
            <option value="default">Sort by: Recommended</option>
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="dietary-filter-bar">
        <span className="filter-label">Filter:</span>
        <button
          type="button"
          className={`dietary-chip ${dietaryFilter === 'all' ? 'active' : ''}`}
          onClick={() => setDietaryFilter('all')}
        >
          All
        </button>
        <button
          type="button"
          className={`dietary-chip ${dietaryFilter === 'special' ? 'active' : ''}`}
          onClick={() => setDietaryFilter('special')}
        >
          ⭐ Chef's Picks
        </button>
        <button
          type="button"
          className={`dietary-chip ${dietaryFilter === 'spicy' ? 'active' : ''}`}
          onClick={() => setDietaryFilter('spicy')}
        >
          🌶️ Spicy
        </button>
        <button
          type="button"
          className={`dietary-chip ${dietaryFilter === 'veg' ? 'active' : ''}`}
          onClick={() => setDietaryFilter('veg')}
        >
          🥬 Vegetarian
        </button>
      </div>

      <CategoryList
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="menu-results-info">
        <span>Showing {filteredFoods.length} delicious {filteredFoods.length === 1 ? 'meal' : 'meals'}</span>
        {(searchTerm || selectedCategory !== 'All' || dietaryFilter !== 'all') && (
          <button
            type="button"
            className="reset-filters-btn"
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('All')
              setDietaryFilter('all')
              setSortBy('default')
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      <div className="food-grid">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onAddToCart={onAddToCart}
              isFavorite={favorites.includes(food.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <div className="no-results-box">
            <p className="no-results">
              No matching meals found. Try resetting your search or filters.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Menu
