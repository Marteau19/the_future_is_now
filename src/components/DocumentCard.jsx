import { useState } from 'react'
import { FileText, Download, CheckCircle } from 'lucide-react'

export default function DocumentCard({ name, size, type = 'PDF' }) {
  const [downloading, setDownloading] = useState(false)
  const [done, setDone] = useState(false)

  function handleDownload() {
    setDownloading(true)
    setTimeout(() => { setDownloading(false); setDone(true) }, 1200)
  }

  return (
    <div
      className="flex items-center gap-3 p-3.5 rounded-card"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div
        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ background: 'var(--color-brand-light)' }}
      >
        <FileText size={18} style={{ color: 'var(--color-brand)' }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>{name}</p>
        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{type} · {size}</p>
      </div>
      <button onClick={handleDownload} disabled={downloading || done}>
        {done
          ? <CheckCircle size={20} style={{ color: 'var(--color-brand)' }} />
          : <Download
              size={20}
              strokeWidth={1.5}
              style={{ color: downloading ? 'var(--color-text-disabled)' : 'var(--color-brand)' }}
            />
        }
      </button>
    </div>
  )
}
