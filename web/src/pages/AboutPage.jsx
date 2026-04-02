import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <main className="page about-page">
      <section className="about-hero">
        <p className="eyebrow">About BioBlueprint</p>
        <h1>One place for complete bioengineering projects.</h1>
        <p className="lead">
          Most teams split work across different tools and lose reproducibility. BioBlueprint keeps protocols, code,
          sequence files, CAD/STL, data, and results together in one open project workspace.
        </p>

        <div className="about-hero-chips" aria-label="Supported project assets">
          <span>Protocols</span>
          <span>Code</span>
          <span>GenBank / FASTA</span>
          <span>CAD / STL</span>
          <span>Raw Data</span>
          <span>Results</span>
        </div>
      </section>

      <section className="about-grid">
        <article className="about-section">
          <h2>Why existing platforms fall short</h2>
          <ul>
            <li><strong>GitHub</strong> is excellent for code, but not for complete wet-lab context by itself.</li>
            <li><strong>Benchling</strong> is strong for notebooks and sequences, but not an open project collaboration hub.</li>
            <li><strong>Data repositories</strong> store files but do not offer a clean project workflow.</li>
            <li><strong>Drive folders</strong> turn into version confusion fast.</li>
          </ul>
          <p>
            In practice, teams end up stitching together code in one place, sequence files in another, and protocols somewhere else.
          </p>
        </article>

        <article className="about-section">
          <h2>What BioBlueprint adds</h2>
          <ul>
            <li>Open, forkable project structure on GitHub</li>
            <li>Single workspace for protocols, data, and analysis</li>
            <li>Native support for common biological file formats</li>
            <li>Clear onboarding path for contributors</li>
          </ul>
          <p>
            The result is simple: one project, one source of truth, and fewer reproducibility gaps.
          </p>
        </article>
      </section>

      <section className="about-section">
        <h2>How to add your project</h2>
        <p>
          Publishing here is straightforward:
        </p>
        <ol>
          <li>
            Fork the <a href="https://github.com/Pranesh950/BioBlueprint" target="_blank" rel="noreferrer">BioBlueprint repository</a> on GitHub.
          </li>
          <li>
            Create a folder for your project in <code>web/projects/your-project-name</code>. Choose a short, descriptive slug (no spaces).
          </li>
          <li>
            Organize your files inside that folder. There's no strict structure, but we recommend:
            <ul className="project-structure-list">
              <li><code>README.md</code> — overview and key findings</li>
              <li><code>protocols/</code> — step-by-step instructions</li>
              <li><code>constructs/</code> — sequences, plasmid maps, GenBank files</li>
              <li><code>data/</code> — raw measurements, datasets</li>
              <li><code>analysis/</code> — scripts, Jupyter notebooks</li>
              <li><code>results/</code> — figures, processed data</li>
              <li><code>docs/</code> — additional context, notes</li>
            </ul>
          </li>
          <li>
            Add a quick entry to <code>web/src/data/projects.json</code>:
            <pre className="json-snippet">{`{
  "slug": "your-project-name",
  "title": "Your Project Title",
  "description": "One sentence about what you did"
}`}</pre>
          </li>
          <li>
            Make sure the <code>slug</code> matches your folder name exactly.
          </li>
          <li>
            Commit and open a pull request. We'll review and merge it.
          </li>
        </ol>
      </section>

      <section className="about-section">
        <h2>Use the demo as your template</h2>
        <p>
          Start with the <Link to="/project/ecoli-gfp-expression-demo">E. coli GFP Expression Demo</Link>. It shows a complete,
          reproducible structure from protocols to results. You can adapt the structure to your own organism,
          hardware, or workflow.
        </p>
      </section>
    </main>
  )
}
