import type { RuntimeEvent } from '@linguaflow/telemetry'

export interface SessionTrace {
  id: string
  userId: string
  events: RuntimeEvent[]
  selfReportedComprehension?: number
  selfReportedImmersion?: number
  selfReportedFatigue?: number
  abandonmentReason?: string
  startTime: number
  endTime: number
  duration: number
}

export interface TraceDataset {
  traces: SessionTrace[]
  metadata: TraceDatasetMetadata
}

export interface TraceDatasetMetadata {
  createdAt: number
  traceCount: number
  totalDuration: number
  avgSessionDuration: number
  avgSelfReportedComprehension: number
  avgSelfReportedImmersion: number
  abandonmentRate: number
}

export interface RuntimePrediction {
  immersionScore: number
  cognitiveLoad: number
  flowStateProbability: number
  comprehensionEstimate: number
  timestamp: number
}

export interface PredictionVsTruth {
  traceId: string
  userId: string
  predicted: RuntimePrediction
  selfReported: {
    comprehension?: number
    immersion?: number
    fatigue?: number
  }
  errors: {
    comprehensionError: number | null
    immersionError: number | null
  }
}

export interface RuntimeMetricsReport {
  immersionCollapseRate: number
  flowContinuity: number
  avgRecoveryTime: number
  replayDensity: number
  subtitleDependency: number
  cognitiveOverloadFrequency: number
  avgSwitchingCost: number
  comprehensionAccuracy: number
  immersionAccuracy: number
  sampleCount: number
}

export interface GroundTruthSample {
  traceId: string
  userId: string
  timestamp: number
  predictedComprehension: number
  selfReportedComprehension: number
  predictedImmersion: number
  selfReportedImmersion: number
  contentId: string
}

export interface DriftDetectionResult {
  hasDrifted: boolean
  comprehensionDrift: number
  immersionDrift: number
  driftDirection: 'overestimate' | 'underestimate' | 'stable'
  confidence: number
  affectedSegments: DriftSegment[]
}

export interface DriftSegment {
  startTime: number
  endTime: number
  type: 'comprehension' | 'immersion'
  predictedAvg: number
  actualAvg: number
  error: number
}
