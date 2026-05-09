import { describe, it, expect } from 'vitest'
import { CalibrationStore } from '../calibration'

describe('CalibrationStore', () => {
  it('starts uncalibrated', () => {
    const store = new CalibrationStore()
    expect(store.isCalibrated()).toBe(false)
    expect(store.getSampleCount()).toBe(0)
  })

  it('accumulates samples', () => {
    const store = new CalibrationStore()
    store.addSample({
      predicted: 0.8,
      selfReported: 0.85,
      timestamp: Date.now(),
      userId: 'user_1',
      contentId: 'content_1',
    })
    expect(store.getSampleCount()).toBe(1)
  })

  it('computes calibration stats', () => {
    const store = new CalibrationStore()
    for (let i = 0; i < 30; i++) {
      store.addSample({
        predicted: 0.8 + (Math.random() - 0.5) * 0.1,
        selfReported: 0.8 + (Math.random() - 0.5) * 0.1,
        timestamp: Date.now() + i,
        userId: `user_${i}`,
        contentId: `content_${i}`,
      })
    }
    const stats = store.computeStats()
    expect(stats.sampleCount).toBe(30)
    expect(stats.meanAbsoluteError).toBeGreaterThanOrEqual(0)
    expect(stats.withinTolerance).toBeGreaterThanOrEqual(0)
  })

  it('becomes calibrated with enough accurate samples', () => {
    const store = new CalibrationStore()
    for (let i = 0; i < 50; i++) {
      const predicted = 0.8 + (Math.random() - 0.5) * 0.05
      store.addSample({
        predicted,
        selfReported: predicted + (Math.random() - 0.5) * 0.05,
        timestamp: Date.now() + i,
        userId: `user_${i}`,
        contentId: `content_${i}`,
      })
    }
    expect(store.isCalibrated()).toBe(true)
  })
})
