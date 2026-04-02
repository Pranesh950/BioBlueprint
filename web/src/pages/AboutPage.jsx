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
          <p>
            Researchers end up bouncing between GitHub for code, Benchling for sequences, Drive for data, and emails for protocols.
            It's fragmented and hard to reproduce.
          </p>
        </article>

        <article className="about-section">
          <h2>What BioBlueprint does</h2>
          <p>
            Everything lives together: protocols, sequences, data, analysis code, and results. Push to GitHub, share a link, and others can fork your entire project.
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
        </ol>
        <p>
          If you want help adding your project, or you're not comfortable using GitHub, email me at pranesh.shivaraj.k@gmail.com
        </p>
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
