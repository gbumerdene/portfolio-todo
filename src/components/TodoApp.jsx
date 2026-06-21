import { useState, useEffect } from 'react'
import BabyTracker from './BabyTracker'
import MealPlanner from './MealPlanner'
import GroceryList from './GroceryList'
import TravelTracker from './TravelTracker'
import './TodoApp.css'

const PRIORITIES = { high: '🔴', medium: '🟡', low: '🟢' }
const CATEGORIES = ['All', 'Baby Care', 'Household', 'Self Care', 'Learning', 'Family']
const FILTERS = ['All', 'Active', 'Completed']

const initialTodos = [
  { id: 1, text: 'Schedule 6-month pediatrician visit', priority: 'high', category: 'Baby Care', done: false, createdAt: Date.now() - 86400000 },
  { id: 2, text: 'Meal prep for the week', priority: 'medium', category: 'Household', done: true, createdAt: Date.now() - 3600000 },
  { id: 3, text: 'Practice React hooks for 30 min during nap time', priority: 'medium', category: 'Learning', done: false, createdAt: Date.now() - 7200000 },
  { id: 4, text: 'Story time before bed', priority: 'low', category: 'Family', done: false, createdAt: Date.now() },
  { id: 5, text: '10-minute walk outside for fresh air', priority: 'low', category: 'Self Care', done: true, createdAt: Date.now() - 1800000 },
]

function loadTodos() {
  try {
    const saved = localStorage.getItem('portfolio-todos')
    return saved ? JSON.parse(saved) : initialTodos
  } catch { return initialTodos }
}

