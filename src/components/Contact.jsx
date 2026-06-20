import { useState } from 'react'
import './Contact.css'

const FORMSPREE_ID = 'mlgkvqjr' // Formspree form ID

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="container">
      <h2 className="section-title">Get In Touch</h2>
      <p className="section-sub">Open to junior developer roles — let's connect!</p>
      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <div>
              <strong>Email</strong>
              <p>
                <a href="mailto:bumerdene.g@gmail.com">bumerdene.g@gmail.com</a>
              </p>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">💼</span>
            <div>
              <strong>LinkedIn</strong>
              <p>
                <a href="https://linkedin.com/in/buma-gantulga" target="_blank" rel="noreferrer">
                  linkedin.com/in/buma-gantulga
                </a>
              </p>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">🐙</span>
            <div>
              <strong>GitHub</strong>
              <p>
                <a href="https://github.com/gbumerdene" target="_blank" rel="noreferrer">
                  github.com/gbumerdene
                </a>
              </p>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <div>
              <strong>Location</strong>
              <p>Dallas, TX — open to remote &amp; hybrid</p>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          {status === 'success' && (
            <div className="success-msg">✅ Message sent! I'll get back to you soon.</div>
          )}
          {status === 'error' && (
            <div className="error-msg">❌ Something went wrong. Please try again or email me directly.</div>
          )}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows={5}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message 🚀'}
          </button>
        </form>
      </div>
    </div>
  )
}
