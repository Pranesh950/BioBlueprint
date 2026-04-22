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
          <h2>Scientific use</h2>
          <p>
            {resource.description}
          </p>
        </article>

        <article className="resource-section-card">
          <h2>Source and legal reuse</h2>
          <p>
            Maintained by <strong>{resource.attributionName}</strong>. Reuse is governed by
            {' '}
            <strong>{resource.licenseName}</strong>
            {' '}
            ({resource.licenseSpdx}).
          </p>
          <ul className="resource-link-list">
            <li>
              <a href={resource.sourceUrl} target="_blank" rel="noreferrer">Open canonical source repository</a>
            </li>
            <li>
              <a href={resource.attributionUrl} target="_blank" rel="noreferrer">View maintainer profile</a>
            </li>
            <li>
              <a href={resource.licenseUrl} target="_blank" rel="noreferrer">Read license terms</a>
            </li>
          </ul>
        </article>
      </section>
    </main>
  )
}
