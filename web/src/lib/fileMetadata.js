import { detectCodeLanguage, detectFileKind } from './fileTypes'

export function formatBytes(byteCount) {
  if (!byteCount) {
    return '0 B'
  }

  const units = ['B', 'KB', 'MB', 'GB']
  const index = Math.min(Math.floor(Math.log(byteCount) / Math.log(1024)), units.length - 1)
  const value = byteCount / 1024 ** index
  const precision = value >= 10 ? 0 : 1

  return `${value.toFixed(precision)} ${units[index]}`
}

export function buildFileMetadata(path, content) {
  const kind = detectFileKind(path)
  const language = detectCodeLanguage(path)
  const lines = content ? content.split(/\r?\n/).length : 0
  const bytes = content ? new Blob([content]).size : 0

  return {
    kind,
    language,
    lines,
    bytes,
    displayBytes: formatBytes(bytes),
  }
}
