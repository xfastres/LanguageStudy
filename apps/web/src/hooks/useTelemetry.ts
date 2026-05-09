'use client'

import { useCallback } from 'react'
import { emitEvent, getTelemetryBus } from '@/lib/runtime'
import type { RuntimeEvent } from '@linguaflow/telemetry'

export function useTelemetry() {
  const emit = useCallback(
    (event: Omit<RuntimeEvent, 'timestamp' | 'sessionId'> & { timestamp?: number; sessionId?: string }) => {
      emitEvent(event)
    },
    [],
  )

  const emitPause = useCallback(
    (contentId: string, position: number) => {
      emit({
        type: 'Pause',
        contentId,
        position,
      } as Omit<RuntimeEvent, 'timestamp' | 'sessionId'>)
    },
    [emit],
  )

  const emitResume = useCallback(
    (contentId: string, position: number) => {
      emit({
        type: 'Resume',
        contentId,
        position,
      } as Omit<RuntimeEvent, 'timestamp' | 'sessionId'>)
    },
    [emit],
  )

  const emitSubtitleToggle = useCallback(
    (contentId: string, enabled: boolean) => {
      emit({
        type: 'SubtitleToggle',
        contentId,
        enabled,
      } as Omit<RuntimeEvent, 'timestamp' | 'sessionId'>)
    },
    [emit],
  )

  const emitReplay = useCallback(
    (contentId: string, from: number, to: number) => {
      emit({
        type: 'Replay',
        contentId,
        from,
        to,
      } as Omit<RuntimeEvent, 'timestamp' | 'sessionId'>)
    },
    [emit],
  )

  const emitSkip = useCallback(
    (contentId: string, from: number, to: number) => {
      emit({
        type: 'ContentSkip',
        contentId,
        from,
        to,
      } as Omit<RuntimeEvent, 'timestamp' | 'sessionId'>)
    },
    [emit],
  )

  const emitContentCompleted = useCallback(
    (contentId: string, duration: number) => {
      emit({
        type: 'ContentCompleted',
        contentId,
        duration,
      } as Omit<RuntimeEvent, 'timestamp' | 'sessionId'>)
    },
    [emit],
  )

  const getEventLog = useCallback(() => {
    return getTelemetryBus().getEventLog()
  }, [])

  return {
    emit,
    emitPause,
    emitResume,
    emitSubtitleToggle,
    emitReplay,
    emitSkip,
    emitContentCompleted,
    getEventLog,
  }
}
