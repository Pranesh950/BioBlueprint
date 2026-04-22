import { NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import ProjectPage from './pages/ProjectPage'
import AboutPage from './pages/AboutPage'

function LegacyProjectRedirect() {
  const { slug } = useParams()

  if (!slug) {
    return <Navigate to="/catalog" replace />
  }

  return <Navigate to={`/resource/${slug}`} replace />
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const urlQuery = new URLSearchParams(location.search).get('q') || ''
  const searchDefaultValue = location.pathname === '/catalog' || location.pathname === '/search' ? urlQuery : ''

  const onSearchSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nextSearchTerm = (formData.get('q') || '').toString().trim()
    navigate(`/catalog?q=${encodeURIComponent(nextSearchTerm)}`)
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
              <p className="brand-tagline">Discover open resources for bioengineering and beyond</p>
            </div>
            <nav className="topbar-nav" aria-label="Primary">
              <NavLink to="/" end className={getNavLinkClass}>Discover</NavLink>
              <NavLink to="/catalog" className={getNavLinkClass}>Catalog</NavLink>
              <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
            </nav>
          </div>

          <form onSubmit={onSearchSubmit} className="search-form" key={`${location.pathname}:${urlQuery}`}>
            <span aria-hidden="true" className="search-shortcut">/</span>
            <input
              id="project-search"
              name="q"
              type="search"
              placeholder="Search projects, methods, and licenses"
              defaultValue={searchDefaultValue}
              aria-label="Search resources"
            />
            <button type="submit" className="search-submit">Go</button>
          </form>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<SearchPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/resource/:slug" element={<ProjectPage />} />
        <Route path="/project/:slug" element={<LegacyProjectRedirect />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
}

export default App
