function parseCsvLine(line) {
  const values = []
  let current = ''
  let inQuotes = false

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index]
    const nextChar = line[index + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"'
        index += 1
      } else {
        inQuotes = !inQuotes
      }

      continue
    }

    if (char === ',' && !inQuotes) {
      values.push(current.trim())
      current = ''
      continue
    }

    current += char
  }

  values.push(current.trim())
  return values
}

export default function CsvViewer({ content }) {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (!lines.length) {
    return <p className="empty-render">CSV file is empty.</p>
  }

  const [headerRow, ...bodyRows] = lines.map(parseCsvLine)

  return (
    <div className="csv-viewer">
      <table>
        <thead>
          <tr>
            {headerRow.map((heading, index) => (
              <th key={`${heading}-${index}`}>{heading || `Column ${index + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {headerRow.map((_, colIndex) => (
                <td key={`cell-${rowIndex}-${colIndex}`}>{row[colIndex] || '-'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
