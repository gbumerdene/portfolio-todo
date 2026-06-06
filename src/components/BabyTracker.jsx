import { useState, useEffect } from 'react'
import './BabyTracker.css'

const MILESTONES = [
  {
    weeksMin: 0, weeksMax: 3, label: 'Newborn', emoji: '🌱',
    items: ['Recognizes your voice', 'Focuses 8–12 inches away', 'Grasping & sucking reflexes', 'Sleeps 16–17 hours a day'],
  },
  {
    weeksMin: 4, weeksMax: 7, label: '1–2 Months', emoji: '😊',
    items: ['First social smile 😄', 'Tracks moving objects with eyes', 'Coos and makes sounds', 'Lifts head briefly during tummy time'],
  },
  {
    weeksMin: 8, weeksMax: 11, label: '2–3 Months', emoji: '🗣️',
    items: ['Laughs out loud', 'Holds head at 45°', 'Recognizes your face', 'Bats at hanging objects'],
  },
  {
    weeksMin: 12, weeksMax: 19, label: '3–5 Months', emoji: '🙌',
    items: ['Rolls from tummy to back', 'Reaches & grabs objects', 'Sits with support', 'Discovers hands & feet'],
  },
  {
    weeksMin: 20, weeksMax: 27, label: '5–7 Months', emoji: '🍎',
    items: ['Sits without support', 'Ready for solid foods!', 'Babbles (ba-ba, ma-ma)', 'Recognizes own name'],
  },
  {
    weeksMin: 28, weeksMax: 35, label: '7–9 Months', emoji: '🐣',
    items: ['Crawls! 🎉', 'Waves bye-bye', 'Stranger anxiety begins', 'Pincer grasp developing'],
  },
  {
    weeksMin: 36, weeksMax: 47, label: '9–12 Months', emoji: '🚶',
    items: ['Pulls to standing', 'Says "mama" & "dada"', 'Claps hands', 'Cruises along furniture'],
  },
  {
    weeksMin: 48, weeksMax: 64, label: '12–15 Months 🎂', emoji: '👟',
    items: ['First steps! 🥹', '3–5 meaningful words', 'Points to objects', 'Drinks from a cup'],
  },
  {
    weeksMin: 65, weeksMax: 77, label: '15–18 Months', emoji: '🏃',
    items: ['Walks independently', 'Climbs stairs with help', '10–20 words', 'Scribbles with crayons'],
  },
  {
    weeksMin: 78, weeksMax: 103, label: '18–24 Months', emoji: '💬',
    items: ['Runs! 🏃‍♀️', '2-word phrases', 'Points to body parts', '50+ words'],
  },
  {
    weeksMin: 104, weeksMax: 155, label: '2–3 Years 🎂', emoji: '🎨',
    items: ['Jumps with both feet', 'Follows 2-step instructions', 'Plays with other kids', 'Potty training time!'],
  },
  {
    weeksMin: 156, weeksMax: 9999, label: '3+ Years 🎂', emoji: '🌟',
    items: ['Rides a tricycle', 'Speaks in full sentences', 'Imaginative play', 'Getting so big! 💛'],
  },
]

function getAgeInWeeks(birthdate) {
  const birth = new Date(birthdate)
  const now = new Date()
  const diffMs = now - birth
  return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7))
}

function formatAge(weeks) {
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? 's' : ''} old`
  const months = Math.floor(weeks / 4.33)
  if (months < 24) return `${months} month${months !== 1 ? 's' : ''} old`
  const years = Math.floor(months / 12)
  const remMonths = months % 12
  return remMonths > 0 ? `${years} yr ${remMonths} mo old` : `${years} year${years !== 1 ? 's' : ''} old`
}

function loadBabies() {
  try {
    const saved = localStorage.getItem('portfolio-babies')
    return saved ? JSON.parse(saved) : []
  } catch { return [] }
}

export default function BabyTracker() {
  const [babies, setBabies] = useState(loadBabies)
  const [name, setName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    localStorage.setItem('portfolio-babies', JSON.stringify(babies))
  }, [babies])

  useEffect(() => {
    if (babies.length > 0 && selected === null) setSelected(babies[0].id)
  }, [babies])

  const addBaby = (e) => {
    e.preventDefault()
    if (!name.trim() || !birthdate) return
    const newBaby = { id: Date.now(), name: name.trim(), birthdate }
    setBabies(b => [...b, newBaby])
    setSelected(newBaby.id)
    setName('')
    setBirthdate('')
  }

  const removeBaby = (id) => {
    setBabies(b => b.filter(x => x.id !== id))
    if (selected === id) setSelected(babies.find(b => b.id !== id)?.id ?? null)
  }

  const activeBaby = babies.find(b => b.id === selected)
  const ageWeeks = activeBaby ? getAgeInWeeks(activeBaby.birthdate) : 0

  const currentStage = MILESTONES.find(m => ageWeeks >= m.weeksMin && ageWeeks <= m.weeksMax)
  const pastStages = MILESTONES.filter(m => m.weeksMax < ageWeeks)
  const nextStage = MILESTONES.find(m => m.weeksMin > ageWeeks)

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="baby-tracker">
      {/* Add baby form */}
      <form className="baby-form" onSubmit={addBaby}>
        <input
          className="todo-input"
          type="text"
          placeholder="Baby's name 👶"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="todo-input date-input"
          type="date"
          value={birthdate}
          max={today}
          onChange={e => setBirthdate(e.target.value)}
        />
        <button type="submit" className="btn btn-primary todo-add-btn">+ Add Baby</button>
      </form>

      {/* Baby selector tabs */}
      {babies.length > 0 && (
        <div className="baby-tabs">
          {babies.map(b => (
            <div key={b.id} className={`baby-tab ${selected === b.id ? 'active' : ''}`}>
              <button onClick={() => setSelected(b.id)}>
                👶 {b.name}
              </button>
              <button className="remove-baby" onClick={() => removeBaby(b.id)} title="Remove">×</button>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {babies.length === 0 && (
        <div className="baby-empty">
          <span>👶</span>
          <p>Enter your baby's name and birthdate above to see their milestones!</p>
        </div>
      )}

      {/* Milestone display */}
      {activeBaby && currentStage && (
        <div className="milestone-view">

          {/* Age header */}
          <div className="baby-age-card">
            <div className="baby-age-left">
              <span className="baby-name-display">✨ {activeBaby.name}</span>
              <span className="baby-age-text">{formatAge(ageWeeks)}</span>
              <span className="baby-born">Born: {new Date(activeBaby.birthdate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="current-stage-badge">
              <span className="stage-emoji">{currentStage.emoji}</span>
              <span className="stage-label">{currentStage.label}</span>
            </div>
          </div>

          {/* Current milestones */}
          <div className="milestone-section current">
            <h4 className="milestone-heading">🌟 At This Stage</h4>
            <ul className="milestone-list">
              {currentStage.items.map(item => (
                <li key={item} className="milestone-item current-item">
                  <span className="milestone-dot">●</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Next milestone */}
          {nextStage && (
            <div className="milestone-section next">
              <h4 className="milestone-heading">🔜 Coming Up: {nextStage.label}</h4>
              <ul className="milestone-list">
                {nextStage.items.map(item => (
                  <li key={item} className="milestone-item next-item">
                    <span className="milestone-dot">○</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Past stages summary */}
          {pastStages.length > 0 && (
            <div className="milestone-section past">
              <h4 className="milestone-heading">✅ Milestones Achieved</h4>
              <div className="past-badges">
                {pastStages.map(s => (
                  <span key={s.label} className="past-badge">{s.emoji} {s.label}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
