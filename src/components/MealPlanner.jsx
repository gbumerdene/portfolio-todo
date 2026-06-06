import { useState, useEffect } from 'react'
import './MealPlanner.css'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// Pre-filled meals for each day
const defaultMeals = {
  Monday: {
    breakfast: '🥣 Oatmeal with berries & honey',
    lunch: '🥙 Turkey & avocado wrap',
    dinner: '🍗 Baked chicken with roasted vegetables',
  },
  Tuesday: {
    breakfast: '🍳 Scrambled eggs & whole wheat toast',
    lunch: '🥗 Greek salad with grilled chicken',
    dinner: '🍝 Spaghetti with marinara & garlic bread',
  },
  Wednesday: {
    breakfast: '🥞 Whole wheat pancakes with maple syrup',
    lunch: '🥪 Grilled cheese & tomato soup',
    dinner: '🌮 Taco night — ground beef, lettuce, cheese',
  },
  Thursday: {
    breakfast: '🍌 Banana smoothie & granola bar',
    lunch: '🍱 Leftover tacos or rice bowl',
    dinner: '🐟 Baked salmon with steamed broccoli & rice',
  },
  Friday: {
    breakfast: '🧇 Waffles with fresh strawberries',
    lunch: '🥑 Avocado toast with poached egg',
    dinner: '🍕 Homemade pizza night!',
  },
  Saturday: {
    breakfast: '🍓 Yogurt parfait with granola & fruit',
    lunch: '🍔 Turkey burgers with sweet potato fries',
    dinner: '🥘 One-pot chicken & vegetable soup',
  },
  Sunday: {
    breakfast: '🍞 French toast with powdered sugar',
    lunch: '🥗 Caesar salad with shrimp',
    dinner: '🥩 Sunday roast — beef, potatoes & carrots',
  },
}

// Get today's day name (Monday, Tuesday, etc.)
function getTodayName() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[new Date().getDay()]
}

function loadMeals() {
  try {
    const saved = localStorage.getItem('portfolio-meals')
    return saved ? JSON.parse(saved) : defaultMeals
  } catch { return defaultMeals }
}

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner']
const MEAL_ICONS = { breakfast: '🌅', lunch: '☀️', dinner: '🌙' }
const MEAL_LABELS = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner' }

export default function MealPlanner() {
  const [meals, setMeals] = useState(loadMeals)
  const [selectedDay, setSelectedDay] = useState(getTodayName)
  const [editKey, setEditKey] = useState(null)  // 'breakfast' | 'lunch' | 'dinner' | null
  const [editText, setEditText] = useState('')

  useEffect(() => {
    localStorage.setItem('portfolio-meals', JSON.stringify(meals))
  }, [meals])

  const startEdit = (mealType) => {
    setEditKey(mealType)
    setEditText(meals[selectedDay][mealType])
  }

  const saveEdit = () => {
    if (editText.trim()) {
      setMeals(m => ({
        ...m,
        [selectedDay]: { ...m[selectedDay], [editKey]: editText.trim() }
      }))
    }
    setEditKey(null)
  }

  const resetDay = () => {
    setMeals(m => ({ ...m, [selectedDay]: defaultMeals[selectedDay] }))
  }

  const today = getTodayName()

  return (
    <div className="meal-planner">

      {/* Day selector */}
      <div className="day-tabs">
        {DAYS.map(day => (
          <button
            key={day}
            className={`day-tab ${selectedDay === day ? 'active' : ''} ${today === day ? 'today' : ''}`}
            onClick={() => { setSelectedDay(day); setEditKey(null) }}
          >
            <span className="day-short">{day.slice(0, 3)}</span>
            {today === day && <span className="today-dot" />}
          </button>
        ))}
      </div>

      {/* Day header */}
      <div className="day-header">
        <div>
          <h3 className="day-title">{selectedDay}</h3>
          {today === selectedDay && <span className="today-badge">📅 Today</span>}
        </div>
        <button className="reset-btn" onClick={resetDay} title="Reset to default">↺ Reset</button>
      </div>

      {/* Meal cards */}
      <div className="meal-cards">
        {MEAL_TYPES.map(type => (
          <div key={type} className={`meal-card meal-${type}`}>
            <div className="meal-card-header">
              <span className="meal-icon">{MEAL_ICONS[type]}</span>
              <span className="meal-label">{MEAL_LABELS[type]}</span>
              <button className="edit-meal-btn" onClick={() => startEdit(type)}>✏️</button>
            </div>

            {editKey === type ? (
              <div className="meal-edit">
                <input
                  className="meal-input"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') setEditKey(null) }}
                  autoFocus
                />
                <div className="meal-edit-actions">
                  <button className="save-btn" onClick={saveEdit}>Save</button>
                  <button className="cancel-btn" onClick={() => setEditKey(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <p className="meal-text">{meals[selectedDay][type]}</p>
            )}
          </div>
        ))}
      </div>

      <p className="meal-hint">💡 Click ✏️ on any meal to customize it. Changes are saved automatically!</p>
    </div>
  )
}
