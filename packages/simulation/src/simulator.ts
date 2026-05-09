import { TelemetryBus, SessionTracker } from '@linguaflow/telemetry'
import type { RuntimeEvent } from '@linguaflow/telemetry'
import { ImmersionRuntimeImpl } from '@linguaflow/runtime-core'
import { estimateComprehensionV1 } from '@linguaflow/comprehension'
import type { ComprehensionSignalVector } from '@linguaflow/comprehension'
import type {
  SyntheticUserProfile,
  SyntheticBehaviorModel,
  SimulatedContent,
  SimulationStep,
  SimulationResult,
  UserAction,
  RuntimeDefect,
  DefectType,
  RuntimeStateSnapshot,
} from './types'

export class SyntheticUserSimulator {
  private rng: () => number

  constructor(seed?: number) {
    let s = seed ?? 42
    this.rng = () => {
      s = (s * 1664525 + 1013904223) & 0xffffffff
      return (s >>> 0) / 0xffffffff
    }
  }

  simulate(
    user: SyntheticUserProfile,
    content: SimulatedContent,
    maxSteps: number = 100,
  ): SimulationResult {
    const bus = new TelemetryBus()
    const tracker = new SessionTracker(bus)
    const runtime = new ImmersionRuntimeImpl(tracker)

    const sessionId = tracker.startSession(user.id)

    const steps: SimulationStep[] = []
    const defects: RuntimeDefect[] = []

    let actualComprehension = this.computeInitialComprehension(user, content)
    let currentImmersion = 0.3
    let currentFatigue = 0
    let position = 0
    let subtitleEnabled = user.behavior.subtitleToggleProbability > 0.5
    let prevImmersion = 0
    let prevCognitiveLoad = 0
    let oscillationCount = 0

    for (let step = 0; step < maxSteps; step++) {
      const timestamp = 1000 + step * (content.durationSeconds * 1000 / maxSteps)
      position = (step / maxSteps) * content.durationSeconds

      currentFatigue = Math.min(1, currentFatigue + user.behavior.fatigueRate)
      actualComprehension = Math.max(
        0,
        actualComprehension - user.behavior.comprehensionDecayRate * currentFatigue,
      )

      if (actualComprehension > 0.6) {
        currentImmersion = Math.min(
          1,
          currentImmersion + user.behavior.immersionGrowthRate * actualComprehension,
        )
      } else {
        currentImmersion = Math.max(0, currentImmersion - 0.01)
      }

      const action = this.decideAction(
        user.behavior,
        actualComprehension,
        currentFatigue,
        subtitleEnabled,
        position,
        content.durationSeconds,
      )

      this.emitActionEvent(bus, action, sessionId, content.id, timestamp)

      if (action.type === 'subtitle_toggle') {
        subtitleEnabled = action.enabled
      }

      if (action.type === 'replay') {
        actualComprehension = Math.min(1, actualComprehension + 0.05)
        currentFatigue = Math.min(1, currentFatigue + 0.01)
      }

      if (action.type === 'pause') {
        currentFatigue = Math.max(0, currentFatigue - user.behavior.recoveryRate)
      }

      if (action.type === 'abandon') {
        break
      }

      const state = runtime.getState()
      const signals = this.extractSignals(tracker)
      const comprehensionEstimate = estimateComprehensionV1(signals)

      const runtimeSnapshot: RuntimeStateSnapshot = {
        immersionScore: state.immersionScore,
        cognitiveLoad: state.cognitiveLoad,
        flowStateProbability: state.flowStateProbability,
        interruptionBudget: state.interruptionBudget,
      }

      if (step > 0) {
        const immersionDelta = state.immersionScore - prevImmersion
        const loadDelta = state.cognitiveLoad - prevCognitiveLoad

        if (
          (immersionDelta > 0.2 && prevImmersion - steps[steps.length - 1]?.immersionScore < -0.2) ||
          (loadDelta > 0.2 && prevCognitiveLoad - steps[steps.length - 1]?.cognitiveLoad < -0.2)
        ) {
          oscillationCount++
        }

        if (oscillationCount > 3) {
          defects.push({
            type: 'oscillation',
            severity: 'high',
            description: 'Runtime state oscillating rapidly',
            timestamp,
            details: { oscillationCount, immersionDelta, loadDelta },
          })
          oscillationCount = 0
        }

        if (Math.abs(immersionDelta) > 0.3) {
          defects.push({
            type: 'adaptation_instability',
            severity: immersionDelta < -0.3 ? 'high' : 'medium',
            description: `Large immersion jump: ${immersionDelta.toFixed(2)}`,
            timestamp,
            details: { immersionDelta, loadDelta },
          })
        }

        if (
          comprehensionEstimate > 0.9 &&
          actualComprehension < 0.5
        ) {
          defects.push({
            type: 'comprehension_drift',
            severity: 'high',
            description: 'Estimated comprehension much higher than actual',
            timestamp,
            details: { estimated: comprehensionEstimate, actual: actualComprehension },
          })
        }

        if (
          state.immersionScore < 0.2 &&
          steps.length > 10
        ) {
          defects.push({
            type: 'immersion_collapse',
            severity: 'medium',
            description: 'Immersion collapsed to near zero',
            timestamp,
            details: { immersionScore: state.immersionScore },
          })
        }
      }

      prevImmersion = state.immersionScore
      prevCognitiveLoad = state.cognitiveLoad

      const simStep: SimulationStep = {
        timestamp,
        userAction: action,
        runtimeState: runtimeSnapshot,
        comprehensionEstimate,
        actualComprehension,
        immersionScore: state.immersionScore,
        cognitiveLoad: state.cognitiveLoad,
      }

      steps.push(simStep)
    }

    tracker.endSession()

    const finalStep = steps[steps.length - 1]
    return {
      userId: user.id,
      contentId: content.id,
      steps,
      finalState: {
        immersionScore: finalStep?.immersionScore ?? 0,
        cognitiveLoad: finalStep?.cognitiveLoad ?? 0,
        comprehensionEstimate: finalStep?.comprehensionEstimate ?? 0,
        actualComprehension: finalStep?.actualComprehension ?? 0,
        sessionDuration: (steps.length / maxSteps) * content.durationSeconds,
      },
      defects: this.deduplicateDefects(defects),
    }
  }

