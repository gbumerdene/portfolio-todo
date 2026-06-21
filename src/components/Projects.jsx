import './Projects.css'

const projects = [
  {
    emoji: '🗺️',
    title: 'Family Travel Tracker',
    description:
      'An interactive SVG world map where each family member tracks the countries they\'ve visited — each person gets their own color on the map. Built with Node.js, Express, EJS, and PostgreSQL with multi-user support.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'EJS', 'SVG'],
    color: '#ff6584',
    demo: 'travel',
  },
  {
    emoji: '✅',
    title: 'Family Task Manager',
    description:
      'An interactive React app to keep the household running — grocery lists, baby appointments, nap schedules, and self-care reminders. Features priority levels, filtering, and a built-in baby milestone tracker.',
    tags: ['React', 'Hooks', 'Local Storage', 'CSS'],
    color: '#6c63ff',
    demo: 'tasks',
  },
  {
    emoji: '🔗',
    title: 'Family Data REST API',
    description:
      'A backend API powering family-focused apps — tracking routines, schedules, and notes. Designed with RESTful principles, full CRUD operations, PostgreSQL integration, and structured JSON responses.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'REST API'],
    color: '#43e97b',
  },
]

export default function Projects({ activeDemo, onDemoToggle }) {
  return (
    <div className="container projects-container">
      <h2 className="section-title">My Projects</h2>
      <p className="section-sub">
        Built as a full-time mom — solving real everyday problems with code 💪
      </p>
      <div className="projects-grid">
        {projects.map(p => {
          const isActive = p.demo && activeDemo === p.demo
          return (
            <div
              key={p.title}
              className={`project-card ${p.demo ? 'has-demo' : ''} ${isActive ? 'demo-active' : ''}`}
              style={{ '--card-color': p.color }}
              onClick={p.demo ? () => onDemoToggle(p.demo) : undefined}
            >
              {isActive && <div className="featured-badge">▲ Hide Demo</div>}
              {p.demo && !isActive && <div className="featured-badge">⭐ Click to Try!</div>}
              <div className="project-icon">{p.emoji}</div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.description}</p>
              <div className="project-tags">
                {p.tags.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <div className="project-footer">
                <span className="project-status" style={{ color: p.color }}>
                  {p.demo ? (isActive ? '▲ Close demo' : '● Live Demo ↓') : '● Completed'}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
