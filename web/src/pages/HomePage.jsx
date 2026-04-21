import { Link } from 'react-router-dom'
import projects from '../data/projects.json'

function buildCategoryGroups(resources) {
  return Object.entries(
    resources.reduce((acc, resource) => {
      if (!acc[resource.category]) {
        acc[resource.category] = []
      }

      acc[resource.category].push(resource)
      return acc
    }, {}),
  ).sort(([left], [right]) => left.localeCompare(right))
}

export default function HomePage() {
  const featuredResources = projects.filter((resource) => resource.featured).slice(0, 4)
  const categoryGroups = buildCategoryGroups(projects)
  const mitCount = projects.filter((resource) => resource.licenseSpdx === 'MIT').length
  const zeroBsdCount = projects.filter((resource) => resource.licenseSpdx === '0BSD').length

  return (
    <main className="page home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">Resource Discovery</p>
          <h1>Find reusable projects with clear licensing and attribution.</h1>
          <p className="lead">
            BioBlueprint is now a catalog-first index for discoverable project resources. Browse by category,
            filter by license, and jump directly to the original source.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/catalog">
              Browse catalog
            </Link>
            <Link className="secondary-button" to="/about">
              Submit a resource
            </Link>
          </div>
        </div>

        <aside className="home-hero-panel" aria-label="Catalog summary">
          <p className="hero-panel-eyebrow">Catalog at a glance</p>
          <dl className="hero-stats">
            <div>
              <dt>Total resources</dt>
              <dd>{projects.length}</dd>
            </div>
            <div>
              <dt>MIT resources</dt>
              <dd>{mitCount}</dd>
            </div>
            <div>
              <dt>0BSD resources</dt>
              <dd>{zeroBsdCount}</dd>
            </div>
            <div>
              <dt>Categories</dt>
              <dd>{categoryGroups.length}</dd>
            </div>
          </dl>
          <p className="hero-panel-note">
            Every listing includes a source link and attribution details so reuse decisions are fast and transparent.
          </p>
        </aside>
      </section>

      <section className="repo-list-shell">
        <header className="repo-list-head">
          <span>Featured resources</span>
          <span>{featuredResources.length} highlighted</span>
        </header>

        <div className="repo-list-body">
          {featuredResources.map((resource) => (
            <article key={resource.slug} className="repo-row">
              <div className="repo-row-main">
                <p className="repo-row-label">{resource.category}</p>
                <h2>
                  <Link to={`/resource/${resource.slug}`}>{resource.title}</Link>
                </h2>
                <p>{resource.description}</p>
                <div className="resource-meta-row">
                  <span className="repo-row-meta">{resource.licenseSpdx}</span>
                  <span className="repo-row-meta">{resource.organism}</span>
                  <span className="repo-row-meta">By {resource.attributionName}</span>
                </div>
                <div className="resource-tags" aria-label="Resource tags">
                  {resource.tags.map((tag) => (
                    <span key={`${resource.slug}-${tag}`} className="resource-chip">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="repo-row-side">
                <Link to={`/resource/${resource.slug}`} className="inline-link">View resource</Link>
                <a href={resource.sourceUrl} className="inline-link" target="_blank" rel="noreferrer">Source</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="catalog-section-grid" aria-label="Browse by category">
        {categoryGroups.map(([category, resources]) => (
          <article key={category} className="category-panel">
            <header className="category-panel-head">
              <h2>{category}</h2>
              <span>{resources.length} listed</span>
            </header>

            <ul className="category-panel-list">
              {resources.slice(0, 4).map((resource) => (
                <li key={resource.slug}>
                  <Link to={`/resource/${resource.slug}`}>{resource.title}</Link>
                  <p>{resource.licenseSpdx} · {resource.attributionName}</p>
                </li>
              ))}
            </ul>

            <Link
              className="inline-link"
              to={`/catalog?category=${encodeURIComponent(category)}`}
            >
              Explore {category.toLowerCase()} resources
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}
