import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <main className="page about-page">
      <section className="about-hero">
        <p className="eyebrow">About BioBlueprint</p>
        <h1>A discovery catalog for reusable project resources.</h1>
        <p className="lead">
          Curated open-source tools. Each has source, license, and clear attribution.
        </p>

        <div className="about-hero-chips" aria-label="Supported project assets">
          <span>MIT Resources</span>
          <span>BSD-3-Clause Resources</span>
          <span>Apache-2.0 Resources</span>
          <span>Scientist Curated</span>
          <span>Source Linked</span>
          <span>Facet Search</span>
          <span>Category Discovery</span>
        </div>
      </section>

      <section className="about-grid">
        <article className="about-section">
          <h2>What this catalog lists</h2>
          <p>
            Tools for genomics, analysis, and workflows. Browse by license or category.
          </p>
        </article>

        <article className="about-section">
          <h2>Attribution and licensing policy</h2>
          <p>
            All entries have source links, license, and attribution. SPDX licenses verified.
          </p>
        </article>
      </section>

      <section className="about-section">
        <h2>How to submit a resource</h2>
        <p>
          Edit <code>web/src/data/projects.json</code> and submit a PR. Questions? Email pranesh.shivaraj.k@gmail.com.
        </p>
      </section>

      <section className="about-section">
        <h2>Before you publish</h2>
        <p>
          Verify license, attribution, and source links before submitting.
        </p>
      </section>
    </main>
  )
}
