import type {
  GroundTruthSample,
  DriftDetectionResult,
  DriftSegment,
} from './types'

export class DriftDetector {
  private samples: GroundTruthSample[] = []

  addSample(sample: GroundTruthSample): void {
    this.samples.push(sample)
  }

  addSamples(samples: GroundTruthSample[]): void {
    this.samples.push(...samples)
  }

  detectDrift(windowSize: number = 50): DriftDetectionResult {
    if (this.samples.length < windowSize) {
      return {
        hasDrifted: false,
        comprehensionDrift: 0,
        immersionDrift: 0,
        driftDirection: 'stable',
        confidence: 0,
        affectedSegments: [],
      }
    }

    const recent = this.samples.slice(-windowSize)
    const older = this.samples.slice(
      Math.max(0, this.samples.length - windowSize * 2),
      this.samples.length - windowSize,
    )

    if (older.length === 0) {
      return {
        hasDrifted: false,
        comprehensionDrift: 0,
        immersionDrift: 0,
        driftDirection: 'stable',
        confidence: 0,
        affectedSegments: [],
      }
    }

    const recentCompError = this.avgError(recent, 'comprehension')
    const olderCompError = this.avgError(older, 'comprehension')
    const comprehensionDrift = recentCompError - olderCompError

    const recentImmError = this.avgError(recent, 'immersion')
    const olderImmError = this.avgError(older, 'immersion')
    const immersionDrift = recentImmError - olderImmError

    const hasDrifted =
      Math.abs(comprehensionDrift) > 0.05 ||
      Math.abs(immersionDrift) > 0.05

    const avgDrift = (comprehensionDrift + immersionDrift) / 2
    const driftDirection: DriftDetectionResult['driftDirection'] =
      avgDrift > 0.05
        ? 'overestimate'
        : avgDrift < -0.05
          ? 'underestimate'
          : 'stable'

    const affectedSegments = this.findDriftSegments(recent)

    const confidence = Math.min(
      1,
      recent.length / windowSize,
    )

    return {
      hasDrifted,
      comprehensionDrift,
      immersionDrift,
      driftDirection,
      confidence,
      affectedSegments,
    }
  }

  getSampleCount(): number {
    return this.samples.length
  }

  private avgError(
    samples: GroundTruthSample[],
    type: 'comprehension' | 'immersion',
  ): number {
    if (samples.length === 0) return 0

    const errors = samples.map((s) => {
      if (type === 'comprehension') {
        return Math.abs(s.predictedComprehension - s.selfReportedComprehension)
      }
      return Math.abs(s.predictedImmersion - s.selfReportedImmersion)
    })

    return errors.reduce((a, b) => a + b, 0) / errors.length
  }

  private findDriftSegments(
    samples: GroundTruthSample[],
  ): DriftSegment[] {
    const segments: DriftSegment[] = []
    const sortedByTime = [...samples].sort((a, b) => a.timestamp - b.timestamp)

    let segmentStart = 0
    let currentType: 'comprehension' | 'immersion' | null = null

    for (let i = 0; i < sortedByTime.length; i++) {
      const s = sortedByTime[i]
      const compError = Math.abs(
        s.predictedComprehension - s.selfReportedComprehension,
      )
      const immError = Math.abs(
        s.predictedImmersion - s.selfReportedImmersion,
      )

      const dominantType: 'comprehension' | 'immersion' =
        compError > immError ? 'comprehension' : 'immersion'
      const dominantError = Math.max(compError, immError)

      if (dominantError > 0.2) {
        if (currentType !== dominantType && segmentStart < i) {
          if (currentType !== null) {
            this.pushSegment(
              segments,
              sortedByTime,
              segmentStart,
              i - 1,
              currentType,
            )
          }
          segmentStart = i
          currentType = dominantType
        } else if (currentType === null) {
          segmentStart = i
          currentType = dominantType
        }
      } else {
        if (currentType !== null) {
          this.pushSegment(
            segments,
            sortedByTime,
            segmentStart,
            i - 1,
            currentType,
          )
          currentType = null
          segmentStart = i
        }
      }
    }

    if (currentType !== null) {
      this.pushSegment(
        segments,
        sortedByTime,
        segmentStart,
        sortedByTime.length - 1,
        currentType,
      )
    }

    return segments
  }

  private pushSegment(
    segments: DriftSegment[],
    samples: GroundTruthSample[],
    start: number,
    end: number,
    type: 'comprehension' | 'immersion',
  ): void {
    const slice = samples.slice(start, end + 1)
    if (slice.length === 0) return

    const predictedAvg =
      type === 'comprehension'
        ? slice.reduce((s, x) => s + x.predictedComprehension, 0) / slice.length
        : slice.reduce((s, x) => s + x.predictedImmersion, 0) / slice.length

    const actualAvg =
      type === 'comprehension'
        ? slice.reduce((s, x) => s + x.selfReportedComprehension, 0) / slice.length
        : slice.reduce((s, x) => s + x.selfReportedImmersion, 0) / slice.length

    segments.push({
      startTime: slice[0].timestamp,
      endTime: slice[slice.length - 1].timestamp,
      type,
      predictedAvg,
      actualAvg,
      error: Math.abs(predictedAvg - actualAvg),
    })
  }
}
