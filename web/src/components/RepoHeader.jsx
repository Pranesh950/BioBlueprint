export default function RepoHeader({ project, fileCount, onDownload }) {
  return (
    <section className="repo-header-card">
      <div className="repo-header-main">
        <p className="repo-badge">Project workspace</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </div>

      <div className="repo-header-actions">
        <div className="repo-stat-card" aria-label={`${fileCount} files tracked`}>
          <span className="repo-stat-label">Files tracked</span>
          <strong className="repo-stat-value">{fileCount}</strong>
        </div>
        <button type="button" className="primary-button" onClick={onDownload}>
          Download ZIP
        </button>
      </div>
    </section>
  )
}
