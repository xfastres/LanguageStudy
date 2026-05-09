'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRuntime } from './useRuntime'
import { useSignalCollector } from './useSignalCollector'
import { adaptDifficulty } from '@/lib/api'

interface AdaptationState {
  comprehension: number
  adjustmentDirection: 'decrease' | 'maintain' | 'increase' | null
  shouldDecreaseDifficulty: boolean
  shouldIncreaseDifficulty: boolean
}

const INITIAL_STATE: AdaptationState = {
  comprehension: 0.5,
  adjustmentDirection: null,
  shouldDecreaseDifficulty: false,
  shouldIncreaseDifficulty: false,
}

export function useAdaptiveDifficulty(userId: string = 'default_user') {
  const runtimeState = useRuntime()
  const { signalVector, sendSignalsToBackend } = useSignalCollector()
  const [adaptation, setAdaptation] = useState<AdaptationState>(INITIAL_STATE)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const runAdaptation = useCallback(async () => {
    if (!signalVector) return

    try {
      await sendSignalsToBackend(userId)

      const result = await adaptDifficulty(userId, {
        ...signalVector,
        immersionScore: runtimeState.immersionScore,
        cognitiveLoad: runtimeState.cognitiveLoad,
      })

      const direction = result.adjustment?.direction ?? null
      setAdaptation({
        comprehension: result.comprehension ?? 0.5,
        adjustmentDirection: direction,
        shouldDecreaseDifficulty: direction === 'decrease',
        shouldIncreaseDifficulty: direction === 'increase',
      })
    } catch {}
  }, [signalVector, userId, runtimeState.immersionScore, runtimeState.cognitiveLoad, sendSignalsToBackend])

  useEffect(() => {
    intervalRef.current = setInterval(runAdaptation, 30000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [runAdaptation])

  return {
    comprehension: adaptation.comprehension,
    adjustmentDirection: adaptation.adjustmentDirection,
    shouldDecreaseDifficulty: adaptation.shouldDecreaseDifficulty,
    shouldIncreaseDifficulty: adaptation.shouldIncreaseDifficulty,
    immersionScore: runtimeState.immersionScore,
    cognitiveLoad: runtimeState.cognitiveLoad,
    runAdaptation,
  }
}
