import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <main className="page about-page">
      <section className="about-hero">
        <p className="eyebrow">About BioBlueprint</p>
        <h1>A discovery catalog for reusable project resources.</h1>
        <p className="lead">
          BioBlueprint focuses on discoverability. Every listing is designed to quickly answer what a resource is,
          who to credit, which license applies, and where the canonical source lives.
        </p>

        <div className="about-hero-chips" aria-label="Supported project assets">
          <span>MIT Resources</span>
          <span>0BSD Resources</span>
          <span>Attribution First</span>
          <span>Source Linked</span>
          <span>Facet Search</span>
          <span>Category Discovery</span>
        </div>
      </section>

      <section className="about-grid">
        <article className="about-section">
          <h2>What this catalog lists</h2>
          <p>
            We index repositories and project resources relevant to bioengineering workflows, learning, analysis,
            visualization, and synthetic biology. Listings can be narrow utilities or larger reference collections.
          </p>
          <p>
            Browse everything from the <Link to="/catalog">catalog page</Link>, then filter by license,
            category, organism context, and tags.
          </p>
        </article>

        <article className="about-section">
          <h2>Attribution and licensing policy</h2>
          <p>
            Each listed resource must include attribution and a canonical source URL. MIT and 0BSD listings are
            supported, and the exact license should be represented with an SPDX identifier and license link.
          </p>
          <ul className="project-structure-list">
            <li>Required: attribution name, source repository URL, license badge, and license link.</li>
            <li>Recommended: category, organism context, and descriptive tags.</li>
            <li>Expected: metadata should match what the original repository publishes.</li>
          </ul>
        </article>
      </section>

      <section className="about-section">
        <h2>How to submit a resource</h2>
        <p>
          Submit with complete metadata so discovery, attribution, and reuse checks are easy for everyone:
        </p>
        <ol>
          <li>
            Pick a unique slug and title for your listing.
          </li>
          <li>
            Include canonical attribution and source references from the original project owner.
          </li>
          <li>
            Add a catalog entry to <code>web/src/data/projects.json</code> using this shape:
            <pre className="json-snippet">{`{
  "slug": "resource-slug",
  "title": "Resource Title",
  "description": "Clear one-sentence summary",
  "category": "Toolkit",
  "organism": "General",
  "licenseSpdx": "MIT",
  "licenseName": "MIT License",
  "licenseUrl": "https://opensource.org/license/mit/",
  "attributionName": "owner-or-team",
  "attributionUrl": "https://github.com/owner",
  "sourceUrl": "https://github.com/owner/repo",
  "tags": ["example", "resource"]
}`}</pre>
          </li>
          <li>
            Verify the license and attribution fields against the source repository before opening a pull request.
          </li>
        </ol>
        <p>
          Need help submitting or correcting attribution? Email pranesh.shivaraj.k@gmail.com.
        </p>
      </section>

      <section className="about-section">
        <h2>Before you publish</h2>
        <p>
          Confirm that license labels, attribution names, and source links are accurate. This keeps the catalog
          trustworthy and makes reuse safe for everyone.
        </p>
      </section>
    </main>
  )
}
