import { detectCodeLanguage, detectFileKind } from '../lib/fileTypes'
import ProtocolMarkdown from './ProtocolMarkdown'
import CodeViewer from './renderers/CodeViewer'
import CsvViewer from './renderers/CsvViewer'
import FastaViewer from './renderers/FastaViewer'
import GenBankViewer from './renderers/GenBankViewer'
import DnaViewer from './renderers/DnaViewer'
import BiologicalContextViewer from './renderers/BiologicalContextViewer'

function JsonViewer({ content }) {
  try {
    const parsed = JSON.parse(content)
    const pretty = JSON.stringify(parsed, null, 2)
    return <CodeViewer content={pretty} language="json" />
  } catch {
    return <CodeViewer content={content} language="json" />
  }
}

export default function FileRenderer({ selectedFile, content, onOpenFile, availableFiles }) {
  if (!selectedFile) {
    return <p className="empty-render">Select a file to preview.</p>
  }

  if (!content) {
    return <p className="empty-render">No file content available.</p>
  }

  const kind = detectFileKind(selectedFile)

  if (kind === 'markdown') {
    return <ProtocolMarkdown content={content} onOpenFile={onOpenFile} availableFiles={availableFiles} />
  }

  if (kind === 'csv') {
    return <CsvViewer content={content} />
  }

  if (kind === 'json') {
    return <JsonViewer content={content} />
  }

  if (kind === 'genbank') {
    return <GenBankViewer content={content} />
  }

  if (kind === 'dna') {
    return <DnaViewer content={content} />
  }

  if (kind === 'fasta') {
    return <FastaViewer content={content} />
  }

  if (kind === 'biological-context') {
    return <BiologicalContextViewer content={content} />
  }

  const language = detectCodeLanguage(selectedFile)
  return <CodeViewer content={content} language={language} />
}
