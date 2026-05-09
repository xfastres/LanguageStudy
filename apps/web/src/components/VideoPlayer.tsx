'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SubtitleOverlay } from './SubtitleOverlay'
import { useTelemetry } from '@/hooks/useTelemetry'
import { useAdaptiveDifficulty } from '@/hooks/useAdaptiveDifficulty'

interface VideoPlayerProps {
  videoUrl: string
  subtitleUrl: string
  contentId: string
  playing: boolean
  onEnded: () => void
  onTimeUpdate: (time: number) => void
}

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5] as const
type SpeedOption = (typeof SPEED_OPTIONS)[number]

export function VideoPlayer({
  videoUrl,
  subtitleUrl,
  contentId,
  playing,
  onEnded,
  onTimeUpdate,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState<SpeedOption>(1)
  const [subtitlesVisible, setSubtitlesVisible] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const telemetry = useTelemetry()
  const { shouldDecreaseDifficulty, shouldIncreaseDifficulty } = useAdaptiveDifficulty()

  useEffect(() => {
    if (playing && videoRef.current) {
      videoRef.current.play().catch(() => {})
    } else if (!playing && videoRef.current) {
      videoRef.current.pause()
    }
  }, [playing])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed
    }
  }, [playbackSpeed])

  const handleTap = useCallback(() => {
    if (showSpeedMenu) {
      setShowSpeedMenu(false)
      return
    }

    if (isPlaying) {
      videoRef.current?.pause()
      setIsPlaying(false)
      telemetry.emitPause(contentId, currentTime)
    } else {
      videoRef.current?.play().catch(() => {})
      setIsPlaying(true)
      telemetry.emitResume(contentId, currentTime)
    }
  }, [isPlaying, contentId, currentTime, telemetry, showSpeedMenu])

  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return
    const time = videoRef.current.currentTime
    const dur = videoRef.current.duration
    setCurrentTime(time)
    setDuration(dur)
    setProgress(dur > 0 ? time / dur : 0)
    onTimeUpdate(time)
  }, [onTimeUpdate])

  const handleEnded = useCallback(() => {
    setIsPlaying(false)
    telemetry.emitContentCompleted(contentId, duration)
    onEnded()
  }, [contentId, duration, onEnded, telemetry])

  const handleProgressSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!videoRef.current || !duration) return
      const rect = e.currentTarget.getBoundingClientRect()
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      videoRef.current.currentTime = ratio * duration
    },
    [duration],
  )

  const handleSpeedChange = useCallback(
    (speed: SpeedOption) => {
      setPlaybackSpeed(speed)
      setShowSpeedMenu(false)
    },
    [],
  )

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }, [])

  const toggleSubtitles = useCallback(() => {
    const next = !subtitlesVisible
    setSubtitlesVisible(next)
    telemetry.emitSubtitleToggle(contentId, next)
  }, [subtitlesVisible, contentId, telemetry])

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true)
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current)
    controlsTimerRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 3000)
  }, [isPlaying])

  useEffect(() => {
    return () => {
      if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current)
    }
  }, [])

  const formatTime = (t: number): string => {
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black"
      onClick={handleTap}
      onMouseMove={showControlsTemporarily}
      onTouchStart={showControlsTemporarily}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={() => {
          if (videoRef.current) setDuration(videoRef.current.duration)
        }}
        playsInline
        preload="metadata"
      />

      <SubtitleOverlay
        subtitleUrl={subtitleUrl}
        currentTime={currentTime}
        visible={subtitlesVisible}
        onToggle={toggleSubtitles}
      />

      <AnimatePresence>
        {shouldDecreaseDifficulty && (
          <motion.div
            key="difficulty-down"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 pointer-events-none"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-300">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <span className="text-[10px] font-medium text-blue-200 tracking-wide">SLowing down</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shouldIncreaseDifficulty && (
          <motion.div
            key="difficulty-up"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 pointer-events-none"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-300">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            <span className="text-[10px] font-medium text-emerald-200 tracking-wide">Leveling up</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-30 pointer-events-none"
          >
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent pt-16 pb-4 px-4 safe-bottom">
              <div
                className="w-full h-6 flex items-center cursor-pointer pointer-events-auto mb-2"
                onClick={(e) => {
                  e.stopPropagation()
                  handleProgressSeek(e as unknown as React.MouseEvent<HTMLDivElement>)
                }}
              >
                <div className="w-full h-[2px] bg-white/20 rounded-full relative">
                  <div
                    className="progress-thin bg-accent absolute left-0 top-0"
                    style={{ width: `${progress * 100}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `${progress * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <div className="flex items-center justify-center gap-4 mt-3 pointer-events-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSubtitles()
                  }}
                  className="floating-control"
                  aria-label="Toggle subtitles"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <line x1="6" y1="12" x2="12" y2="12" />
                    <line x1="14" y1="12" x2="18" y2="12" />
                  </svg>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowSpeedMenu(!showSpeedMenu)
                  }}
                  className="floating-control text-xs font-medium min-w-[40px] text-center"
                  aria-label="Playback speed"
                >
                  {playbackSpeed}x
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFullscreen()
                  }}
                  className="floating-control"
                  aria-label="Fullscreen"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {isFullscreen ? (
                      <>
                        <polyline points="4 14 4 20 10 20" />
                        <polyline points="20 10 20 4 14 4" />
                      </>
                    ) : (
                      <>
                        <polyline points="15 3 21 3 21 9" />
                        <polyline points="9 21 3 21 3 15" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showSpeedMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-28 left-1/2 -translate-x-1/2 glass-surface rounded-2xl p-2 flex flex-col gap-1 pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {SPEED_OPTIONS.map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`px-6 py-2 rounded-xl text-sm transition-colors ${
                        playbackSpeed === speed
                          ? 'bg-accent text-background font-medium'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {!isPlaying && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="none">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
