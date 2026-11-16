
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Utensils,
  Plus,
  Pencil,
  Trash2,
  X
} from 'lucide-react'

const categories = [
  'Nigerian Meals',
  'Burgers',
  'Pizza',
  'Chicken',
  'Snacks',
  'Pasta',
  'Drinks',
  'Desserts'
]

const emptyForm = {
  name: '',
  category: 'Nigerian Meals',
  description: '',
  price: '',
  image: ''
}

function AdminMenu({ foods, setFoods }) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState(emptyForm)

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openAddForm = () => {
    setEditingId(null)
    setFormData(emptyForm)
    setShowForm(true)
  }

  const openEditForm = (food) => {
    setEditingId(food.id)

    setFormData({
      name: food.name,
      category: food.category,
      description: food.description,
      price: String(food.price),
      image: food.image
    })

    setShowForm(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData((current) => ({
      ...current,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const foodData = {
      name: formData.name.trim(),
      category: formData.category,
      description: formData.description.trim(),
      price: Number(formData.price),
      image: formData.image.trim(),
      available: true
    }

    if (editingId !== null) {
      setFoods((currentFoods) =>
        currentFoods.map((food) =>
          food.id === editingId
            ? { ...food, ...foodData }
            : food
        )
      )
    } else {
      const nextId = foods.length > 0
        ? Math.max(...foods.map((food) => Number(food.id))) + 1
        : 1

      setFoods((currentFoods) => [
        ...currentFoods,
        {
          id: nextId,
          ...foodData
        }
      ])
    }

    setShowForm(false)
    setEditingId(null)
    setFormData(emptyForm)
  }

  const toggleAvailability = (id) => {
    setFoods((currentFoods) =>
      currentFoods.map((food) =>
        food.id === id
          ? { ...food, available: food.available === false }
          : food
      )
    )
  }

  const deleteFood = (id) => {
    const food = foods.find((item) => item.id === id)

    if (!food) return

    const confirmed = window.confirm(
      `Are you sure you want to delete ${food.name}?`
    )

    if (!confirmed) return

    setFoods((currentFoods) =>
      currentFoods.filter((item) => item.id !== id)
    )
  }

  const availableCount = foods.filter(
    (food) => food.available !== false
  ).length

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          TasteDash<span>.</span>
          <small>ADMINISTRATION</small>
        </div>

        <nav className="admin-sidebar-nav">
          <Link to="/admin" className="admin-nav-link">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <a href="#menu-management" className="admin-nav-link active">
            <Utensils size={18} />
            Food Menu
          </a>
        </nav>

        <div className="admin-sidebar-bottom">
          <span>TasteDash Management</span>
          <Link to="/">Return to Website</Link>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <span>ADMINISTRATION</span>
            <h1>Food Menu</h1>
          </div>

          <Link to="/admin" className="admin-back-link">
            Back to Dashboard
          </Link>
        </header>

        <section className="admin-menu-overview" id="menu-management">
          <div className="admin-menu-heading">
            <div>
              <h2>Menu Management</h2>
              <p>Add, edit and manage the meals available to customers.</p>
            </div>

            <button
              className="admin-add-food-button"
              onClick={openAddForm}
            >
              <Plus size={18} />
              Add New Meal
            </button>
          </div>

          <div className="admin-menu-stats">
            <div>
              <span>Total Meals</span>
              <strong>{foods.length}</strong>
            </div>

            <div>
              <span>Available Meals</span>
              <strong>{availableCount}</strong>
            </div>

            <div>
              <span>Unavailable Meals</span>
              <strong>{foods.length - availableCount}</strong>
            </div>
          </div>

          <div className="admin-menu-search">
            <input
              type="text"
              placeholder="Search meals by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredFoods.length === 0 ? (
            <div className="admin-empty-state">
              <Utensils size={35} />
              <h3>No meals found</h3>
              <p>Try another search term.</p>
            </div>
          ) : (
            <div className="admin-food-table-wrapper">
              <table className="admin-food-table">
                <thead>
                  <tr>
                    <th>Meal</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Availability</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredFoods.map((food) => (
                    <tr key={food.id}>
                      <td>
                        <div className="admin-food-name">
                          <img src={food.image} alt={food.name} />
                          <strong>{food.name}</strong>
                        </div>
                      </td>

                      <td>{food.category}</td>

                      <td>
                        <strong>₦{Number(food.price).toLocaleString()}</strong>
                      </td>

                      <td>
                        <button
                          className={
                            food.available === false
                              ? 'availability-button unavailable'
                              : 'availability-button available'
                          }
                          onClick={() => toggleAvailability(food.id)}
                        >
                          {food.available === false
                            ? 'Unavailable'
                            : 'Available'}
                        </button>
                      </td>

                      <td>
                        <div className="admin-food-actions">
                          <button
                            onClick={() => openEditForm(food)}
                            aria-label={`Edit ${food.name}`}
                            title="Edit meal"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            className="delete-food-button"
                            onClick={() => deleteFood(food.id)}
                            aria-label={`Delete ${food.name}`}
                            title="Delete meal"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>

      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-food-modal">
            <div className="admin-modal-heading">
              <div>
                <span>MENU MANAGEMENT</span>
                <h2>{editingId !== null ? 'Edit Meal' : 'Add New Meal'}</h2>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label htmlFor="food-name">Meal Name</label>
                <input
                  id="food-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Jollof Rice"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="food-category">Category</label>
                <select
                  id="food-category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin-form-group">
                <label htmlFor="food-description">Description</label>
                <textarea
                  id="food-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Describe the meal..."
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="food-price">Price (₦)</label>
                <input
                  id="food-price"
                  name="price"
                  type="number"
                  min="1"
                  step="1"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g. 4500"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="food-image">Image URL</label>
                <input
                  id="food-image"
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/food.jpg"
                  required
                />
                <small>Paste a direct link to the meal image.</small>
              </div>

              {formData.image && (
                <div className="admin-image-preview">
                  <img
                    src={formData.image}
                    alt="Meal preview"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                    onLoad={(e) => {
                      e.currentTarget.style.display = 'block'
                    }}
                  />
                </div>
              )}

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="admin-cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-save-button"
                >
                  {editingId !== null ? 'Save Changes' : 'Add Meal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

export default AdminMenu
