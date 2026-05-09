'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { SignalCollector } from '../lib/signal-collector'
import { getTelemetryBus } from '../lib/runtime'
import type { ComprehensionSignalVector } from '@linguaflow/comprehension'

export function useSignalCollector() {
  const collectorRef = useRef<SignalCollector | null>(null)
  const [signalVector, setSignalVector] = useState<ComprehensionSignalVector | null>(null)

  useEffect(() => {
    const bus = getTelemetryBus()
    if (!collectorRef.current) {
      collectorRef.current = new SignalCollector(bus)
    }
    const interval = setInterval(() => {
      if (collectorRef.current) {
        setSignalVector(collectorRef.current.getSignalVector())
      }
    }, 5000)
    return () => {
      clearInterval(interval)
      if (collectorRef.current) {
        collectorRef.current.destroy()
        collectorRef.current = null
      }
    }
  }, [])

  const sendSignalsToBackend = useCallback(async (userId: string) => {
    if (!collectorRef.current) return
    const vector = collectorRef.current.getSignalVector()
    try {
      await fetch('http://localhost:3002/signal/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, event: { type: 'SignalSnapshot', ...vector } }),
      })
    } catch {}
  }, [])

  return { signalVector, sendSignalsToBackend }
}
