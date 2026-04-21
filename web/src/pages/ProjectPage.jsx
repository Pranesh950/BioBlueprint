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
          <h2>Attribution</h2>
          <p>
            This listing credits <strong>{resource.attributionName}</strong> as the source maintainer.
            Always retain attribution when sharing derivatives.
          </p>
          <ul className="resource-link-list">
            <li>
              <a href={resource.attributionUrl} target="_blank" rel="noreferrer">View attribution profile</a>
            </li>
            <li>
              <a href={resource.sourceUrl} target="_blank" rel="noreferrer">Open canonical source repository</a>
            </li>
          </ul>
        </article>

        <article className="resource-section-card">
          <h2>License and reuse</h2>
          <p>
            <strong>{resource.title}</strong> is listed as <strong>{resource.licenseName}</strong> ({resource.licenseSpdx}).
          </p>
          <p>
            Review the original license text before redistributing, embedding, or modifying this resource.
          </p>
          <a href={resource.licenseUrl} className="inline-link" target="_blank" rel="noreferrer">
            Read license terms
          </a>
        </article>

        <article className="resource-section-card">
          <h2>Discovery metadata</h2>
          <p>
            Category: <strong>{resource.category}</strong>
            {' · '}
            Organism: <strong>{resource.organism}</strong>
          </p>
          <div className="resource-tags" aria-label="Resource tags">
            {resource.tags.map((tag) => (
              <span key={`${resource.slug}-${tag}`} className="resource-chip">{tag}</span>
            ))}
          </div>
          <div className="resource-actions-row">
            <Link to={`/catalog?category=${encodeURIComponent(resource.category)}`} className="inline-link">
              Find more in {resource.category}
            </Link>
            <Link to={`/catalog?license=${encodeURIComponent(resource.licenseSpdx)}`} className="inline-link">
              Explore {resource.licenseSpdx} resources
            </Link>
          </div>
        </article>
      </section>
    </main>
  )
}
