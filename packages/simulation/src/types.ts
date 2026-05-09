import type { ContentFeatureVector, UserProfileVector } from '@linguaflow/feature-space'

export interface SyntheticUserProfile {
  id: string
  name: string
  description: string
  profile: UserProfileVector
  behavior: SyntheticBehaviorModel
}

export interface SyntheticBehaviorModel {
  pauseProbability: number
  replayProbability: number
  subtitleToggleProbability: number
  skipProbability: number
  abandonProbability: number
  speedPreference: number
  fatigueRate: number
  recoveryRate: number
  comprehensionDecayRate: number
  immersionGrowthRate: number
}

export interface SimulatedContent {
  id: string
  features: ContentFeatureVector
  durationSeconds: number
}

export interface SimulationStep {
  timestamp: number
  userAction: UserAction
  runtimeState: RuntimeStateSnapshot
  comprehensionEstimate: number
  actualComprehension: number
  immersionScore: number
  cognitiveLoad: number
}

export type UserAction =
  | { type: 'pause'; position: number }
  | { type: 'resume'; position: number }
  | { type: 'replay'; from: number; to: number }
  | { type: 'skip'; from: number; to: number }
  | { type: 'subtitle_toggle'; enabled: boolean }
  | { type: 'continue'; position: number }
  | { type: 'abandon'; position: number }

export interface RuntimeStateSnapshot {
  immersionScore: number
  cognitiveLoad: number
  flowStateProbability: number
  interruptionBudget: number
}

export interface SimulationResult {
  userId: string
  contentId: string
  steps: SimulationStep[]
  finalState: {
    immersionScore: number
    cognitiveLoad: number
    comprehensionEstimate: number
    actualComprehension: number
    sessionDuration: number
  }
  defects: RuntimeDefect[]
}

export interface RuntimeDefect {
  type: DefectType
  severity: 'low' | 'medium' | 'high'
  description: string
  timestamp: number
  details: Record<string, unknown>
}

export type DefectType =
  | 'oscillation'
  | 'adaptation_instability'
  | 'feedback_loop'
  | 'stuck_in_state'
  | 'premature_interruption'
  | 'missed_interruption'
  | 'comprehension_drift'
  | 'immersion_collapse'
