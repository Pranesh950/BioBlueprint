const EXTENSION_MAP = {
  md: 'markdown',
  markdown: 'markdown',
  json: 'json',
  csv: 'csv',
  gb: 'genbank',
  gbk: 'genbank',
  dna: 'dna',
  fasta: 'fasta',
  fa: 'fasta',
  py: 'code',
  sh: 'code',
  bash: 'code',
  js: 'code',
  jsx: 'code',
  ts: 'code',
  tsx: 'code',
  txt: 'text',
  yml: 'text',
  yaml: 'text',
  toml: 'text',
}

export function getFileExtension(path) {
  const parts = path.split('.')

  if (parts.length < 2) {
    return ''
  }

  return parts[parts.length - 1].toLowerCase()
}

export function detectFileKind(path) {
  const normalized = path.toLowerCase()

  if (normalized.includes('biological-context.')) {
    return 'biological-context'
  }

  const extension = getFileExtension(path)
  return EXTENSION_MAP[extension] || 'text'
}

export function detectCodeLanguage(path) {
  const extension = getFileExtension(path)

  const languageMap = {
    py: 'python',
    sh: 'bash',
    bash: 'bash',
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    json: 'json',
    yml: 'yaml',
    yaml: 'yaml',
    md: 'markdown',
    csv: 'plaintext',
    gb: 'plaintext',
    gbk: 'plaintext',
    dna: 'plaintext',
    fasta: 'plaintext',
    fa: 'plaintext',
    txt: 'plaintext',
  }

  return languageMap[extension] || 'plaintext'
}
