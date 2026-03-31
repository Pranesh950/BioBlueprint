export function parseFasta(content) {
  const lines = content.split(/\r?\n/)
  const records = []
  let current = null

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      continue
    }

    if (line.startsWith('>')) {
      if (current) {
        records.push(current)
      }

      const header = line.slice(1).trim()
      const [id, ...rest] = header.split(/\s+/)

      current = {
        id: id || 'unknown',
        description: rest.join(' '),
        sequence: '',
      }

      continue
    }

    if (!current) {
      throw new Error('Invalid FASTA: sequence found before header')
    }

    current.sequence += line
  }

  if (current) {
    records.push(current)
  }

  return records
}
