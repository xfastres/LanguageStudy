export interface ImmersionState {
  immersionScore: number
  cognitiveLoad: number
  interruptionBudget: number
  flowStateProbability: number
  timestamp: number
}

export interface ImmersionRuntime {
  readonly immersionScore: number
  readonly cognitiveLoad: number
  readonly interruptionBudget: number
  readonly flowStateProbability: number
  canInterrupt(): boolean
  scheduleTransition(transition: PendingTransition): void
  estimateSwitchingCost(transition: PendingTransition): number
  getState(): ImmersionState
}

export interface PendingTransition {
  type: 'content' | 'mode' | 'ui' | 'notification'
  metadata?: Record<string, unknown>
}

export interface TransitionDecision {
  execute: boolean
  delay: number
  reason: string
  estimatedCost: number
}

export interface RuntimeConfig {
  immersionScoreWeights: ImmersionScoreWeights
  cognitiveLoadWeights: CognitiveLoadWeights
  flowStateThresholds: FlowStateThresholds
  interruptionThresholds: InterruptionThresholds
}

export interface ImmersionScoreWeights {
  sessionContinuity: number
  pauseVariance: number
  replayPattern: number
  subtitleStability: number
  switchingLatency: number
  completionMomentum: number
}

export interface CognitiveLoadWeights {
  pauseFrequency: number
  replayFrequency: number
  subtitleDependency: number
  speedReduction: number
  skipFrequency: number
  abandonmentProximity: number
}

export interface FlowStateThresholds {
  highImmersion: number
  lowLoad: number
  stablePace: number
  longSession: number
}

export interface InterruptionThresholds {
  flowBlock: number
  deepImmersionBlock: number
  moderateImmersionLimit: number
}
