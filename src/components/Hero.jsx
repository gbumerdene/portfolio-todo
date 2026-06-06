import './Hero.css'

export default function Hero() {
  return (
    <div className="hero-wrapper">
      <div className="hero-bg" />
      <div className="container hero-content">
        <div className="hero-text">
          <p className="hero-greeting">Hi there, I'm</p>
          <h1 className="hero-name">Buma</h1>
          <h2 className="hero-role">
            Full-Stack Developer &amp; <span className="highlight">Career Changer</span>
          </h2>
          <p className="hero-desc">
            Self-taught developer with a background in legal &amp; operations. I build web apps
            with React, Node.js, and PostgreSQL — and bring 6+ years of professional discipline to every line of code.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-outline">Get In Touch</a>
            <a href="/Buma_Resume.pdf" download className="btn btn-outline">📄 Download Resume</a>
          </div>
        </div>
        <div className="hero-avatar">
          <div className="avatar-ring">
            <div className="avatar-inner">
              <span className="avatar-emoji">👩‍💻</span>
            </div>
          </div>
          <div className="floating-badge badge-react">React</div>
          <div className="floating-badge badge-node">Node.js</div>
          <div className="floating-badge badge-ts">PostgreSQL</div>
        </div>
      </div>
    </div>
  )
}
