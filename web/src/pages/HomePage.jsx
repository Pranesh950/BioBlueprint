import { Link } from 'react-router-dom'
import projects from '../data/projects.json'

function pickRandomProject() {
  return projects[Math.floor(Math.random() * projects.length)]
}

export default function HomePage() {
  const featuredProject = pickRandomProject()

  return (
    <main className="page home-page">
      <section className="repo-index-header">
        <div>
          <p className="eyebrow">Featured Repository</p>
          <h1>{featuredProject.title}</h1>
          <p className="lead">{featuredProject.description}</p>
        </div>
        <Link className="primary-button" to={`/project/${featuredProject.slug}`}>
          Open Featured
        </Link>
      </section>

      <section className="repo-list-shell">
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
