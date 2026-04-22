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
  const permissiveLicenseCount = projects.filter((resource) => ['MIT', 'BSD-3-Clause', 'Apache-2.0'].includes(resource.licenseSpdx)).length
  const workflowCount = projects.filter((resource) => resource.category === 'Workflow').length

  return (
    <main className="page home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">Scientist-Curated Catalog</p>
          <h1>Find reputable bioinformatics projects with clear reuse rights.</h1>
          <p className="lead">
            BioBlueprint indexes actively used open-source projects for analysis, workflows, and genomics tooling.
            Each listing is focused on scientific utility, then linked directly to the canonical repository.
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
              <dt>Permissive licenses</dt>
              <dd>{permissiveLicenseCount}</dd>
            </div>
            <div>
              <dt>Workflow tools</dt>
              <dd>{workflowCount}</dd>
            </div>
            <div>
              <dt>Categories</dt>
              <dd>{categoryGroups.length}</dd>
            </div>
          </dl>
          <p className="hero-panel-note">
            Learning-only repositories are intentionally excluded to keep the catalog focused on production scientific work.
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
                  <p>{resource.description}</p>
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
