import type { RuntimeEvent } from '@linguaflow/telemetry'
import type { SessionTrace, TraceDataset, TraceDatasetMetadata } from './types'

export class TraceDatasetStore {
  private traces: Map<string, SessionTrace> = new Map()

  addTrace(trace: SessionTrace): void {
    this.traces.set(trace.id, trace)
  }

  getTrace(id: string): SessionTrace | undefined {
    return this.traces.get(id)
  }

  getAllTraces(): SessionTrace[] {
    return Array.from(this.traces.values())
  }

  getTracesByUser(userId: string): SessionTrace[] {
    return this.getAllTraces().filter((t) => t.userId === userId)
  }

  getTracesInRange(start: number, end: number): SessionTrace[] {
    return this.getAllTraces().filter(
      (t) => t.startTime >= start && t.endTime <= end,
    )
  }

  getTracesWithSelfReport(): SessionTrace[] {
    return this.getAllTraces().filter(
      (t) =>
        t.selfReportedComprehension !== undefined ||
        t.selfReportedImmersion !== undefined,
    )
  }

  getAbandonedTraces(): SessionTrace[] {
    return this.getAllTraces().filter(
      (t) => t.abandonmentReason !== undefined,
    )
  }

  computeMetadata(): TraceDatasetMetadata {
    const all = this.getAllTraces()
    const withReport = this.getTracesWithSelfReport()
    const abandoned = this.getAbandonedTraces()

    const totalDuration = all.reduce((sum, t) => sum + t.duration, 0)
    const avgSession = all.length > 0 ? totalDuration / all.length : 0

    const avgComprehension =
      withReport.length > 0
        ? withReport.reduce(
            (sum, t) => sum + (t.selfReportedComprehension ?? 0),
            0,
          ) / withReport.length
        : 0

    const avgImmersion =
      withReport.length > 0
        ? withReport.reduce(
            (sum, t) => sum + (t.selfReportedImmersion ?? 0),
            0,
          ) / withReport.length
        : 0

    return {
      createdAt: Date.now(),
      traceCount: all.length,
      totalDuration,
      avgSessionDuration: avgSession,
      avgSelfReportedComprehension: avgComprehension,
      avgSelfReportedImmersion: avgImmersion,
      abandonmentRate: all.length > 0 ? abandoned.length / all.length : 0,
    }
  }

  toDataset(): TraceDataset {
    return {
      traces: this.getAllTraces(),
      metadata: this.computeMetadata(),
    }
  }
}
