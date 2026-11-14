
const categories = [
  'All',
  'Nigerian Meals',
  'Burgers',
  'Pizza',
  'Chicken',
  'Snacks',
  'Pasta',
  'Drinks',
  'Desserts'
]

function CategoryList({ selectedCategory, onSelectCategory }) {
  return (
    <div className="category-list">
      {categories.map((category) => (
        <button
          key={category}
          className={
            selectedCategory === category ? 'category-active' : ''
          }
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryList
