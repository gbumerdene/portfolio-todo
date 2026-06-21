import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import TravelTracker from './components/TravelTracker'
import TodoApp from './components/TodoApp'
import Contact from './components/Contact'
import './App.css'

export default function App() {
  const [activeDemo, setActiveDemo] = useState(null)

  const handleDemoToggle = (demo) => {
    setActiveDemo(prev => prev === demo ? null : demo)
  }

  return (
    <div className="app">
      <Navbar />
      <main>
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects" style={{ flexDirection: 'column', gap: '0', paddingBottom: '80px' }}>
          <Projects activeDemo={activeDemo} onDemoToggle={handleDemoToggle} />
          {activeDemo === 'travel' && <TravelTracker />}
          {activeDemo === 'tasks' && <TodoApp />}
        </section>
        <section id="contact"><Contact /></section>
      </main>
    </div>
  )
}
