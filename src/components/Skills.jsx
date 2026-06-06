import './Skills.css'

const skillGroups = [
  {
    category: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React', level: 75 },
      { name: 'jQuery', level: 65 },
      { name: 'EJS', level: 65 },
      { name: 'Responsive Design', level: 65 },
    ],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 65 },
      { name: 'Express.js', level: 60 },
      { name: 'REST APIs', level: 60 },
      
    ],
  },
  {
    category: 'Languages & Databases',
    icon: '🗄️',
    skills: [
      { name: 'JavaScript', level: 75 },
      { name: 'HTML/CSS', level: 65 },
      { name: 'Java', level: 35 },
      { name: 'PostgreSQL', level: 75 },
    ],
  },
]

export default function Skills() {
  return (
    <div className="container">
      <h2 className="section-title">Skills</h2>
      <p className="section-sub">Self-taught and growing every day 🌱</p>
      <div className="skills-grid">
        {skillGroups.map(group => (
          <div key={group.category} className="skill-card">
            <div className="skill-card-header">
              <span className="skill-icon">{group.icon}</span>
              <h3>{group.category}</h3>
            </div>
            <div className="skill-list">
              {group.skills.map(s => (
                <div key={s.name} className="skill-item">
                  <div className="skill-meta">
                    <span>{s.name}</span>
                    <span className="skill-pct">{s.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
