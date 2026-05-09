export interface SessionMetrics {
  continuousInputDuration: number
  pauseIntervals: number[]
  pauseFrequency: number
  replayFrequency: number
  confirmationReplays: number
  struggleReplays: number
  subtitleToggleCount: number
  subtitleOnRatio: number
  playbackSpeed: number
  completionRate: number
  recentCompletionRate: number
  skipFrequency: number
  abandonmentPoint: number | null
  lastTransitionLatency: number
  topicContinuity: boolean
  narrativeContinuity: boolean
  difficultyJump: number
  emotionalShift: number
}
