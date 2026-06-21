import { useState, useEffect, useCallback } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import './TravelTracker.css'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const COLORS = ['#e8699a', '#6c63ff', '#f4a261', '#52b788', '#ff9f43', '#a29bfe']

const defaultData = {
  members: [
    { id: 1, name: 'Me', color: '#e8699a' },
    { id: 2, name: 'Baby', color: '#6c63ff' },
  ],
  visited: { 1: ['United States of America', 'Mongolia'], 2: [] },
}

function loadData() {
  try {
    const saved = localStorage.getItem('portfolio-travel')
    return saved ? JSON.parse(saved) : defaultData
  } catch { return defaultData }
}

export default function TravelTracker() {
  const [data, setData] = useState(loadData)
  const [activeMemberId, setActiveMemberId] = useState(1)
  const [tooltip, setTooltip] = useState('')
  const [newName, setNewName] = useState('')

  useEffect(() => {
    localStorage.setItem('portfolio-travel', JSON.stringify(data))
  }, [data])

  const toggleCountry = useCallback((geoName) => {
    setData(d => {
      const current = d.visited[activeMemberId] || []
      const already = current.includes(geoName)
      return {
        ...d,
        visited: {
          ...d.visited,
          [activeMemberId]: already
            ? current.filter(c => c !== geoName)
            : [...current, geoName],
        },
      }
    })
  }, [activeMemberId])

  const getCountryColor = (geoName) => {
    for (const member of data.members) {
      if ((data.visited[member.id] || []).includes(geoName)) return member.color
    }
    return '#ecd0d6'
  }

  const addMember = (e) => {
    e.preventDefault()
    if (!newName.trim() || data.members.length >= 6) return
    const id = Date.now()
    const color = COLORS[data.members.length % COLORS.length]
    setData(d => ({ ...d, members: [...d.members, { id, name: newName.trim(), color }] }))
    setActiveMemberId(id)
    setNewName('')
  }

  const removeMember = (id) => {
    setData(d => {
      const visited = { ...d.visited }
      delete visited[id]
      return { members: d.members.filter(m => m.id !== id), visited }
    })
    setActiveMemberId(data.members.find(m => m.id !== id)?.id ?? data.members[0]?.id)
  }

  const activeMember = data.members.find(m => m.id === activeMemberId)
  const totalCountries = 195

  return (
    <div className="container">
      <div className="todo-label">⭐ Live Demo</div>
      <h2 className="section-title">Family Travel Tracker</h2>
      <p className="section-sub">Click any country to mark it as visited — each family member gets their own color 🗺️</p>
    <div className="travel-tracker">

      {/* Member tabs */}
      <div className="travel-header">
        <div className="member-tabs">
          {data.members.map(m => (
            <div key={m.id} className={`member-tab ${activeMemberId === m.id ? 'active' : ''}`}>
              <button onClick={() => setActiveMemberId(m.id)}>
                <span className="member-dot" style={{ background: m.color }} />
                {m.name}
                <span className="member-count" style={{ color: m.color }}>
                  {(data.visited[m.id] || []).length}
                </span>
              </button>
              {data.members.length > 1 && (
                <button className="remove-member" onClick={() => removeMember(m.id)}>×</button>
              )}
            </div>
          ))}
        </div>

        {data.members.length < 6 && (
          <form className="add-member-form" onSubmit={addMember}>
            <input
              className="todo-input"
              type="text"
              placeholder="Add family member..."
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
            <button type="submit" className="btn btn-primary todo-add-btn">+ Add</button>
          </form>
        )}
      </div>

      {/* Hint */}
      <p className="travel-hint">
        {activeMember && (
          <>
            <span style={{ color: activeMember.color }}>●</span>
            {' '}Click a country to mark it as visited by <strong>{activeMember.name}</strong>
            {tooltip && <span className="travel-tooltip"> — {tooltip}</span>}
          </>
        )}
      </p>

      {/* Map */}
      <div className="map-container">
        <ComposableMap
          projectionConfig={{ scale: 140, center: [0, 20] }}
          style={{ width: '100%', height: 'auto' }}
        >
          <ZoomableGroup>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const name = geo.properties.name
                  const fill = getCountryColor(name)
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fill}
                      stroke="#fff"
                      strokeWidth={0.4}
                      style={{
                        default: { outline: 'none', cursor: 'pointer', transition: 'fill 0.15s' },
                        hover: { fill: activeMember?.color || '#e8699a', opacity: 0.75, outline: 'none', cursor: 'pointer' },
                        pressed: { outline: 'none' },
                      }}
                      onClick={() => toggleCountry(name)}
                      onMouseEnter={() => setTooltip(name)}
                      onMouseLeave={() => setTooltip('')}
                    />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Stats footer */}
      <div className="travel-stats">
        {data.members.map(m => {
          const count = (data.visited[m.id] || []).length
          const pct = Math.round((count / totalCountries) * 100)
          return (
            <div key={m.id} className="travel-stat-card">
              <span className="member-dot" style={{ background: m.color }} />
              <strong>{m.name}</strong>
              <span style={{ color: m.color, fontWeight: 700, fontSize: '1.1rem' }}>{count}</span>
              <span className="stat-sub">countries · {pct}% of world</span>
            </div>
          )
        })}
      </div>

      <p className="travel-hint" style={{ marginTop: 8 }}>
        💡 Click any visited country again to unmark it
      </p>
    </div>
    </div>
  )
}
