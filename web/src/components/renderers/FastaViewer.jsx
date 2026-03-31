import { useMemo, useState } from 'react'
import { SeqViz } from 'seqviz'
import { fastaToJson } from '@teselagen/bio-parsers'
import CodeViewer from './CodeViewer'

function gcContent(sequence) {
  if (!sequence.length) {
    return 0
  }

  const gc = (sequence.match(/[GC]/gi) || []).length
  return (gc / sequence.length) * 100
}

export default function FastaViewer({ content }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const parsed = useMemo(() => {
    try {
      const records = fastaToJson(content)
        .map((record) => record.parsedSequence)
        .filter((record) => record?.sequence)

      if (!records.length) {
        return { records: [], error: 'No FASTA records found' }
      }

      return { records, error: null }
    } catch (error) {
      return { records: [], error: error instanceof Error ? error.message : 'Failed to parse FASTA file' }
    }
  }, [content])

  if (parsed.error) {
    return (
      <div className="bio-viewer">
        <p className="bio-error">Could not parse FASTA file: {parsed.error}</p>
        <CodeViewer content={content} language="plaintext" />
      </div>
    )
  }

  const activeRecord = parsed.records[selectedIndex] || parsed.records[0]

  return (
    <div className="bio-viewer fasta-viewer">
      <div className="fasta-header-row">
        <div>
          <h3>Records ({parsed.records.length})</h3>
          <p className="muted">Select a sequence to inspect.</p>
        </div>
        <select
          value={selectedIndex}
          onChange={(event) => setSelectedIndex(Number(event.target.value))}
          className="bio-select"
          aria-label="Select FASTA record"
        >
          {parsed.records.map((record, index) => (
            <option key={`${record.name || 'record'}-${index}`} value={index}>
              {record.name || `Record ${index + 1}`} ({record.sequence.length} bp)
            </option>
          ))}
        </select>
      </div>

      <div className="bio-overview-grid">
        <p><strong>ID:</strong> {activeRecord.name || '-'}</p>
        <p><strong>Length:</strong> {activeRecord.sequence.length.toLocaleString()} bp</p>
        <p><strong>Topology:</strong> {activeRecord.circular ? 'circular' : 'linear'}</p>
        <p><strong>GC:</strong> {gcContent(activeRecord.sequence).toFixed(1)}%</p>
      </div>

      <div className="seqviz-shell">
        <SeqViz
          name={activeRecord.name || 'sequence'}
          seq={activeRecord.sequence}
          viewer={activeRecord.circular ? 'circular' : 'linear'}
          style={{ height: '320px', width: '100%' }}
          showComplement
          showIndex
        />
      </div>

      <details>
        <summary>Raw sequence</summary>
        <CodeViewer content={activeRecord.sequence} language="plaintext" />
      </details>
    </div>
  )
}
