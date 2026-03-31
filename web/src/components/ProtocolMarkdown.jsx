import { Children, isValidElement } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CodeViewer from './renderers/CodeViewer'

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function readChildrenText(children) {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string') {
        return child
      }

      if (isValidElement(child)) {
        return readChildrenText(child.props.children)
      }

      return ''
    })
    .join('')
}

function normalizeWorkspacePath(path = '') {
  return path.replace(/^[./]+/, '').replace(/\\/g, '/').trim()
}

function parseCalloutType(text) {
  const normalized = text.toLowerCase().trim()

  if (normalized.startsWith('warning:') || normalized.startsWith('caution:')) {
    return 'warning'
  }

  if (normalized.startsWith('tip:') || normalized.startsWith('success:')) {
    return 'success'
  }

  if (normalized.startsWith('note:') || normalized.startsWith('info:')) {
    return 'info'
  }

  return 'default'
}

function parseProtocolTitle(content) {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : 'Protocol'
}

function stripFirstH1(content) {
  return content.replace(/^#\s+.+\n*/m, '').trimStart()
}

export default function ProtocolMarkdown({ content, onOpenFile, availableFiles }) {
  const protocolTitle = parseProtocolTitle(content)
  const markdownContent = stripFirstH1(content)

  return (
    <div className="protocol-layout">
      <article className="protocol-doc">
        <header className="protocol-masthead">
          <p className="protocol-label">Protocol</p>
          <h1>{protocolTitle}</h1>
        </header>

        <div className="protocol-markdown">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => {
              const text = readChildrenText(children)
              const id = slugify(text)
              return <h2 id={id}>{children}</h2>
            },
            h2: ({ children }) => {
              const text = readChildrenText(children)
              const id = slugify(text)
              return <h3 id={id}>{children}</h3>
            },
            h3: ({ children }) => {
              const text = readChildrenText(children)
              const id = slugify(text)
              return <h4 id={id}>{children}</h4>
            },
            blockquote: ({ children }) => {
              const text = readChildrenText(children)
              const type = parseCalloutType(text)

              return <blockquote className={`protocol-callout callout-${type}`}>{children}</blockquote>
            },
            table: ({ children }) => <div className="table-wrap"><table>{children}</table></div>,
            a: ({ href, children }) => {
              if (!href) {
                return <a>{children}</a>
              }

              const normalized = normalizeWorkspacePath(href)
              const isExternal = href.startsWith('http')

              if (!isExternal && availableFiles?.has(normalized)) {
                return (
                  <a
                    href="#"
                    className="file-link"
                    onClick={(event) => {
                      event.preventDefault()
                      onOpenFile?.(normalized)
                    }}
                  >
                    {children}
                  </a>
                )
              }

              return (
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                >
                  {children}
                </a>
              )
            },
            code: ({ inline, className, children }) => {
              const languageMatch = /language-(\w+)/.exec(className || '')
              const language = languageMatch?.[1] || 'plaintext'
              const value = String(children).replace(/\n$/, '')
              const normalized = normalizeWorkspacePath(value)

              if (inline) {
                if (onOpenFile && availableFiles?.has(normalized)) {
                  return (
                    <a
                      href="#"
                      className="file-link file-code-link"
                      onClick={(event) => {
                        event.preventDefault()
                        onOpenFile(normalized)
                      }}
                    >
                      <code>{value}</code>
                    </a>
                  )
                }

                return <code>{children}</code>
              }

              return <CodeViewer content={value} language={language} />
            },
          }}
        >
          {markdownContent}
        </ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
