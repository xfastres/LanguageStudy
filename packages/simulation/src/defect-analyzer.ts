import type { SimulationResult, RuntimeDefect, DefectType } from './types'

export interface DefectSummary {
  totalDefects: number
  byType: Record<DefectType, number>
  bySeverity: Record<string, number>
  mostCommonDefect: DefectType | null
  criticalDefects: RuntimeDefect[]
  profilesAffected: Set<string>
}

export interface CrossProfileAnalysis {
  profileResults: Map<string, SimulationResult>
  commonDefects: DefectType[]
  profileSpecificDefects: Map<string, DefectType[]>
  overallHealth: number
  recommendations: string[]
}

export class DefectAnalyzer {
  summarizeDefects(results: SimulationResult[]): DefectSummary {
    const allDefects = results.flatMap((r) => r.defects)

    const byType: Record<DefectType, number> = {
      oscillation: 0,
      adaptation_instability: 0,
      feedback_loop: 0,
      stuck_in_state: 0,
      premature_interruption: 0,
      missed_interruption: 0,
      comprehension_drift: 0,
      immersion_collapse: 0,
    }

    const bySeverity: Record<string, number> = { low: 0, medium: 0, high: 0 }

    for (const defect of allDefects) {
      byType[defect.type]++
      bySeverity[defect.severity]++
    }

    const criticalDefects = allDefects.filter((d) => d.severity === 'high')

    let mostCommonDefect: DefectType | null = null
    let maxCount = 0
    for (const [type, count] of Object.entries(byType)) {
      if (count > maxCount) {
        maxCount = count
        mostCommonDefect = type as DefectType
      }
    }

    const profilesAffected = new Set(
      results.filter((r) => r.defects.length > 0).map((r) => r.userId),
    )

    return {
      totalDefects: allDefects.length,
      byType,
      bySeverity,
      mostCommonDefect: maxCount > 0 ? mostCommonDefect : null,
      criticalDefects,
      profilesAffected,
    }
  }

  analyzeCrossProfile(
    results: Map<string, SimulationResult>,
  ): CrossProfileAnalysis {
    const allResults = Array.from(results.values())
    const summary = this.summarizeDefects(allResults)

    const defectTypesByProfile = new Map<string, Set<DefectType>>()
    for (const [profileId, result] of results) {
      const types = new Set(result.defects.map((d) => d.type))
      defectTypesByProfile.set(profileId, types)
    }

    const allTypeSets = Array.from(defectTypesByProfile.values())
    const commonDefects: DefectType[] = []
    if (allTypeSets.length > 0) {
      for (const defectType of allTypeSets[0]) {
        if (allTypeSets.every((s) => s.has(defectType))) {
          commonDefects.push(defectType)
        }
      }
    }

    const profileSpecificDefects = new Map<string, DefectType[]>()
    for (const [profileId, types] of defectTypesByProfile) {
      const specific = Array.from(types).filter(
        (t) => !commonDefects.includes(t),
      )
      profileSpecificDefects.set(profileId, specific)
    }

    const defectRatio =
      allResults.length > 0
        ? summary.totalDefects / allResults.length
        : 0
    const overallHealth = Math.max(0, 1 - defectRatio * 0.1)

    const recommendations = this.generateRecommendations(summary, commonDefects)

    return {
      profileResults: results,
      commonDefects,
      profileSpecificDefects,
      overallHealth,
      recommendations,
    }
  }

  private generateRecommendations(
    summary: DefectSummary,
    commonDefects: DefectType[],
  ): string[] {
    const recommendations: string[] = []

    if (summary.byType.oscillation > 0) {
      recommendations.push(
        'Add damping to runtime state transitions to prevent oscillation',
      )
    }

    if (summary.byType.comprehension_drift > 0) {
      recommendations.push(
        'Comprehension estimation is drifting from actual - recalibrate heuristic weights',
      )
    }

    if (summary.byType.immersion_collapse > 0) {
      recommendations.push(
        'Immersion collapse detected - investigate what triggers rapid immersion drops',
      )
    }

    if (summary.byType.adaptation_instability > 0) {
      recommendations.push(
        'Adaptation is too aggressive - reduce step size for difficulty adjustments',
      )
    }

    if (commonDefects.includes('comprehension_drift')) {
      recommendations.push(
        'Comprehension drift affects ALL profiles - this is a systemic issue, not user-specific',
      )
    }

    if (summary.bySeverity.high > 3) {
      recommendations.push(
        'Multiple high-severity defects detected - consider simplifying runtime logic before adding complexity',
      )
    }

    return recommendations
  }
}
