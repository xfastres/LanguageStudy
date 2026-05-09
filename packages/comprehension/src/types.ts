export interface ComprehensionSignalVector {
  pauseFrequency: number
  replayFrequency: number
  subtitleToggleCount: number
  subtitleOnRatio: number
  playbackSpeed: number
  completionRate: number
  skipSegments: number[]
  dwellTimePerSegment: number
  abandonmentPoint: number | null
  transitionLatency: number
}

export interface ComprehensionWeights {
  completionRate: number
  pauseFrequency: number
  replayFrequency: number
  subtitleDependency: number
  speedPreference: number
  abandonment: number
}

export interface ComprehensionEstimate {
  value: number
  confidence: number
  method: 'heuristic_v1' | 'heuristic_v2' | 'calibrated'
  signals: ComprehensionSignalVector
  timestamp: number
}

export interface CalibrationSample {
  predicted: number
  selfReported: number
  timestamp: number
  userId: string
  contentId: string
}

export interface CalibrationStats {
  sampleCount: number
  meanAbsoluteError: number
  correlation: number
  withinTolerance: number
}
