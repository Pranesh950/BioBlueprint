export default function RepoHeader({ project }) {
  return (
    <section className="repo-header-card">
      <div className="repo-header-main">
        <p className="repo-badge">Scientific resource</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </div>

      <div className="repo-header-actions">
        <a href={project.sourceUrl} className="primary-button" target="_blank" rel="noreferrer">
          Open source repository
        </a>
      </div>
    </section>
  )
}
