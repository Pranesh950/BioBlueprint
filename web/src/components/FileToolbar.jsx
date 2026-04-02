function getBreadcrumbSegments(path) {
  if (!path) {
    return []
  }

  const parts = path.split('/')

  return parts.map((part, index) => ({
    label: part,
    path: parts.slice(0, index + 1).join('/'),
    isLast: index === parts.length - 1,
  }))
}

export default function FileToolbar({ selectedFile, metadata }) {
  const segments = getBreadcrumbSegments(selectedFile)

  return (
    <header className="file-toolbar">
      <div className="file-toolbar-label">
        <span className="toolbar-label-pill">File path</span>
        <div className="file-breadcrumb">
          <span className="breadcrumb-segment">projects</span>
          {segments.map((segment) => (
            <span key={segment.path} className={`breadcrumb-segment${segment.isLast ? ' active-segment' : ''}`}>
              <span className="breadcrumb-separator">/</span>
              {segment.label}
            </span>
          ))}
        </div>
      </div>

      <div className="file-toolbar-meta">
        <span className="meta-chip">{metadata.language}</span>
        <span className="meta-chip">{metadata.lines} lines</span>
        <span className="meta-chip">{metadata.displayBytes}</span>
      </div>
    </header>
  )
}
