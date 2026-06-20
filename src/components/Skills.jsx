import './Skills.css'

const skillGroups = [
  {
    category: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React', label: 'Building projects with' },
      { name: 'jQuery', label: 'Working knowledge' },
      { name: 'EJS', label: 'Working knowledge' },
      { name: 'Responsive Design', label: 'Working knowledge' },
    ],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', label: 'Building projects with' },
      { name: 'Express.js', label: 'Building projects with' },
      { name: 'REST APIs', label: 'Building projects with' },
    ],
  },
  {
    category: 'Languages & Databases',
    icon: '🗄️',
    skills: [
      { name: 'JavaScript', label: 'Building projects with' },
      { name: 'HTML/CSS', label: 'Working knowledge' },
      { name: 'Java', label: 'Learning' },
      { name: 'PostgreSQL', label: 'Building projects with' },
    ],
  },
]

// Maps label text to a CSS modifier class for color-coding
const LABEL_CLASS = {
  'Building projects with': 'badge--building',
  'Working knowledge': 'badge--working',
  'Learning': 'badge--learning',
}

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
                  <span className="skill-name">{s.name}</span>
                  <span className={`skill-badge ${LABEL_CLASS[s.label]}`}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="skill-legend">
        <span className="skill-badge badge--building">Building projects with</span>
        <span className="skill-badge badge--working">Working knowledge</span>
        <span className="skill-badge badge--learning">Learning</span>
      </div>
    </div>
  )
}
