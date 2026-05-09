import type { RuntimeEvent } from '@linguaflow/telemetry'
import { TelemetryBus, SessionTracker } from '@linguaflow/telemetry'
import { ImmersionRuntimeImpl } from '@linguaflow/runtime-core'
import { estimateComprehensionV1 } from '@linguaflow/comprehension'
import type { ComprehensionSignalVector } from '@linguaflow/comprehension'
import type { SessionTrace, RuntimePrediction, PredictionVsTruth } from './types'

export interface SimulationResult {
  traceId: string
  predictions: RuntimePrediction[]
  finalState: {
    immersionScore: number
    cognitiveLoad: number
    flowStateProbability: number
    comprehensionEstimate: number
  }
  predictionVsTruth: PredictionVsTruth | null
  timeline: SimulationTimelinePoint[]
}

export interface SimulationTimelinePoint {
  timestamp: number
  eventType: string
  immersionScore: number
  cognitiveLoad: number
  flowStateProbability: number
}

export class ReplaySimulator {
  simulateTrace(trace: SessionTrace): SimulationResult {
    const bus = new TelemetryBus()
    const tracker = new SessionTracker(bus)
    const runtime = new ImmersionRuntimeImpl(tracker)

    const predictions: RuntimePrediction[] = []
    const timeline: SimulationTimelinePoint[] = []

    tracker.startSession(trace.userId)

    for (const event of trace.events) {
      bus.emit(event as RuntimeEvent)

      const state = runtime.getState()
      const prediction: RuntimePrediction = {
        immersionScore: state.immersionScore,
        cognitiveLoad: state.cognitiveLoad,
        flowStateProbability: state.flowStateProbability,
        comprehensionEstimate: 0,
        timestamp: event.timestamp,
      }

      predictions.push(prediction)
      timeline.push({
        timestamp: event.timestamp,
        eventType: event.type,
        immersionScore: state.immersionScore,
        cognitiveLoad: state.cognitiveLoad,
        flowStateProbability: state.flowStateProbability,
      })
    }

    const finalState = runtime.getState()

    let predictionVsTruth: PredictionVsTruth | null = null
    if (
      trace.selfReportedComprehension !== undefined ||
      trace.selfReportedImmersion !== undefined
    ) {
      const comprehensionError =
        trace.selfReportedComprehension !== undefined
          ? Math.abs(
              finalState.immersionScore - trace.selfReportedComprehension,
            )
          : null

      const immersionError =
        trace.selfReportedImmersion !== undefined
          ? Math.abs(
              finalState.immersionScore - trace.selfReportedImmersion,
            )
          : null

      predictionVsTruth = {
        traceId: trace.id,
        userId: trace.userId,
        predicted: {
          immersionScore: finalState.immersionScore,
          cognitiveLoad: finalState.cognitiveLoad,
          flowStateProbability: finalState.flowStateProbability,
          comprehensionEstimate: 0,
          timestamp: Date.now(),
        },
        selfReported: {
          comprehension: trace.selfReportedComprehension,
          immersion: trace.selfReportedImmersion,
          fatigue: trace.selfReportedFatigue,
        },
        errors: {
          comprehensionError,
          immersionError,
        },
      }
    }

    return {
      traceId: trace.id,
      predictions,
      finalState: {
        immersionScore: finalState.immersionScore,
        cognitiveLoad: finalState.cognitiveLoad,
        flowStateProbability: finalState.flowStateProbability,
        comprehensionEstimate: 0,
      },
      predictionVsTruth,
      timeline,
    }
  }

  simulateWithConfig(
    trace: SessionTrace,
    config: Record<string, unknown>,
  ): SimulationResult {
    const bus = new TelemetryBus()
    const tracker = new SessionTracker(bus)
    const runtime = new ImmersionRuntimeImpl(tracker, config as any)

    const predictions: RuntimePrediction[] = []
    const timeline: SimulationTimelinePoint[] = []

    tracker.startSession(trace.userId)

    for (const event of trace.events) {
      bus.emit(event as RuntimeEvent)

      const state = runtime.getState()
      predictions.push({
        immersionScore: state.immersionScore,
        cognitiveLoad: state.cognitiveLoad,
        flowStateProbability: state.flowStateProbability,
        comprehensionEstimate: 0,
        timestamp: event.timestamp,
      })

      timeline.push({
        timestamp: event.timestamp,
        eventType: event.type,
        immersionScore: state.immersionScore,
        cognitiveLoad: state.cognitiveLoad,
        flowStateProbability: state.flowStateProbability,
      })
    }

    const finalState = runtime.getState()

    return {
      traceId: trace.id,
      predictions,
      finalState: {
        immersionScore: finalState.immersionScore,
        cognitiveLoad: finalState.cognitiveLoad,
        flowStateProbability: finalState.flowStateProbability,
        comprehensionEstimate: 0,
      },
      predictionVsTruth: null,
      timeline,
    }
  }

  compareConfigs(
    trace: SessionTrace,
    configs: Array<{ name: string; config: Record<string, unknown> }>,
  ): Array<{ name: string; result: SimulationResult }> {
    return configs.map(({ name, config }) => ({
      name,
      result: this.simulateWithConfig(trace, config),
    }))
  }
}
