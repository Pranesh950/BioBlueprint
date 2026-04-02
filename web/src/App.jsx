import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import ProjectPage from './pages/ProjectPage'
import AboutPage from './pages/AboutPage'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const urlQuery = new URLSearchParams(location.search).get('q') || ''
  const searchDefaultValue = location.pathname === '/search' ? urlQuery : ''

  const onSearchSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nextSearchTerm = (formData.get('q') || '').toString().trim()
    navigate(`/search?q=${encodeURIComponent(nextSearchTerm)}`)
  }

  const getNavLinkClass = ({ isActive }) => `topbar-link${isActive ? ' active' : ''}`

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-sheen" aria-hidden="true" />
        <div className="topbar-content">
          <div className="topbar-left">
            <div className="brand-stack">
              <NavLink to="/" end className="brand">
                BioBlueprint
              </NavLink>
              <p className="brand-tagline">Open-source bioengineering project sharing</p>
            </div>
            <nav className="topbar-nav" aria-label="Primary">
              <NavLink to="/" end className={getNavLinkClass}>Projects</NavLink>
              <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
            </nav>
          </div>

          <form onSubmit={onSearchSubmit} className="search-form" key={`${location.pathname}:${urlQuery}`}>
            <span aria-hidden="true" className="search-shortcut">/</span>
            <input
              id="project-search"
              name="q"
              type="search"
              placeholder="Search projects, organisms, methods"
              defaultValue={searchDefaultValue}
              aria-label="Search projects"
            />
            <button type="submit" className="search-submit">Go</button>
          </form>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/project/:slug" element={<ProjectPage key={location.pathname} />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
}

export default App
