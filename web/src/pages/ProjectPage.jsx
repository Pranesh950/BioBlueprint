import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText, FileCode2, Image as ImageIcon, Database, File as FileIcon, FileJson, Table } from 'lucide-react'
import projects from '../data/projects.json'
import { buildFileMetadata } from '../lib/fileMetadata'
import { downloadProjectZip, getProjectFiles, getProjectTree } from '../lib/projectStore'
import FileToolbar from '../components/FileToolbar'
import FileRenderer from '../components/FileRenderer'
import RepoHeader from '../components/RepoHeader'

function getFileIcon(name) {
  const ext = name.split('.').pop().toLowerCase()
  switch (ext) {
    case 'md':
    case 'txt':
      return <FileText className="tree-icon" size={16} />
    case 'js':
    case 'jsx':
    case 'py':
    case 'ts':
    case 'html':
    case 'css':
      return <FileCode2 className="tree-icon" size={16} />
    case 'json':
      return <FileJson className="tree-icon" size={16} />
    case 'csv':
    case 'tsv':
      return <Table className="tree-icon" size={16} />
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'svg':
      return <ImageIcon className="tree-icon" size={16} />
    case 'db':
      return <Database className="tree-icon" size={16} />
    default:
      return <FileIcon className="tree-icon" size={16} />
  }
}

function collectFolderPaths(node, setRef) {
  if (node.type !== 'folder') {
    return
  }

  if (node.path) {
    setRef.add(node.path)
  }

  node.children.forEach((child) => collectFolderPaths(child, setRef))
}

function FileTree({ node, expandedFolders, onToggleFolder, onSelectFile, activeFile }) {
  if (node.type === 'file') {
    return (
      <li>
        <button
          type="button"
          className={`tree-file ${activeFile === node.path ? 'active' : ''}`}
          onClick={() => onSelectFile(node.path)}
        >
          {getFileIcon(node.name)}
          <span className="tree-text">{node.name}</span>
        </button>
      </li>
    )
  }

  const isExpanded = node.path ? expandedFolders.has(node.path) : true

  return (
    <li>
      {node.path ? (
        <button
          type="button"
          className="tree-folder"
          onClick={() => onToggleFolder(node.path)}
        >
          {isExpanded ? <ChevronDown className="tree-chevron" size={16} /> : <ChevronRight className="tree-chevron" size={16} />}
          {isExpanded ? <FolderOpen className="tree-icon" size={16} /> : <Folder className="tree-icon" size={16} />}
          <span className="tree-text">{node.name}</span>
        </button>
      ) : (
        <p className="tree-root">{node.name}</p>
      )}

      {isExpanded && node.children.length > 0 ? (
        <ul>
          {node.children.map((child) => (
            <FileTree
              key={child.path}
              node={child}
              expandedFolders={expandedFolders}
              onToggleFolder={onToggleFolder}
              onSelectFile={onSelectFile}
              activeFile={activeFile}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const projectMeta = projects.find((project) => project.slug === slug)
  const files = useMemo(() => getProjectFiles(slug), [slug])
  const tree = useMemo(() => getProjectTree(slug), [slug])
  const [selectedFile, setSelectedFile] = useState('')
  const [expandedFolders, setExpandedFolders] = useState(new Set())

  useEffect(() => {
    const initialFolders = new Set()
    collectFolderPaths(tree, initialFolders)
    setExpandedFolders(initialFolders)
    setSelectedFile(files[0]?.path || '')
  }, [tree, files])

  const selectedEntry = files.find((file) => file.path === selectedFile)
  const selectedContent = selectedEntry?.content
  const metadata = buildFileMetadata(selectedFile, selectedContent)
  const availableFilePaths = useMemo(() => new Set(files.map((file) => file.path)), [files])

  const onOpenFile = (path) => {
    if (availableFilePaths.has(path)) {
      setSelectedFile(path)
    }
  }

  if (!projectMeta) {
    return (
      <main className="page project-page">
        <h1>Project Not Found</h1>
        <p>The requested project does not exist in the index JSON.</p>
        <Link to="/search">Back to search</Link>
      </main>
    )
  }

  const toggleFolder = (path) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev)

      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }

      return next
    })
  }

  return (
    <main className="page repo-page">
      <RepoHeader
        project={projectMeta}
        fileCount={files.length}
        onDownload={() => downloadProjectZip(slug)}
      />

      <section className="repo-layout">
        <aside className="repo-sidebar tree-panel">
          {files.length ? (
            <ul className="tree-list">
              <FileTree
                node={tree}
                expandedFolders={expandedFolders}
                onToggleFolder={toggleFolder}
                onSelectFile={setSelectedFile}
                activeFile={selectedFile}
              />
            </ul>
          ) : (
            <p>No files found in this project folder.</p>
          )}
        </aside>

        <section className="repo-main">
          <FileToolbar selectedFile={selectedFile} metadata={metadata} />

          <article className="file-viewer">
            <div className="file-content">
              <FileRenderer
                selectedFile={selectedFile}
                content={selectedContent}
                onOpenFile={onOpenFile}
                availableFiles={availableFilePaths}
              />
            </div>
          </article>
        </section>
      </section>
    </main>
  )
}
