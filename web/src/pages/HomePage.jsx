import { Link } from 'react-router-dom'
import projects from '../data/projects.json'

function pickRandomProject() {
  return projects[Math.floor(Math.random() * projects.length)]
}

export default function HomePage() {
  const demoProject = pickRandomProject()

  return (
    <main className="page home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">Open-source demo</p>
          <h1>Share entire bioengineering projects on one platform</h1>
          <p className="lead">
            BioBlueprint keeps protocols, code, sequences, STL files, and results in one versioned workspace.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to={`/project/${demoProject.slug}`}>
              Explore demo project
            </Link>
            <Link className="secondary-button" to="/about">
              How to contribute
            </Link>
          </div>
        </div>

        <aside className="home-hero-panel" aria-label="Demo project details">
          <div className="demo-meta">
            <div>
              <dt>Total projects</dt>
              <dd>{projects.length}</dd>
            </div>
            <div>
              <dt>Demo project</dt>
              <dd>
                <Link to={`/project/${demoProject.slug}`}>{demoProject.title}</Link>
              </dd>
            </div>
          </div>
        </aside>
      </section>

      <section className="repo-list-shell">
        <header className="repo-list-head">
          <span>Project index</span>
          <span>{projects.length} listed</span>
        </header>

        <div className="repo-list-body">
          {projects.map((project) => (
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
      </section>
    </main>
  )
}
