
import { useState } from 'react'
import { Search } from 'lucide-react'
import FoodCard from '../components/FoodCard'
import CategoryList from '../components/CategoryList'

function Menu({ foods, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFoods = foods.filter((food) => {
    const isAvailable = food.available !== false

    const matchesCategory =
      selectedCategory === 'All' ||
      food.category === selectedCategory

    const matchesSearch =
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase())

    return isAvailable && matchesCategory && matchesSearch
  })

  return (
    <main className="menu-page">
      <div className="menu-heading">
        <span className="eyebrow">DISCOVER OUR FOOD</span>
        <h1>Our Menu</h1>
        <p>Find something delicious to enjoy today.</p>
      </div>

      <div className="menu-search">
        <Search size={20} />

        <input
          type="text"
          placeholder="Search for your favourite food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <CategoryList
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="food-grid">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onAddToCart={onAddToCart}
            />
          ))
        ) : (
          <p className="no-results">
            No available meals found. Try another search.
          </p>
        )}
      </div>
    </main>
  )
}

export default Menu
