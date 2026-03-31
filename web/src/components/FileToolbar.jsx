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
      <div className="file-breadcrumb">
        <span>projects</span>
        {segments.map((segment) => (
          <span key={segment.path} className={segment.isLast ? 'active-segment' : ''}>
            / {segment.label}
          </span>
        ))}
      </div>

      <div className="file-toolbar-meta">
        <span>{metadata.language}</span>
        <span>{metadata.lines} lines</span>
        <span>{metadata.displayBytes}</span>
      </div>
    </header>
  )
}
