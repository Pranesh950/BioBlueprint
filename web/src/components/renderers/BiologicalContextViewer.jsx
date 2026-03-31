function toTitleCase(value) {
  return value
    .replaceAll('_', ' ')
    .replaceAll('-', ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase())
}

function parseBioContext(content) {
  const result = {
    fields: {},
    sections: [],
  }

  const lines = content.split(/\r?\n/)
  let activeSection = null

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line || line.startsWith('#')) {
      continue
    }

    const sectionMatch = line.match(/^([A-Za-z0-9 _-]+):$/)
    if (sectionMatch) {
      activeSection = {
        name: sectionMatch[1].trim(),
        fields: {},
      }
      result.sections.push(activeSection)
      continue
    }

    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()

    if (!key) {
      continue
    }

    if (activeSection) {
      activeSection.fields[key] = value
    } else {
      result.fields[key] = value
    }
  }

  return result
}

function KeyValueGrid({ fields }) {
  const entries = Object.entries(fields)

  if (!entries.length) {
    return <p className="empty-render">No values provided.</p>
  }

  return (
    <dl className="bioctx-grid">
      {entries.map(([key, value]) => (
        <div key={key} className="bioctx-item">
          <dt>{toTitleCase(key)}</dt>
          <dd>{value || '-'}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function BiologicalContextViewer({ content }) {
  const parsed = parseBioContext(content)

  return (
    <section className="bioctx-viewer">
      <header className="bioctx-header">
        <p className="bioctx-badge">Biological Context</p>
        <h2>{parsed.fields.project_title || parsed.fields.project || 'Project Context'}</h2>
        <p>
          Standardized plain-text context sheet using <strong>field: value</strong> entries for organism,
          chassis, biosafety, and deployment assumptions.
        </p>
      </header>

      <section className="bioctx-section">
        <h3>Core Context</h3>
        <KeyValueGrid fields={parsed.fields} />
      </section>

      {parsed.sections.map((section) => (
        <section key={section.name} className="bioctx-section">
          <h3>{toTitleCase(section.name)}</h3>
          <KeyValueGrid fields={section.fields} />
        </section>
      ))}
    </section>
  )
}
