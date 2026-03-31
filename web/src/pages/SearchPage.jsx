import { Link, useSearchParams } from 'react-router-dom'
import projects from '../data/projects.json'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  return (
    <main className="page search-page">
      <section className="search-header">
        <h1>Project Results</h1>
        <p>
          Showing all uploaded projects{query ? ` for "${query}"` : ''}. Semantic search can be added later.
        </p>
        <p className="result-meta">{projects.length} projects in this index</p>
      </section>

      <section className="repo-list-shell result-list">
        <header className="repo-list-head">
          <span>Repository</span>
        </header>
        {projects.map((project) => (
          <article key={project.slug} className="repo-row">
            <div>
              <h2>
                <Link to={`/project/${project.slug}`}>{project.title}</Link>
              </h2>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
