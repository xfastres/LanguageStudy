'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { VideoPlayer } from './VideoPlayer'
import { useContentStore } from '@/store/content-store'
import { useRuntime } from '@/hooks/useRuntime'
import { useTelemetry } from '@/hooks/useTelemetry'
import { initializeRuntime, destroyRuntime } from '@/lib/runtime'

const SWIPE_THRESHOLD = 80

export function ImmersiveFeed() {
  const { contentList, currentIndex, goNext, goPrev, setCurrentIndex } = useContentStore()
  const [direction, setDirection] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const runtimeState = useRuntime()
  const telemetry = useTelemetry()

  useEffect(() => {
    initializeRuntime()
    return () => {
      destroyRuntime()
    }
  }, [])

  const currentItem = contentList[currentIndex]

  const handleSwipeEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      setIsSwiping(false)
      const offset = info.offset.y
      const velocity = info.velocity.y

      if (offset < -SWIPE_THRESHOLD || velocity < -500) {
        if (currentIndex < contentList.length - 1) {
          setDirection(1)
          telemetry.emitSkip(currentItem.id, 0, 0)
          goNext()
        }
      } else if (offset > SWIPE_THRESHOLD || velocity > 500) {
        if (currentIndex > 0) {
          setDirection(-1)
          goPrev()
        }
      }
    },
    [currentIndex, contentList.length, currentItem, goNext, goPrev, telemetry],
  )

  const handleVideoEnded = useCallback(() => {
    if (currentIndex < contentList.length - 1) {
      setDirection(1)
      goNext()
    }
  }, [currentIndex, contentList.length, goNext])

  const handleTimeUpdate = useCallback((_time: number) => {}, [])

  const variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      y: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  }

  return (
    <div
      ref={containerRef}
      className="immersive-container overflow-hidden"
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentItem.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.15}
          onDragStart={() => setIsSwiping(true)}
          onDragEnd={handleSwipeEnd}
          className="absolute inset-0 touch-none"
        >
          <VideoPlayer
            videoUrl={currentItem.videoUrl}
            subtitleUrl={currentItem.subtitleUrl}
            contentId={currentItem.id}
            playing={!isSwiping}
            onEnded={handleVideoEnded}
            onTimeUpdate={handleTimeUpdate}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-0 left-0 right-0 z-40 safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-accent font-semibold text-sm tracking-wide">LinguaFlow</span>
          </div>
          <div className="flex items-center gap-1">
            {contentList.map((_, i) => (
              <div
                key={i}
                className={`h-[2px] rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-6 bg-accent'
                    : i < currentIndex
                      ? 'w-4 bg-accent/40'
                      : 'w-4 bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-3 bottom-24 z-40 flex flex-col items-center gap-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-10 h-10 rounded-full bg-surface-light/80 backdrop-blur-sm flex items-center justify-center">
            <span className="text-xs text-text-secondary font-medium">
              {currentIndex + 1}/{contentList.length}
            </span>
          </div>
        </motion.div>
      </div>

      <div className="absolute left-4 bottom-8 z-40 max-w-[70vw]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-text-primary mb-1 drop-shadow-lg">
              {currentItem.title}
            </h2>
            <p className="text-sm text-text-secondary drop-shadow-md">
              {currentItem.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
