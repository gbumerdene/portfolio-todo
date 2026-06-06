import './About.css'

const stats = [
  { value: '3', label: 'Projects Built' },
  { value: '6+', label: 'Years Professional Experience' },
  { value: '5+', label: 'Technologies Learned' },
  { value: '100%', label: 'Self-Taught' },
]

export default function About() {
  return (
    <div className="container">
      <h2 className="section-title">About Me</h2>
      <p className="section-sub">Career changer. Self-taught developer. Lifelong learner.</p>
      <div className="about-grid">
        <div className="about-text">
          <p>
            I'm Buma — a self-taught developer based in Dallas, TX, transitioning into software engineering
            after 6+ years in legal case management and operations leadership. I taught myself JavaScript,
            React, Node.js, and PostgreSQL through hands-on projects and relentless curiosity.
          </p>
          <p>
            My background as an immigration paralegal and operations manager gave me skills that
            make me a better developer: attention to detail, clear communication, structured problem-solving,
            and the ability to work under pressure and deliver results.
          </p>
          <div className="about-highlights">
            <div className="highlight-item">
              <span className="dot" />
              <span>📍 Based in Dallas, TX — open to remote &amp; hybrid roles</span>
            </div>
            <div className="highlight-item">
              <span className="dot" />
              <span>🎯 Actively seeking junior full-stack developer opportunities</span>
            </div>
            <div className="highlight-item">
              <span className="dot" />
              <span>🧠 Unique edge: legal precision + ops leadership + engineering mindset</span>
            </div>
          </div>
          <a href="#contact" className="btn btn-primary" style={{ display: 'inline-block', marginTop: 24 }}>
            Let's Talk
          </a>
        </div>
        <div className="about-stats">
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
