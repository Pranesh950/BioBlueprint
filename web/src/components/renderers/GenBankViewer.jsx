import { useMemo, useState } from 'react'
import { SeqViz } from 'seqviz'
import { genbankToJson } from '@teselagen/bio-parsers'
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

export default function GenBankViewer({ content }) {
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null)

  const parsed = useMemo(() => {
    try {
      const records = genbankToJson(content)

      if (!records.length || !records[0].parsedSequence?.sequence) {
        return { data: null, error: 'No sequence found in GenBank file' }
      }

      return { data: records[0].parsedSequence, error: null }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Failed to parse GenBank file' }
    }
  }, [content])

  if (parsed.error) {
    return (
      <div className="bio-viewer">
        <p className="bio-error">Could not parse .gb/.gbk file: {parsed.error}</p>
        <CodeViewer content={content} language="plaintext" />
      </div>
    )
  }

  const { data } = parsed
  const features = data.features || []
  const annotations = features.map(toSeqVizFeature)

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
        <p><strong>Locus:</strong> {data.name || '-'}</p>
        <p><strong>Length:</strong> {data.sequence.length.toLocaleString()} bp</p>
        <p><strong>Topology:</strong> {data.circular ? 'circular' : 'linear'}</p>
        <p><strong>GC:</strong> {gcContent(data.sequence).toFixed(1)}%</p>
        <p><strong>Features:</strong> {features.length}</p>
        <p><strong>Primers:</strong> {(data.primers || []).length}</p>
        <p className="bio-wide"><strong>Definition:</strong> {data.definition || '-'}</p>
      </div>

      <div className="seqviz-shell">
        <SeqViz
          name={data.name || 'sequence'}
          seq={data.sequence}
          annotations={annotations}
          primers={(data.primers || []).map(toSeqVizFeature)}
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
        <CodeViewer content={data.sequence || ''} language="plaintext" />
      </details>
    </div>
  )
}
