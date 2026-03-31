import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import ProjectPage from './pages/ProjectPage'
import AboutPage from './pages/AboutPage'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const urlQuery = new URLSearchParams(location.search).get('q') || ''

    if (location.pathname === '/search') {
      setSearchTerm(urlQuery)
    }
  }, [location.pathname, location.search])

  const onSearchSubmit = (event) => {
    event.preventDefault()
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          <Link to="/" className="brand">
            bioforge
          </Link>
          <nav className="topbar-nav" aria-label="Primary">
            <Link to="/">Projects</Link>
            <Link to="/about">About</Link>
          </nav>
        </div>
        <form onSubmit={onSearchSubmit} className="search-form">
          <span aria-hidden="true">/</span>
          <input
            type="search"
            placeholder="Search projects"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Search projects"
          />
        </form>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
}

export default App