export default function TodoApp() {
  const [activeTab, setActiveTab] = useState('tasks')
  const [todos, setTodos] = useState(loadTodos)
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('Baby Care')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterCat, setFilterCat] = useState('All')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    localStorage.setItem('portfolio-todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setTodos(t => [...t, {
      id: Date.now(),
      text: input.trim(),
      priority,
      category,
      done: false,
      createdAt: Date.now(),
    }])
    setInput('')
  }

  const toggleTodo = (id) => setTodos(t => t.map(x => x.id === id ? { ...x, done: !x.done } : x))
  const deleteTodo = (id) => setTodos(t => t.filter(x => x.id !== id))
  const clearDone = () => setTodos(t => t.filter(x => !x.done))

  const startEdit = (todo) => { setEditId(todo.id); setEditText(todo.text) }
  const saveEdit = (id) => {
    if (editText.trim()) setTodos(t => t.map(x => x.id === id ? { ...x, text: editText.trim() } : x))
    setEditId(null)
  }

  const filtered = todos
    .filter(t => filterCat === 'All' || t.category === filterCat)
    .filter(t => filterStatus === 'All' ? true : filterStatus === 'Active' ? !t.done : t.done)
    .sort((a, b) => {
      const pOrder = { high: 0, medium: 1, low: 2 }
      return pOrder[a.priority] - pOrder[b.priority]
    })

  const done = todos.filter(t => t.done).length
  const pct = todos.length ? Math.round((done / todos.length) * 100) : 0

  return (
    <div className="container">
      <div className="todo-label">⭐ Live Demo</div>
      <h2 className="section-title">Family Task Manager</h2>
      <p className="section-sub">
        Built for mom life — manage daily tasks &amp; track your baby's milestones in one place 💛
      </p>

      <div className="todo-shell">
        {/* Tab switcher */}
        <div className="app-tabs">
          <button className={`app-tab ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>
            📋 Tasks
          </button>
          
          <button className={`app-tab ${activeTab === 'meals' ? 'active' : ''}`} onClick={() => setActiveTab('meals')}>
            🍽️ Meals
          </button>
          <button className={`app-tab ${activeTab === 'grocery' ? 'active' : ''}`} onClick={() => setActiveTab('grocery')}>
            🛒 Grocery
          </button>
          <button className={`app-tab ${activeTab === 'travel' ? 'active' : ''}`} onClick={() => setActiveTab('travel')}>
            🌍 Travel
          </button>
          <button className={`app-tab ${activeTab === 'baby' ? 'active' : ''}`} onClick={() => setActiveTab('baby')}>
            👶 Baby
          </button>
        </div>

        {/* TASKS TAB */}
        {activeTab === 'tasks' && (
          <>
            {/* Progress bar */}
            <div className="todo-progress">
              <div className="progress-info">
                <span>{done} of {todos.length} tasks completed</span>
                <span className="progress-pct">{pct}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>

            {/* Add form */}
            <form className="todo-form" onSubmit={addTodo}>
              <input
                className="todo-input"
                type="text"
                placeholder="Add a task..."
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <select className="todo-select" value={priority} onChange={e => setPriority(e.target.value)}>
                {Object.keys(PRIORITIES).map(p => (
                  <option key={p} value={p}>{PRIORITIES[p]} {p.charAt(0).toUpperCase() + p.slice(1)}</option>
                ))}
              </select>
              <select className="todo-select" value={category} onChange={e => setCategory(e.target.value)}>
                {CATEGORIES.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button type="submit" className="btn btn-primary todo-add-btn">+ Add</button>
            </form>

            {/* Filters */}
            <div className="todo-filters">
              <div className="filter-group">
                {FILTERS.map(f => (
                  <button
                    key={f}
                    className={`filter-btn ${filterStatus === f ? 'active' : ''}`}
                    onClick={() => setFilterStatus(f)}
                  >{f}</button>
                ))}
              </div>
              <div className="filter-group">
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    className={`filter-btn ${filterCat === c ? 'active' : ''}`}
                    onClick={() => setFilterCat(c)}
                  >{c}</button>
                ))}
              </div>
            </div>

            {/* Todo list */}
            <ul className="todo-list">
              {filtered.length === 0 && (
                <li className="todo-empty"><span>🎉 All clear, mama!</span></li>
              )}
              {filtered.map(todo => (
                <li key={todo.id} className={`todo-item ${todo.done ? 'done' : ''} priority-${todo.priority}`}>
                  <button className="check-btn" onClick={() => toggleTodo(todo.id)} aria-label="toggle">
                    <span className="check-circle">{todo.done ? '✓' : ''}</span>
                  </button>
                  {editId === todo.id ? (
                    <input
                      className="edit-input"
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      onBlur={() => saveEdit(todo.id)}
                      onKeyDown={e => { if (e.key === 'Enter') saveEdit(todo.id); if (e.key === 'Escape') setEditId(null) }}
                      autoFocus
                    />
                  ) : (
                    <span className="todo-text" onDoubleClick={() => startEdit(todo)}>{todo.text}</span>
                  )}
                  <div className="todo-meta">
                    <span className="todo-priority">{PRIORITIES[todo.priority]}</span>
                    <span className="todo-cat">{todo.category}</span>
                  </div>
                  <div className="todo-actions">
                    <button className="icon-btn" onClick={() => startEdit(todo)} title="Edit">✏️</button>
                    <button className="icon-btn" onClick={() => deleteTodo(todo.id)} title="Delete">🗑️</button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="todo-footer">
              <span className="todo-count">{todos.filter(t => !t.done).length} tasks remaining</span>
              {done > 0 && <button className="clear-btn" onClick={clearDone}>Clear completed</button>}
            </div>
          </>
        )}

        {/* BABY TRACKER TAB */}
        {activeTab === 'baby' && <BabyTracker />}

        {/* MEAL PLANNER TAB */}
        {activeTab === 'meals' && <MealPlanner />}

        {/* GROCERY LIST TAB */}
        {activeTab === 'grocery' && <GroceryList />}

        {/* TRAVEL TRACKER TAB */}
        {activeTab === 'travel' && <TravelTracker />}
      </div>
    </div>
  )
}
