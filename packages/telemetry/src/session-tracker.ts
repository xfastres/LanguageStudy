import type { RuntimeEvent } from './events'
import type { SessionMetrics } from './metrics'
import { TelemetryBus } from './bus'

export class SessionTracker {
  private sessionId: string | null = null
  private sessionStart: number = 0
  private lastPauseTime: number = 0
  private lastResumeTime: number = 0
  private pauseIntervals: number[] = []
  private subtitleOnTime: number = 0
  private subtitleOffTime: number = 0
  private lastSubtitleToggle: number = 0
  private subtitleEnabled: boolean = false
  private contentCompletedCount: number = 0
  private contentStartedCount: number = 0
  private recentCompletions: boolean[] = []
  private lastContentEnd: number = 0
  private replayCount: number = 0
  private confirmationReplays: number = 0
  private struggleReplays: number = 0
  private skipCount: number = 0
  private totalSessionTime: number = 0
  private backgroundedTime: number = 0
  private lastBackgrounded: number = 0
  private isBackgrounded: boolean = false
  private abandonmentPoint: number | null = null
  private metricsCallback: ((metrics: SessionMetrics) => void) | null = null

  constructor(private bus: TelemetryBus) {
    this.setupListeners()
  }

  onMetricsUpdate(callback: (metrics: SessionMetrics) => void): void {
    this.metricsCallback = callback
  }

  startSession(userId?: string): string {
    this.sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
    this.sessionStart = Date.now()
    this.lastResumeTime = this.sessionStart
    this.pauseIntervals = []
    this.subtitleOnTime = 0
    this.subtitleOffTime = 0
    this.replayCount = 0
    this.confirmationReplays = 0
    this.struggleReplays = 0
    this.skipCount = 0
    this.contentCompletedCount = 0
    this.contentStartedCount = 0
    this.recentCompletions = []
    this.abandonmentPoint = null
    this.isBackgrounded = false
    this.backgroundedTime = 0

    this.bus.emit({
      type: 'SessionStarted',
      timestamp: this.sessionStart,
      sessionId: this.sessionId,
      userId,
    })

    return this.sessionId
  }

  endSession(): void {
    if (!this.sessionId) return

    const now = Date.now()
    this.totalSessionTime = now - this.sessionStart

    this.bus.emit({
      type: 'SessionEnded',
      timestamp: now,
      sessionId: this.sessionId,
      duration: this.totalSessionTime,
    })

    this.sessionId = null
  }

  private setupListeners(): void {
    this.bus.on('Pause', (event) => {
      this.lastPauseTime = event.timestamp
    })

    this.bus.on('Resume', (event) => {
      if (this.lastPauseTime > 0) {
        this.pauseIntervals.push(event.timestamp - this.lastPauseTime)
        if (this.pauseIntervals.length > 100) {
          this.pauseIntervals.shift()
        }
      }
      this.lastResumeTime = event.timestamp
      this.emitMetrics()
    })

    this.bus.on('SubtitleToggle', (event) => {
      const now = event.timestamp
      if (this.lastSubtitleToggle > 0) {
        if (this.subtitleEnabled) {
          this.subtitleOnTime += now - this.lastSubtitleToggle
        } else {
          this.subtitleOffTime += now - this.lastSubtitleToggle
        }
      }
      this.subtitleEnabled = event.enabled
      this.lastSubtitleToggle = now
      this.emitMetrics()
    })

    this.bus.on('Replay', (event) => {
      this.replayCount++
      this.emitMetrics()
    })

    this.bus.on('ContentSkip', () => {
      this.skipCount++
      this.emitMetrics()
    })

    this.bus.on('AppBackgrounded', (event) => {
      this.isBackgrounded = true
      this.lastBackgrounded = event.timestamp
    })

    this.bus.on('AppForegrounded', (event) => {
      if (this.isBackgrounded && this.lastBackgrounded > 0) {
        this.backgroundedTime += event.timestamp - this.lastBackgrounded
      }
      this.isBackgrounded = false
      this.emitMetrics()
    })

    this.bus.on('ContentCompleted', () => {
      this.contentCompletedCount++
      this.recentCompletions.push(true)
      if (this.recentCompletions.length > 5) {
        this.recentCompletions.shift()
      }
      this.emitMetrics()
    })
  }

  private emitMetrics(): void {
    if (!this.metricsCallback || !this.sessionId) return
    this.metricsCallback(this.computeMetrics())
  }

  computeMetrics(): SessionMetrics {
    const now = Date.now()
    const activeTime = now - this.sessionStart - this.backgroundedTime
    const sessionMinutes = activeTime / 60000

    const pauseFrequency =
      sessionMinutes > 0 ? this.pauseIntervals.length / sessionMinutes : 0
    const replayFrequency =
      sessionMinutes > 0 ? this.replayCount / sessionMinutes : 0
    const skipFrequency =
      sessionMinutes > 0 ? this.skipCount / sessionMinutes : 0

    const totalSubtitleTime = this.subtitleOnTime + this.subtitleOffTime
    const subtitleOnRatio =
      totalSubtitleTime > 0 ? this.subtitleOnTime / totalSubtitleTime : 0

    const completionRate =
      this.contentStartedCount > 0
        ? this.contentCompletedCount / this.contentStartedCount
        : 0

    const recentCompletionRate =
      this.recentCompletions.length > 0
        ? this.recentCompletions.filter(Boolean).length /
          this.recentCompletions.length
        : 0

    const transitionLatency =
      this.lastContentEnd > 0 ? now - this.lastContentEnd : 0

    return {
      continuousInputDuration: activeTime / 1000,
      pauseIntervals: this.pauseIntervals,
      pauseFrequency,
      replayFrequency,
      confirmationReplays: this.confirmationReplays,
      struggleReplays: this.struggleReplays,
      subtitleToggleCount: this.pauseIntervals.length,
      subtitleOnRatio,
      playbackSpeed: 1,
      completionRate,
      recentCompletionRate,
      skipFrequency,
      abandonmentPoint: this.abandonmentPoint,
      lastTransitionLatency: transitionLatency,
      topicContinuity: true,
      narrativeContinuity: true,
      difficultyJump: 0,
      emotionalShift: 0,
    }
  }
}
