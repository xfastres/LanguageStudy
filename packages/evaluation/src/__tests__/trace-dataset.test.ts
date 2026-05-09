import { describe, it, expect } from 'vitest'
import { TraceDatasetStore } from '../trace-dataset'
import type { SessionTrace } from '../types'

function createTrace(overrides: Partial<SessionTrace> = {}): SessionTrace {
  return {
    id: `trace_${Date.now()}`,
    userId: 'user_1',
    events: [],
    startTime: 1000,
    endTime: 5000,
    duration: 4000,
    ...overrides,
  }
}

describe('TraceDatasetStore', () => {
  it('stores and retrieves traces', () => {
    const store = new TraceDatasetStore()
    const trace = createTrace({ id: 'trace_1' })
    store.addTrace(trace)
    expect(store.getTrace('trace_1')).toEqual(trace)
  })

  it('filters traces by user', () => {
    const store = new TraceDatasetStore()
    store.addTrace(createTrace({ id: 't1', userId: 'user_a' }))
    store.addTrace(createTrace({ id: 't2', userId: 'user_b' }))
    store.addTrace(createTrace({ id: 't3', userId: 'user_a' }))
    expect(store.getTracesByUser('user_a')).toHaveLength(2)
  })

  it('filters traces with self-report', () => {
    const store = new TraceDatasetStore()
    store.addTrace(createTrace({ id: 't1' }))
    store.addTrace(
      createTrace({ id: 't2', selfReportedComprehension: 0.8 }),
    )
    store.addTrace(
      createTrace({ id: 't3', selfReportedImmersion: 0.7 }),
    )
    expect(store.getTracesWithSelfReport()).toHaveLength(2)
  })

  it('computes metadata', () => {
    const store = new TraceDatasetStore()
    store.addTrace(
      createTrace({
        id: 't1',
        duration: 3000,
        selfReportedComprehension: 0.8,
        selfReportedImmersion: 0.7,
      }),
    )
    store.addTrace(
      createTrace({
        id: 't2',
        duration: 5000,
        selfReportedComprehension: 0.6,
        abandonmentReason: 'bored',
      }),
    )

    const metadata = store.computeMetadata()
    expect(metadata.traceCount).toBe(2)
    expect(metadata.avgSessionDuration).toBe(4000)
    expect(metadata.abandonmentRate).toBe(0.5)
  })

  it('returns empty metadata for empty store', () => {
    const store = new TraceDatasetStore()
    const metadata = store.computeMetadata()
    expect(metadata.traceCount).toBe(0)
    expect(metadata.abandonmentRate).toBe(0)
  })
})
