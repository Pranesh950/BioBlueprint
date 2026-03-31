export default function RepoHeader({ project, fileCount, onDownload }) {
  return (
    <section className="repo-header-card">
      <div>
        <p className="repo-badge">Repository</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </div>

      <div className="repo-header-actions">
        <span className="repo-stat">{fileCount} files</span>
        <button type="button" className="primary-button" onClick={onDownload}>
          Download ZIP
        </button>
      </div>
    </section>
  )
}
