import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import projects from '../data/projects.json'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const license = searchParams.get('license') || 'all'
  const category = searchParams.get('category') || 'all'
  const normalizedQuery = query.trim().toLowerCase()

  const filterOptions = useMemo(() => {
    const unique = (values) => [...new Set(values)].sort((left, right) => left.localeCompare(right))

    return {
      licenses: unique(projects.map((resource) => resource.licenseSpdx)),
      categories: unique(projects.map((resource) => resource.category)),
    }
  }, [])

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams)

    if (!value || value === 'all') {
      next.delete(key)
    } else {
      next.set(key, value)
    }

    setSearchParams(next)
  }

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesLicense = license === 'all' || project.licenseSpdx === license
      const matchesCategory = category === 'all' || project.category === category

      const haystack = `${project.title} ${project.description} ${project.slug} ${project.category} ${project.licenseSpdx} ${(project.tags || []).join(' ')}`.toLowerCase()
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery)

      return matchesLicense && matchesCategory && matchesQuery
    })
  }, [category, license, normalizedQuery])

  const hasActiveFilters = Boolean(query || license !== 'all' || category !== 'all')

  const resetFilters = () => {
    if (query) {
      setSearchParams({ q: query })
      return
    }

    setSearchParams({})
  }

  return (
    <main className="page search-page">
      <section className="search-header">
        <p className="eyebrow">Catalog</p>
        <h1>Discover resources</h1>
        <p>
          {query
            ? `Showing matches for "${query}" with your active filters.`
            : 'Use category and license filters to narrow the catalog.'}
        </p>
        <p className="result-meta">{filteredProjects.length} results from {projects.length} indexed resources</p>
      </section>

      <section className="catalog-filter-shell" aria-label="Catalog filters">
        <div className="catalog-filter-grid">
          <label className="filter-field" htmlFor="license-filter">
            <span>License</span>
            <select
              id="license-filter"
              value={license}
              onChange={(event) => updateFilter('license', event.target.value)}
            >
              <option value="all">All licenses</option>
              {filterOptions.licenses.map((licenseOption) => (
                <option key={licenseOption} value={licenseOption}>{licenseOption}</option>
              ))}
            </select>
          </label>

          <label className="filter-field" htmlFor="category-filter">
            <span>Category</span>
            <select
              id="category-filter"
              value={category}
              onChange={(event) => updateFilter('category', event.target.value)}
            >
              <option value="all">All categories</option>
              {filterOptions.categories.map((categoryOption) => (
                <option key={categoryOption} value={categoryOption}>{categoryOption}</option>
              ))}
            </select>
          </label>

        </div>

        {hasActiveFilters ? (
          <button type="button" className="secondary-button" onClick={resetFilters}>
            Clear filters
          </button>
        ) : null}
      </section>

      <section className="repo-list-shell result-list">
        <header className="repo-list-head">
          <span>Resource catalog</span>
          <span>{filteredProjects.length} shown</span>
        </header>

        {filteredProjects.length > 0 ? (
          <div className="repo-list-body">
            {filteredProjects.map((project) => (
              <article key={project.slug} className="repo-row">
                {project.imageUrl && (
                  <div className="repo-row-image">
                    <img src={project.imageUrl} alt={project.title} />
                  </div>
                )}
                <div className="repo-row-main">
                  <p className="repo-row-label">{project.category}</p>
                  <h2>
                    <Link to={`/resource/${project.slug}`}>{project.title}</Link>
                  </h2>
                  <p>{project.description}</p>
                  <div className="resource-meta-row">
                    <span className="repo-row-meta">{project.licenseSpdx}</span>
                  </div>
                </div>

                <div className="repo-row-side">
                  <Link to={`/resource/${project.slug}`} className="inline-link">View resource</Link>
                  <a href={project.sourceUrl} className="inline-link" target="_blank" rel="noreferrer">Source</a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No matching resources yet</h2>
            <p>Try a broader keyword or clear one of the active filters.</p>
            <button type="button" className="secondary-button" onClick={resetFilters}>Reset filters</button>
          </div>
        )}
      </section>
    </main>
  )
}
