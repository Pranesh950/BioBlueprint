import { useEffect, useMemo, useState } from 'react'
import { SeqViz } from 'seqviz'
import { snapgeneToJson } from '@teselagen/bio-parsers'
import CodeViewer from './CodeViewer'

function getFeatureColor(feature) {
  const maybeColor = feature.notes?.ApEinfo_fwdcolor?.[0]

  if (typeof maybeColor === 'string' && maybeColor.trim()) {
    return maybeColor
  }

  return '#7a8591'
}

function toSeqVizFeature(feature) {
  return {
    start: feature.start,
    end: feature.end + 1,
    name: feature.name || feature.type,
    direction: feature.strand === -1 ? -1 : 1,
    color: getFeatureColor(feature),
  }
}

function gcContent(sequence) {
  if (!sequence.length) {
    return 0
  }

  const gc = (sequence.match(/[GC]/gi) || []).length
  return (gc / sequence.length) * 100
}

function QualifierList({ notes }) {
  const entries = Object.entries(notes || {})

  if (!entries.length) {
    return <span>-</span>
  }

  return (
    <ul className="qualifier-list">
      {entries.map(([key, values]) => (
        <li key={key}>
          <strong>{key}:</strong> {Array.isArray(values) ? values.join('; ') : String(values)}
        </li>
      ))}
    </ul>
  )
}

function toBinaryBlob(content) {
  const bytes = Uint8Array.from(content, (char) => char.charCodeAt(0) & 0xff)
  return new Blob([bytes], { type: 'application/octet-stream' })
}

export default function DnaViewer({ content }) {
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null)
  const [isParsing, setIsParsing] = useState(true)
  const [parseError, setParseError] = useState(null)
  const [record, setRecord] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function parseSnapGene() {
      setIsParsing(true)
      setParseError(null)
      setRecord(null)
      setSelectedFeatureIndex(null)

      try {
        const fileBlob = toBinaryBlob(content)
        const records = await snapgeneToJson(fileBlob, { fileName: 'sequence.dna' })
        const parsed = records?.[0]?.parsedSequence

        if (!parsed?.sequence) {
          throw new Error('No sequence found in .dna file')
        }

        if (!cancelled) {
          setRecord(parsed)
        }
      } catch (error) {
        if (!cancelled) {
          setParseError(error instanceof Error ? error.message : 'Failed to parse .dna file')
        }
      } finally {
        if (!cancelled) {
          setIsParsing(false)
        }
      }
    }

    parseSnapGene()

    return () => {
      cancelled = true
    }
  }, [content])

  const features = useMemo(() => record?.features || [], [record])
  const annotations = useMemo(() => features.map(toSeqVizFeature), [features])

  if (isParsing) {
    return <p className="empty-render">Parsing SnapGene .dna file...</p>
  }

  if (parseError || !record) {
    return (
      <div className="bio-viewer">
        <p className="bio-error">Could not parse .dna file: {parseError || 'Unknown parse error'}</p>
        <CodeViewer content={content} language="plaintext" />
      </div>
    )
  }

  const selectedFeature =
    selectedFeatureIndex !== null && features[selectedFeatureIndex]
      ? features[selectedFeatureIndex]
      : null

  const selection = selectedFeature
    ? {
        start: selectedFeature.start,
        end: selectedFeature.end + 1,
        clockwise: true,
      }
    : undefined

  const handleSelection = (nextSelection) => {
    if (nextSelection?.annotation) {
      const selectedIndex = annotations.findIndex(
        (annotation) =>
          annotation.start === nextSelection.annotation.start && annotation.end === nextSelection.annotation.end,
      )

      if (selectedIndex >= 0) {
        setSelectedFeatureIndex(selectedIndex)
      }
    }
  }

  return (
    <div className="bio-viewer">
      <div className="bio-overview-grid">
        <p><strong>Locus:</strong> {record.name || '-'}</p>
        <p><strong>Length:</strong> {record.sequence.length.toLocaleString()} bp</p>
        <p><strong>Topology:</strong> {record.circular ? 'circular' : 'linear'}</p>
        <p><strong>GC:</strong> {gcContent(record.sequence).toFixed(1)}%</p>
        <p><strong>Features:</strong> {features.length}</p>
        <p><strong>Primers:</strong> {(record.primers || []).length}</p>
        <p className="bio-wide"><strong>Definition:</strong> {record.definition || 'SnapGene sequence'}</p>
      </div>

      <div className="seqviz-shell">
        <SeqViz
          name={record.name || 'sequence'}
          seq={record.sequence}
          annotations={annotations}
          primers={(record.primers || []).map(toSeqVizFeature)}
          viewer="both"
          selection={selection}
          onSelection={handleSelection}
          style={{ height: '420px', width: '100%' }}
          showComplement
          showIndex
        />
      </div>

      <div className="genbank-grid">
        <div className="genbank-feature-table">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Range</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => {
                const isSelected = index === selectedFeatureIndex

                return (
                  <tr
                    key={`${feature.type}-${feature.start}-${feature.end}-${index}`}
                    className={isSelected ? 'row-selected' : ''}
                    onClick={() => setSelectedFeatureIndex(index)}
                  >
                    <td>{feature.type}</td>
                    <td>{feature.name || '-'}</td>
                    <td>
                      {feature.start + 1}..{feature.end + 1}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <aside className="genbank-detail-panel">
          <h3>Selected Feature</h3>
          {selectedFeature ? (
            <>
              <p><strong>Type:</strong> {selectedFeature.type}</p>
              <p><strong>Name:</strong> {selectedFeature.name || '-'}</p>
              <p>
                <strong>Range:</strong> {selectedFeature.start + 1}..{selectedFeature.end + 1}
              </p>
              <QualifierList notes={selectedFeature.notes} />
            </>
          ) : (
            <p>Click a feature row or annotation to inspect details.</p>
          )}
        </aside>
      </div>

      <details>
        <summary>Raw sequence</summary>
        <CodeViewer content={record.sequence || ''} language="plaintext" />
      </details>
    </div>
  )
}
