import type {
  CalibrationSample,
  CalibrationStats,
  ComprehensionWeights,
} from './types'
import { DEFAULT_COMPREHENSION_WEIGHTS, CALIBRATION_TOLERANCE, MIN_CALIBRATION_SAMPLES } from './config'

export class CalibrationStore {
  private samples: CalibrationSample[] = []

  addSample(sample: CalibrationSample): void {
    this.samples.push(sample)
  }

  getSamples(): CalibrationSample[] {
    return [...this.samples]
  }

  getSampleCount(): number {
    return this.samples.length
  }

  computeStats(): CalibrationStats {
    if (this.samples.length === 0) {
      return {
        sampleCount: 0,
        meanAbsoluteError: 1,
        correlation: 0,
        withinTolerance: 0,
      }
    }

    const errors = this.samples.map(
      (s) => Math.abs(s.predicted - s.selfReported),
    )

    const meanAbsoluteError =
      errors.reduce((a, b) => a + b, 0) / errors.length

    const withinTolerance =
      errors.filter((e) => e <= CALIBRATION_TOLERANCE).length /
      errors.length

    const correlation = this.computeCorrelation()

    return {
      sampleCount: this.samples.length,
      meanAbsoluteError,
      correlation,
      withinTolerance,
    }
  }

  isCalibrated(): boolean {
    if (this.samples.length < MIN_CALIBRATION_SAMPLES) return false
    const stats = this.computeStats()
    return stats.withinTolerance >= 0.85
  }

  suggestWeightAdjustments(): Partial<ComprehensionWeights> {
    if (this.samples.length < MIN_CALIBRATION_SAMPLES) {
      return DEFAULT_COMPREHENSION_WEIGHTS
    }

    const overestimates = this.samples.filter(
      (s) => s.predicted > s.selfReported + CALIBRATION_TOLERANCE,
    )
    const underestimates = this.samples.filter(
      (s) => s.predicted < s.selfReported - CALIBRATION_TOLERANCE,
    )

    const adjustments: Partial<ComprehensionWeights> = {}

    if (overestimates.length > underestimates.length * 2) {
      adjustments.abandonment = DEFAULT_COMPREHENSION_WEIGHTS.abandonment + 0.05
      adjustments.pauseFrequency = DEFAULT_COMPREHENSION_WEIGHTS.pauseFrequency + 0.05
    } else if (underestimates.length > overestimates.length * 2) {
      adjustments.completionRate = DEFAULT_COMPREHENSION_WEIGHTS.completionRate + 0.05
      adjustments.speedPreference = DEFAULT_COMPREHENSION_WEIGHTS.speedPreference + 0.03
    }

    return adjustments
  }

  private computeCorrelation(): number {
    if (this.samples.length < 2) return 0

    const predicted = this.samples.map((s) => s.predicted)
    const actual = this.samples.map((s) => s.selfReported)

    const n = predicted.length
    const sumP = predicted.reduce((a, b) => a + b, 0)
    const sumA = actual.reduce((a, b) => a + b, 0)
    const sumPA = predicted.reduce((sum, p, i) => sum + p * actual[i], 0)
    const sumP2 = predicted.reduce((sum, p) => sum + p * p, 0)
    const sumA2 = actual.reduce((sum, a) => sum + a * a, 0)

    const numerator = n * sumPA - sumP * sumA
    const denominator = Math.sqrt(
      (n * sumP2 - sumP * sumP) * (n * sumA2 - sumA * sumA),
    )

    if (denominator === 0) return 0
    return numerator / denominator
  }
}
