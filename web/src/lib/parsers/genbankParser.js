function parseLocus(line) {
  const parts = line.trim().split(/\s+/)

  if (parts.length < 3) {
    return { raw: line.trim() }
  }

  return {
    name: parts[1],
    length: Number.parseInt(parts[2], 10) || null,
    raw: line.trim(),
  }
}

function pushFeature(features, currentFeature) {
  if (currentFeature) {
    features.push(currentFeature)
  }
}

export function parseGenBank(content) {
  const lines = content.split(/\r?\n/)
  const record = {
    locus: null,
    definition: '',
    accession: '',
    version: '',
    source: '',
    organism: '',
    features: [],
    sequence: '',
  }

  let section = 'header'
  let definitionLines = []
  let sourceLines = []
  let currentFeature = null

  for (const line of lines) {
    if (line.startsWith('LOCUS')) {
      record.locus = parseLocus(line)
      continue
    }

    if (line.startsWith('DEFINITION')) {
      section = 'definition'
      definitionLines = [line.replace('DEFINITION', '').trim()]
      continue
    }

    if (section === 'definition') {
      if (/^[A-Z][A-Z0-9_\- ]+/.test(line) && !line.startsWith(' ')) {
        section = 'header'
      } else {
        definitionLines.push(line.trim())
        continue
      }
    }

    if (line.startsWith('ACCESSION')) {
      record.accession = line.replace('ACCESSION', '').trim()
      continue
    }

    if (line.startsWith('VERSION')) {
      record.version = line.replace('VERSION', '').trim()
      continue
    }

    if (line.startsWith('SOURCE')) {
      section = 'source'
      sourceLines = [line.replace('SOURCE', '').trim()]
      continue
    }

    if (section === 'source') {
      if (line.trim().startsWith('ORGANISM')) {
        record.organism = line.replace('ORGANISM', '').trim()
        continue
      }

      if (/^[A-Z][A-Z0-9_\- ]+/.test(line) && !line.startsWith(' ')) {
        section = 'header'
      } else {
        sourceLines.push(line.trim())
        continue
      }
    }

    if (line.startsWith('FEATURES')) {
      section = 'features'
      continue
    }

    if (line.startsWith('ORIGIN')) {
      section = 'sequence'
      pushFeature(record.features, currentFeature)
      currentFeature = null
      continue
    }

    if (section === 'features') {
      if (/^\s{5}\S/.test(line)) {
        pushFeature(record.features, currentFeature)
        const featureText = line.trim()
        const firstSpace = featureText.search(/\s+/)
        const type = firstSpace === -1 ? featureText : featureText.slice(0, firstSpace)
        const location = firstSpace === -1 ? '' : featureText.slice(firstSpace).trim()

        currentFeature = {
          type,
          location,
          qualifiers: {},
        }

        continue
      }

      const qualifierMatch = line.match(/^\s+\/(\w+)=?(.*)$/)

      if (qualifierMatch && currentFeature) {
        const [, key, valueRaw] = qualifierMatch
        const value = valueRaw.trim().replace(/^"|"$/g, '')

        if (!currentFeature.qualifiers[key]) {
          currentFeature.qualifiers[key] = []
        }

        currentFeature.qualifiers[key].push(value)
      }

      continue
    }

    if (section === 'sequence') {
      if (line.startsWith('//')) {
        break
      }

      const sequencePart = line.replace(/[0-9\s]/g, '')
      record.sequence += sequencePart
    }
  }

  record.definition = definitionLines.join(' ').trim()
  record.source = sourceLines.join(' ').trim()

  return record
}
