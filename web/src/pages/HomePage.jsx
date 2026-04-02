import { Link } from 'react-router-dom'
import projects from '../data/projects.json'

function pickRandomProject() {
  return projects[Math.floor(Math.random() * projects.length)]
}

export default function HomePage() {
  const featuredProject = pickRandomProject()

  return (
    <main className="page home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">Platform</p>
          <h1>Share the whole bioengineering stack, not just fragments.</h1>
          <p className="lead">
            BioBlueprint keeps protocols, code, sequences, STL files, and results in one versioned workspace.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to={`/project/${featuredProject.slug}`}>
              Explore featured project
            </Link>
            <Link className="secondary-button" to="/about">
              How to contribute
            </Link>
          </div>
        </div>

        <aside className="home-hero-panel" aria-label="Platform snapshot">
          <p className="hero-panel-eyebrow">Platform snapshot</p>
          <dl className="hero-stats">
            <div>
              <dt>Projects</dt>
              <dd>{projects.length}</dd>
            </div>
            <div>
              <dt>Structure</dt>
              <dd>Folder-native</dd>
            </div>
            <div>
              <dt>Workflow</dt>
              <dd>Fork to publish</dd>
            </div>
          </dl>
          <p className="hero-panel-note">
            Featured project: <Link to={`/project/${featuredProject.slug}`}>{featuredProject.title}</Link>
          </p>
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
                <span className="repo-row-meta">Open workspace</span>
                <Link to={`/project/${project.slug}`} className="inline-link">View project</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
