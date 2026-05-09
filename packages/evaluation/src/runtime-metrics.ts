import type { SessionTrace, RuntimeMetricsReport, RuntimePrediction } from './types'
import type { RuntimeEvent } from '@linguaflow/telemetry'
import { ReplaySimulator } from './replay-simulator'

export class RuntimeMetricsComputer {
  private simulator: ReplaySimulator

  constructor() {
    this.simulator = new ReplaySimulator()
  }

  computeReport(traces: SessionTrace[]): RuntimeMetricsReport {
    if (traces.length === 0) {
      return this.emptyReport()
    }

    const results = traces.map((t) => this.simulator.simulateTrace(t))

    const immersionCollapseRate = this.computeImmersionCollapseRate(results)
    const flowContinuity = this.computeFlowContinuity(results)
    const avgRecoveryTime = this.computeAvgRecoveryTime(traces)
    const replayDensity = this.computeReplayDensity(traces)
    const subtitleDependency = this.computeSubtitleDependency(traces)
    const cognitiveOverloadFrequency = this.computeCognitiveOverloadFrequency(results)
    const avgSwitchingCost = this.computeAvgSwitchingCost(results)

    const withTruth = results.filter((r) => r.predictionVsTruth !== null)
    const comprehensionAccuracy = this.computeComprehensionAccuracy(withTruth)
    const immersionAccuracy = this.computeImmersionAccuracy(withTruth)

    return {
      immersionCollapseRate,
      flowContinuity,
      avgRecoveryTime,
      replayDensity,
      subtitleDependency,
      cognitiveOverloadFrequency,
      avgSwitchingCost,
      comprehensionAccuracy,
      immersionAccuracy,
      sampleCount: traces.length,
    }
  }

  private computeImmersionCollapseRate(
    results: Array<{ timeline: Array<{ immersionScore: number }> }>,
  ): number {
    let collapses = 0
    let total = 0

    for (const result of results) {
      for (let i = 1; i < result.timeline.length; i++) {
        total++
        const drop =
          result.timeline[i - 1].immersionScore -
          result.timeline[i].immersionScore
        if (drop > 0.3) collapses++
      }
    }

    return total > 0 ? collapses / total : 0
  }

  private computeFlowContinuity(
    results: Array<{ timeline: Array<{ flowStateProbability: number }> }>,
  ): number {
    if (results.length === 0) return 0

    const avgFlow = results.map((r) => {
      if (r.timeline.length === 0) return 0
      return (
        r.timeline.reduce((sum, p) => sum + p.flowStateProbability, 0) /
        r.timeline.length
      )
    })

    return avgFlow.reduce((a, b) => a + b, 0) / avgFlow.length
  }

  private computeAvgRecoveryTime(traces: SessionTrace[]): number {
    let totalRecoveryTime = 0
    let recoveryCount = 0

    for (const trace of traces) {
      const bgEvents = trace.events.filter(
        (e) => e.type === 'AppBackgrounded',
      )
      const fgEvents = trace.events.filter(
        (e) => e.type === 'AppForegrounded',
      )

      for (const bg of bgEvents) {
        const fg = fgEvents.find(
          (f) => f.timestamp > bg.timestamp,
        )
        if (fg) {
          totalRecoveryTime += fg.timestamp - bg.timestamp
          recoveryCount++
        }
      }
    }

    return recoveryCount > 0 ? totalRecoveryTime / recoveryCount : 0
  }

  private computeReplayDensity(traces: SessionTrace[]): number {
    let totalReplays = 0
    let totalDuration = 0

    for (const trace of traces) {
      totalReplays += trace.events.filter((e) => e.type === 'Replay').length
      totalDuration += trace.duration
    }

    return totalDuration > 0 ? totalReplays / (totalDuration / 60000) : 0
  }

  private computeSubtitleDependency(traces: SessionTrace[]): number {
    let totalSubtitleOn = 0
    let totalToggleEvents = 0

    for (const trace of traces) {
      const toggleEvents = trace.events.filter(
        (e) => e.type === 'SubtitleToggle',
      )
      totalToggleEvents += toggleEvents.length

      const onEvents = toggleEvents.filter(
        (e) => (e as any).enabled === true,
      )
      totalSubtitleOn += onEvents.length
    }

    return totalToggleEvents > 0 ? totalSubtitleOn / totalToggleEvents : 0
  }

  private computeCognitiveOverloadFrequency(
    results: Array<{ timeline: Array<{ cognitiveLoad: number }> }>,
  ): number {
    let overloadPoints = 0
    let totalPoints = 0

    for (const result of results) {
      for (const point of result.timeline) {
        totalPoints++
        if (point.cognitiveLoad > 0.7) overloadPoints++
      }
    }

    return totalPoints > 0 ? overloadPoints / totalPoints : 0
  }

  private computeAvgSwitchingCost(
    results: Array<{ timeline: Array<{ immersionScore: number }> }>,
  ): number {
    let totalCost = 0
    let transitions = 0

    for (const result of results) {
      for (let i = 1; i < result.timeline.length; i++) {
        const diff = Math.abs(
          result.timeline[i].immersionScore -
            result.timeline[i - 1].immersionScore,
        )
        totalCost += diff
        transitions++
      }
    }

    return transitions > 0 ? totalCost / transitions : 0
  }

  private computeComprehensionAccuracy(
    results: Array<{ predictionVsTruth: { errors: { comprehensionError: number | null } } | null }>,
  ): number {
    const withComprehension = results.filter(
      (r) =>
        r.predictionVsTruth !== null &&
        r.predictionVsTruth.errors.comprehensionError !== null,
    )

    if (withComprehension.length === 0) return 0

    const withinTolerance = withComprehension.filter(
      (r) => r.predictionVsTruth!.errors.comprehensionError! <= 0.15,
    )

    return withinTolerance.length / withComprehension.length
  }

  private computeImmersionAccuracy(
    results: Array<{ predictionVsTruth: { errors: { immersionError: number | null } } | null }>,
  ): number {
    const withImmersion = results.filter(
      (r) =>
        r.predictionVsTruth !== null &&
        r.predictionVsTruth.errors.immersionError !== null,
    )

    if (withImmersion.length === 0) return 0

    const withinTolerance = withImmersion.filter(
      (r) => r.predictionVsTruth!.errors.immersionError! <= 0.15,
    )

    return withinTolerance.length / withImmersion.length
  }

  private emptyReport(): RuntimeMetricsReport {
    return {
      immersionCollapseRate: 0,
      flowContinuity: 0,
      avgRecoveryTime: 0,
      replayDensity: 0,
      subtitleDependency: 0,
      cognitiveOverloadFrequency: 0,
      avgSwitchingCost: 0,
      comprehensionAccuracy: 0,
      immersionAccuracy: 0,
      sampleCount: 0,
    }
  }
}
