import type { ComprehensionSignalVector } from '@linguaflow/comprehension'
import type { TelemetryBus } from '@linguaflow/telemetry'
import type {
  PauseEvent,
  ReplayEvent,
  SubtitleToggleEvent,
  ContentSkipEvent,
  ContentCompletedEvent,
  SessionStartedEvent,
} from '@linguaflow/telemetry'

export class SignalCollector {
  private sessionStartTime: number = 0
  private pauseCount: number = 0
  private replayCount: number = 0
  private subtitleToggleCount: number = 0
  private subtitleOnTime: number = 0
  private subtitleOffTime: number = 0
  private lastSubtitleToggleTime: number = 0
  private subtitleEnabled: boolean = false
  private skipPositions: number[] = []
  private completedCount: number = 0
  private startedCount: number = 0
  private abandonmentPoint: number | null = null
  private currentPlaybackSpeed: number = 1.0
  private lastTransitionTime: number = 0
  private contentStartTime: number = 0
  private totalDwellTime: number = 0
  private unsubscribers: Array<() => void> = []

  constructor(private bus: TelemetryBus) {
    this.setupListeners()
  }

  startSession(): void {
    this.sessionStartTime = Date.now()
    this.pauseCount = 0
    this.replayCount = 0
    this.subtitleToggleCount = 0
    this.subtitleOnTime = 0
    this.subtitleOffTime = 0
    this.lastSubtitleToggleTime = 0
    this.subtitleEnabled = false
    this.skipPositions = []
    this.completedCount = 0
    this.startedCount = 0
    this.abandonmentPoint = null
    this.currentPlaybackSpeed = 1.0
    this.lastTransitionTime = 0
    this.contentStartTime = 0
    this.totalDwellTime = 0
  }

  getSignalVector(): ComprehensionSignalVector {
    const sessionMinutes = this.sessionStartTime > 0
      ? (Date.now() - this.sessionStartTime) / 60000
      : 1

    const totalSubtitleTime = this.subtitleOnTime + this.subtitleOffTime
    const subtitleOnRatio = totalSubtitleTime > 0
      ? this.subtitleOnTime / totalSubtitleTime
      : 0

    const completionRate = this.startedCount > 0
      ? this.completedCount / this.startedCount
      : 0

    return {
      pauseFrequency: sessionMinutes > 0 ? this.pauseCount / sessionMinutes : 0,
      replayFrequency: sessionMinutes > 0 ? this.replayCount / sessionMinutes : 0,
      subtitleToggleCount: this.subtitleToggleCount,
      subtitleOnRatio,
      playbackSpeed: this.currentPlaybackSpeed,
      completionRate,
      skipSegments: this.skipPositions,
      dwellTimePerSegment: this.startedCount > 0 ? this.totalDwellTime / this.startedCount : 0,
      abandonmentPoint: this.abandonmentPoint,
      transitionLatency: this.lastTransitionTime,
    }
  }

  destroy(): void {
    for (const unsub of this.unsubscribers) {
      unsub()
    }
    this.unsubscribers = []
  }

  private setupListeners(): void {
    this.unsubscribers.push(
      this.bus.on('Pause', (_e: PauseEvent) => {
        this.pauseCount++
      }),
    )

    this.unsubscribers.push(
      this.bus.on('Replay', (_e: ReplayEvent) => {
        this.replayCount++
      }),
    )

    this.unsubscribers.push(
      this.bus.on('SubtitleToggle', (e: SubtitleToggleEvent) => {
        this.subtitleToggleCount++
        const now = Date.now()
        if (this.lastSubtitleToggleTime > 0) {
          if (this.subtitleEnabled) {
            this.subtitleOnTime += now - this.lastSubtitleToggleTime
          } else {
            this.subtitleOffTime += now - this.lastSubtitleToggleTime
          }
        }
        this.subtitleEnabled = e.enabled
        this.lastSubtitleToggleTime = now
      }),
    )

    this.unsubscribers.push(
      this.bus.on('ContentSkip', (e: ContentSkipEvent) => {
        this.skipPositions.push(e.from)
        if (this.contentStartTime > 0) {
          this.abandonmentPoint = e.from
        }
      }),
    )

    this.unsubscribers.push(
      this.bus.on('ContentCompleted', (_e: ContentCompletedEvent) => {
        this.completedCount++
        this.startedCount++
        if (this.contentStartTime > 0) {
          this.totalDwellTime += Date.now() - this.contentStartTime
        }
        this.lastTransitionTime = this.contentStartTime > 0
          ? Date.now() - this.contentStartTime
          : 0
        this.contentStartTime = Date.now()
      }),
    )

    this.unsubscribers.push(
      this.bus.on('SessionStarted', (_e: SessionStartedEvent) => {
        this.startSession()
      }),
    )
  }
}
