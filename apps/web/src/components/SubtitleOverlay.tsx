'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SubtitleOverlayProps {
  subtitleUrl: string
  currentTime: number
  visible: boolean
  onToggle: () => void
}

interface SubtitleCue {
  id: string
  startTime: number
  endTime: number
  text: string
}

function parseVTT(vttText: string): SubtitleCue[] {
  const cues: SubtitleCue[] = []
  const blocks = vttText.split('\n\n')

  for (const block of blocks) {
    const lines = block.trim().split('\n')
    const timeLine = lines.find((l) => l.includes('-->'))
    if (!timeLine) continue

    const [startStr, endStr] = timeLine.split('-->').map((s) => s.trim())
    const startTime = parseTimestamp(startStr)
    const endTime = parseTimestamp(endStr)
    const textLines = lines.filter((l) => !l.includes('-->') && !l.startsWith('WEBVTT') && !l.startsWith('Kind:') && !l.startsWith('Language:'))
    const text = textLines.join(' ').trim()

    if (text) {
      cues.push({ id: `${startTime}-${endTime}`, startTime, endTime, text })
    }
  }

  return cues
}

function parseTimestamp(ts: string): number {
  const parts = ts.split(':')
  if (parts.length === 3) {
    const [h, m, rest] = parts
    const [s, ms] = rest.split('.')
    return Number(h) * 3600 + Number(m) * 60 + Number(s) + Number(ms ?? 0) / 1000
  }
  if (parts.length === 2) {
    const [m, rest] = parts
    const [s, ms] = rest.split('.')
    return Number(m) * 60 + Number(s) + Number(ms ?? 0) / 1000
  }
  return 0
}

export function SubtitleOverlay({ subtitleUrl, currentTime, visible, onToggle }: SubtitleOverlayProps) {
  const [cues, setCues] = useState<SubtitleCue[]>([])
  const [activeCue, setActiveCue] = useState<SubtitleCue | null>(null)
  const loadedRef = useRef<string>('')

  useEffect(() => {
    if (loadedRef.current === subtitleUrl) return
    loadedRef.current = subtitleUrl

    fetch(subtitleUrl)
      .then((res) => res.text())
      .then((text) => setCues(parseVTT(text)))
      .catch(() => setCues([]))
  }, [subtitleUrl])

  useEffect(() => {
    const cue = cues.find((c) => currentTime >= c.startTime && currentTime <= c.endTime) ?? null
    setActiveCue(cue)
  }, [currentTime, cues])

  return (
    <div className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {visible && activeCue && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="max-w-[90vw] sm:max-w-[480px]"
          >
            <p className="subtitle-text bg-black/50 text-subtitle-md sm:text-subtitle-lg rounded-lg px-4 py-2">
              {activeCue.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={onToggle}
        className="floating-control self-center opacity-60 hover:opacity-100 transition-opacity"
        aria-label={visible ? 'Hide subtitles' : 'Show subtitles'}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={visible ? 'text-accent' : 'text-text-muted'}
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          {visible && (
            <>
              <line x1="6" y1="12" x2="12" y2="12" />
              <line x1="14" y1="12" x2="18" y2="12" />
              <line x1="6" y1="16" x2="10" y2="16" />
            </>
          )}
        </svg>
      </button>
    </div>
  )
}
