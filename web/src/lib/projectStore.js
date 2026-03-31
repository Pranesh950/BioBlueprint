import JSZip from 'jszip'

const rawProjectFiles = import.meta.glob('../../projects/**/*', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const fileIndexByProject = Object.entries(rawProjectFiles).reduce(
  (acc, [fullPath, content]) => {
    const match = fullPath.match(/^\.\.\/\.\.\/projects\/([^/]+)\/(.+)$/)

    if (!match) {
      return acc
    }

    const [, slug, relativePath] = match

    if (!acc[slug]) {
      acc[slug] = []
    }

    acc[slug].push({ path: relativePath, content })
    return acc
  },
  {},
)

Object.values(fileIndexByProject).forEach((files) => {
  files.sort((a, b) => a.path.localeCompare(b.path))
})

const FOLDER_ORDER = {
  metadata: 0,
  constructs: 1,
  protocols: 2,
  data: 3,
  analysis: 4,
  results: 5,
  docs: 6,
}

const FILE_ORDER = {
  'README.md': 0,
}

function rankFolder(name) {
  return FOLDER_ORDER[name] ?? Number.MAX_SAFE_INTEGER
}

function rankFile(name) {
  return FILE_ORDER[name] ?? Number.MAX_SAFE_INTEGER
}

function sortTree(nodes) {
  return nodes.sort((a, b) => {
    if (a.type === 'folder' && b.type === 'folder') {
      const folderRankDiff = rankFolder(a.name) - rankFolder(b.name)

      if (folderRankDiff !== 0) {
        return folderRankDiff
      }

      return a.name.localeCompare(b.name)
    }

    if (a.type === 'file' && b.type === 'file') {
      const fileRankDiff = rankFile(a.name) - rankFile(b.name)

      if (fileRankDiff !== 0) {
        return fileRankDiff
      }

      return a.name.localeCompare(b.name)
    }

    // At project root, keep important files like README visible before folders.
    if (a.type !== b.type && (rankFile(a.name) === 0 || rankFile(b.name) === 0)) {
      return rankFile(a.name) - rankFile(b.name)
    }

    if (a.type !== b.type) {
      return a.type === 'folder' ? -1 : 1
    }

    return a.name.localeCompare(b.name)
  })
}

export function getProjectFiles(slug) {
  return fileIndexByProject[slug] || []
}

export function getProjectTree(slug) {
  const files = getProjectFiles(slug)
  const root = { type: 'folder', name: slug, path: '', children: [] }

  files.forEach((file) => {
    const parts = file.path.split('/')
    let cursor = root

    parts.forEach((part, index) => {
      const isLeaf = index === parts.length - 1
      const nodePath = parts.slice(0, index + 1).join('/')

      let next = cursor.children.find(
        (child) => child.name === part && child.path === nodePath,
      )

      if (!next) {
        next = isLeaf
          ? { type: 'file', name: part, path: nodePath }
          : { type: 'folder', name: part, path: nodePath, children: [] }

        cursor.children.push(next)
      }

      if (!isLeaf) {
        cursor = next
      }
    })
  })

  const sortRecursive = (node) => {
    if (node.type === 'folder') {
      node.children = sortTree(node.children)
      node.children.forEach(sortRecursive)
    }
  }

  sortRecursive(root)
  return root
}

export async function downloadProjectZip(slug) {
  const files = getProjectFiles(slug)

  if (!files.length) {
    return false
  }

  const zip = new JSZip()

  files.forEach((file) => {
    zip.file(file.path, file.content)
  })

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = `${slug}.zip`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  return true
}
