import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import projects from '../data/projects.json'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const normalizedQuery = query.trim().toLowerCase()

  const filteredProjects = useMemo(() => {
    if (!normalizedQuery) {
      return projects
    }

    return projects.filter((project) => {
      const haystack = `${project.title} ${project.description} ${project.slug}`.toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [normalizedQuery])

  return (
    <main className="page search-page">
      <section className="search-header">
        <p className="eyebrow">Search</p>
        <h1>Project results</h1>
        <p>
          {query
            ? `Showing matches for "${query}".`
            : 'Showing all indexed projects.'}
        </p>
        <p className="result-meta">{filteredProjects.length} results from {projects.length} indexed projects</p>
      </section>

      <section className="repo-list-shell result-list">
        <header className="repo-list-head">
          <span>Project index</span>
          <span>{filteredProjects.length} shown</span>
        </header>

        {filteredProjects.length > 0 ? (
          <div className="repo-list-body">
            {filteredProjects.map((project) => (
              <article key={project.slug} className="repo-row">
                <div className="repo-row-main">
                  <p className="repo-row-label">Blueprint</p>
                  <h2>
                    <Link to={`/project/${project.slug}`}>{project.title}</Link>
                  </h2>
                  <p>{project.description}</p>
                </div>

                <div className="repo-row-side">
                  <Link to={`/project/${project.slug}`} className="inline-link">View project</Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No matching projects yet</h2>
            <p>Try a broader keyword or browse the current index.</p>
            <Link to="/search" className="secondary-button">Reset search</Link>
          </div>
        )}
      </section>
    </main>
  )
}
