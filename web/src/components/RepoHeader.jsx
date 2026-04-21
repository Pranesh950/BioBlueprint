export default function RepoHeader({ project }) {
  return (
    <section className="repo-header-card">
      <div className="repo-header-main">
        <p className="repo-badge">Resource profile</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <div className="resource-meta-row">
          <span className="repo-row-meta">{project.licenseSpdx}</span>
          <span className="repo-row-meta">{project.category}</span>
          <span className="repo-row-meta">{project.organism}</span>
          <span className="repo-row-meta">By {project.attributionName}</span>
        </div>
      </div>

      <div className="repo-header-actions">
        <a href={project.sourceUrl} className="primary-button" target="_blank" rel="noreferrer">
          Open source
        </a>
        <a href={project.attributionUrl} className="secondary-button" target="_blank" rel="noreferrer">
          Attribution: {project.attributionName}
        </a>
      </div>
    </section>
  )
}