  simulateAllProfiles(
    profiles: SyntheticUserProfile[],
    content: SimulatedContent,
    maxSteps: number = 100,
  ): Map<string, SimulationResult> {
    const results = new Map<string, SimulationResult>()
    for (const profile of profiles) {
      results.set(profile.id, this.simulate(profile, content, maxSteps))
    }
    return results
  }

  private computeInitialComprehension(
    user: SyntheticUserProfile,
    content: SimulatedContent,
  ): number {
    const p = user.profile
    const c = content.features

    const speedMatch = 1 - Math.abs(p.speedTolerance - c.speechSpeed)
    const vocabMatch = p.vocabularyBreadth >= c.lexicalNovelty ? 1 : 1 - (c.lexicalNovelty - p.vocabularyBreadth)
    const grammarMatch = p.grammarFamiliarity >= c.grammarDensity ? 1 : 1 - (c.grammarDensity - p.grammarFamiliarity)
    const contextBoost = c.visualContextStrength * 0.2

    return Math.max(0, Math.min(1, 0.3 * speedMatch + 0.25 * vocabMatch + 0.2 * grammarMatch + contextBoost))
  }

  private decideAction(
    behavior: SyntheticBehaviorModel,
    comprehension: number,
    fatigue: number,
    subtitleEnabled: boolean,
    position: number,
    duration: number,
  ): UserAction {
    const r = this.rng()

    const effectiveAbandon = behavior.abandonProbability * (1 + fatigue) * (1 - comprehension)
    if (r < effectiveAbandon) {
      return { type: 'abandon', position }
    }

    const effectiveSkip = behavior.skipProbability * (1 - comprehension) * (1 + fatigue)
    if (r < effectiveSkip) {
      return { type: 'skip', from: position, to: Math.min(duration, position + 30) }
    }

    const effectivePause = behavior.pauseProbability * (1 + (1 - comprehension))
    if (r < effectivePause) {
      return { type: 'pause', position }
    }

    const effectiveReplay = behavior.replayProbability * (1 - comprehension) * 2
    if (r < effectiveReplay && position > 5) {
      return { type: 'replay', from: Math.max(0, position - 10), to: position }
    }

    const effectiveSubtitle = behavior.subtitleToggleProbability * (1 - comprehension)
    if (r < effectiveSubtitle) {
      return { type: 'subtitle_toggle', enabled: !subtitleEnabled }
    }

    return { type: 'continue', position }
  }

  private emitActionEvent(
    bus: TelemetryBus,
    action: UserAction,
    sessionId: string,
    contentId: string,
    timestamp: number,
  ): void {
    switch (action.type) {
      case 'pause':
        bus.emit({ type: 'Pause', timestamp, sessionId, contentId, position: action.position })
        break
      case 'resume':
        bus.emit({ type: 'Resume', timestamp, sessionId, contentId, position: action.position })
        break
      case 'replay':
        bus.emit({ type: 'Replay', timestamp, sessionId, contentId, from: action.from, to: action.to })
        break
      case 'skip':
        bus.emit({ type: 'ContentSkip', timestamp, sessionId, contentId, from: action.from, to: action.to })
        break
      case 'subtitle_toggle':
        bus.emit({ type: 'SubtitleToggle', timestamp, sessionId, contentId, enabled: action.enabled })
        break
      case 'abandon':
        break
      case 'continue':
        break
    }
  }

  private extractSignals(tracker: SessionTracker): ComprehensionSignalVector {
    const metrics = tracker.computeMetrics()
    return {
      pauseFrequency: metrics.pauseFrequency,
      replayFrequency: metrics.replayFrequency,
      subtitleToggleCount: metrics.subtitleToggleCount,
      subtitleOnRatio: metrics.subtitleOnRatio,
      playbackSpeed: metrics.playbackSpeed,
      completionRate: metrics.completionRate,
      skipSegments: [],
      dwellTimePerSegment: 30,
      abandonmentPoint: metrics.abandonmentPoint,
      transitionLatency: metrics.lastTransitionLatency,
    }
  }

  private deduplicateDefects(defects: RuntimeDefect[]): RuntimeDefect[] {
    const seen = new Set<string>()
    return defects.filter((d) => {
      const key = `${d.type}-${Math.floor(d.timestamp / 5000)}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }
}
