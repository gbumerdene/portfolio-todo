import { useState, useEffect } from 'react'
import './GroceryList.css'

const CATEGORIES = ['🥦 Produce', '🥛 Dairy', '🥩 Meat', '🥫 Pantry', '🧁 Snacks', '🧴 Household']

const initialItems = [
  { id: 1, name: 'Apples', category: '🥦 Produce', done: false },
  { id: 2, name: 'Spinach', category: '🥦 Produce', done: false },
  { id: 3, name: 'Bananas', category: '🥦 Produce', done: true },
  { id: 4, name: 'Milk', category: '🥛 Dairy', done: false },
  { id: 5, name: 'Greek Yogurt', category: '🥛 Dairy', done: false },
  { id: 6, name: 'Cheddar Cheese', category: '🥛 Dairy', done: true },
  { id: 7, name: 'Chicken Breast', category: '🥩 Meat', done: false },
  { id: 8, name: 'Ground Beef', category: '🥩 Meat', done: false },
  { id: 9, name: 'Pasta', category: '🥫 Pantry', done: false },
  { id: 10, name: 'Olive Oil', category: '🥫 Pantry', done: false },
  { id: 11, name: 'Granola Bars', category: '🧁 Snacks', done: false },
  { id: 12, name: 'Dish Soap', category: '🧴 Household', done: false },
]

function loadItems() {
  try {
    const saved = localStorage.getItem('portfolio-grocery')
    return saved ? JSON.parse(saved) : initialItems
  } catch { return initialItems }
}

export default function GroceryList() {
  const [items, setItems] = useState(loadItems)
  const [input, setInput] = useState('')
  const [category, setCategory] = useState('🥦 Produce')
  const [filterCat, setFilterCat] = useState('All')

  useEffect(() => {
    localStorage.setItem('portfolio-grocery', JSON.stringify(items))
  }, [items])

  const addItem = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setItems(i => [...i, { id: Date.now(), name: input.trim(), category, done: false }])
    setInput('')
  }

  const toggleItem = (id) => setItems(i => i.map(x => x.id === id ? { ...x, done: !x.done } : x))
  const deleteItem = (id) => setItems(i => i.filter(x => x.id !== id))
  const clearChecked = () => setItems(i => i.filter(x => !x.done))

  const filtered = items.filter(i => filterCat === 'All' || i.category === filterCat)

  // Group filtered items by category
  const grouped = CATEGORIES.reduce((acc, cat) => {
    const catItems = filtered.filter(i => i.category === cat)
    if (catItems.length > 0) acc[cat] = catItems
    return acc
  }, {})

  const checkedCount = items.filter(i => i.done).length
  const totalCount = items.length
  const pct = totalCount ? Math.round((checkedCount / totalCount) * 100) : 0

  return (
    <div className="grocery-list">

      {/* Progress */}
      <div className="todo-progress">
        <div className="progress-info">
          <span>{checkedCount} of {totalCount} items in cart</span>
          <span className="progress-pct">{pct}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #52b788, #43e97b)' }} />
        </div>
      </div>

      {/* Add item form */}
      <form className="grocery-form" onSubmit={addItem}>
        <input
          className="todo-input"
          type="text"
          placeholder="Add grocery item..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <select className="todo-select" value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button type="submit" className="btn btn-primary todo-add-btn">+ Add</button>
      </form>

      {/* Category filter */}
      <div className="filter-group" style={{ flexWrap: 'wrap' }}>
        <button
          className={`filter-btn ${filterCat === 'All' ? 'active' : ''}`}
          onClick={() => setFilterCat('All')}
        >All</button>
        {CATEGORIES.map(c => (
          <button
            key={c}
            className={`filter-btn ${filterCat === c ? 'active' : ''}`}
            onClick={() => setFilterCat(c)}
          >{c}</button>
        ))}
      </div>

      {/* Grouped items */}
      <div className="grocery-groups">
        {Object.keys(grouped).length === 0 && (
          <div className="todo-empty"><span>🛒 Your list is empty!</span></div>
        )}
        {Object.entries(grouped).map(([cat, catItems]) => (
          <div key={cat} className="grocery-group">
            <h4 className="group-title">{cat} <span className="group-count">{catItems.length}</span></h4>
            <ul className="grocery-items">
              {catItems.map(item => (
                <li key={item.id} className={`grocery-item ${item.done ? 'done' : ''}`}>
                  <button className="check-btn" onClick={() => toggleItem(item.id)}>
                    <span className="check-circle">{item.done ? '✓' : ''}</span>
                  </button>
                  <span className="grocery-name">{item.name}</span>
                  <button className="icon-btn" onClick={() => deleteItem(item.id)}>🗑️</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="todo-footer">
        <span className="todo-count">{items.filter(i => !i.done).length} items left to get</span>
        {checkedCount > 0 && (
          <button className="clear-btn" onClick={clearChecked}>Clear checked</button>
        )}
      </div>
    </div>
  )
}
