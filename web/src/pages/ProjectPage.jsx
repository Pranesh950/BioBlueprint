import { Link, useParams } from 'react-router-dom'
import projects from '../data/projects.json'
import RepoHeader from '../components/RepoHeader'

export default function ProjectPage() {
  const { slug } = useParams()
  const resource = projects.find((project) => project.slug === slug)

  if (!resource) {
    return (
      <main className="page project-page">
        <h1>Resource Not Found</h1>
        <p>The requested resource is not currently listed in the catalog.</p>
        <Link to="/catalog">Back to catalog</Link>
      </main>
    )
  }

  return (
    <main className="page repo-page resource-page">
      <RepoHeader project={resource} />

      <section className="resource-detail-grid" aria-label="Resource details">
        <article className="resource-section-card">
          <h2>Details</h2>
          <p>
            {resource.description}
          </p>
        </article>

        <article className="resource-section-card">
          <h2>License & source</h2>
          <p>
            <strong>{resource.licenseName}</strong> ({resource.licenseSpdx})
          </p>
          <ul className="resource-link-list">
            <li>
              <a href={resource.sourceUrl} target="_blank" rel="noreferrer">Repository</a>
            </li>
            <li>
              <a href={resource.licenseUrl} target="_blank" rel="noreferrer">License</a>
            </li>
          </ul>
        </article>
      </section>
    </main>
  )
}
