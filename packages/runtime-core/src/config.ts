import type { RuntimeConfig } from './types'

export const DEFAULT_RUNTIME_CONFIG: RuntimeConfig = {
  immersionScoreWeights: {
    sessionContinuity: 0.25,
    pauseVariance: 0.20,
    replayPattern: 0.15,
    subtitleStability: 0.15,
    switchingLatency: 0.10,
    completionMomentum: 0.15,
  },
  cognitiveLoadWeights: {
    pauseFrequency: 0.25,
    replayFrequency: 0.20,
    subtitleDependency: 0.20,
    speedReduction: 0.15,
    skipFrequency: 0.10,
    abandonmentProximity: 0.10,
  },
  flowStateThresholds: {
    highImmersion: 0.7,
    lowLoad: 0.4,
    stablePace: 0.3,
    longSession: 0.6,
  },
  interruptionThresholds: {
    flowBlock: 0.8,
    deepImmersionBlock: 0.6,
    moderateImmersionLimit: 0.3,
  },
}
