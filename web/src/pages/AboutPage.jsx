import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <main className="page about-page">
      <section className="about-hero">
        <p className="eyebrow">About</p>
        <h1>Bioforge helps people share bio projects clearly</h1>
        <p className="lead">
          The goal is simple: upload your project in a clean structure so someone else can understand it and repeat it.
        </p>
      </section>

      <section className="about-section">
        <h2>What this site is for</h2>
        <ul>
          <li>Sharing one project in one place.</li>
          <li>Keeping protocols, constructs, data, and notes together.</li>
          <li>Making your work easy for other people to follow.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>How to add your project to this repo</h2>
        <ol>
          <li>
            Go to the GitHub repository:
            <a href="https://github.com/Pranesh950/bioengineeringhub" target="_blank" rel="noreferrer"> github.com/Pranesh950/bioengineeringhub</a>
          </li>
          <li>Make a new project folder in <code>web/projects/your-project-slug</code>.</li>
          <li>Add your files and folders inside that project folder (README, protocols, constructs, data, docs, and so on).</li>
          <li>
            Add your project to <code>web/src/data/projects.json</code> with:
            <code>slug</code>, <code>title</code>, and <code>description</code>.
          </li>
          <li>Make sure the <code>slug</code> in <code>projects.json</code> exactly matches your folder name.</li>
          <li>Commit your changes and open a Pull Request.</li>
        </ol>
      </section>

      <section className="about-section">
        <h2>How your project appears in search</h2>
        <p>
          Search results come from <code>web/src/data/projects.json</code>.
          If your project is not in that file, it will not show in the search page.
        </p>
        <p>
          Your entry in <code>projects.json</code> and your folder in <code>web/projects/</code> both need to exist.
        </p>
      </section>

      <section className="about-section">
        <h2>Use the E. coli example first</h2>
        <p>
          Before adding your project, review
          <Link to="/project/ecoli-gfp-expression-demo"> the E. coli GFP Expression Demo</Link>
          and copy its structure style.
        </p>
      </section>
    </main>
  )
}
