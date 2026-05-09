'use client'

import { useState, useEffect, useCallback } from 'react'
import { getImmersionRuntime } from '@/lib/runtime'
import type { ImmersionState } from '@linguaflow/runtime-core'

const initialState: ImmersionState = {
  immersionScore: 0,
  cognitiveLoad: 0,
  interruptionBudget: 1,
  flowStateProbability: 0,
  timestamp: 0,
}

export function useRuntime(): ImmersionState {
  const [state, setState] = useState<ImmersionState>(initialState)

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const runtime = getImmersionRuntime()
        setState(runtime.getState())
      } catch {
        // runtime not initialized yet
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return state
}

export function useCanInterrupt(): boolean {
  const [canInterrupt, setCanInterrupt] = useState(true)

  const check = useCallback(() => {
    try {
      const runtime = getImmersionRuntime()
      setCanInterrupt(runtime.canInterrupt())
    } catch {
      setCanInterrupt(true)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(check, 2000)
    check()
    return () => clearInterval(interval)
  }, [check])

  return canInterrupt
}
