import { Injectable } from '@nestjs/common'
import { recommendNext, computeAdaptation, applyCompensationInteractions } from '@linguaflow/feature-space'
import type { ContentFeatureVector, UserProfileVector, AdaptationAdjustment } from '@linguaflow/feature-space'
import { estimateComprehensionV1, createEstimate, computeDifficultyAdjustment } from '@linguaflow/comprehension'
import type { ComprehensionSignalVector, ComprehensionEstimate, DifficultyAdjustment } from '@linguaflow/comprehension'

export interface UserState {
  profile: UserProfileVector
  currentContentId: string | null
  currentContentFeatures: ContentFeatureVector | null
  comprehensionEstimate: number
  immersionScore: number
  cognitiveLoad: number
}

const DEFAULT_PROFILE: UserProfileVector = {
  speedTolerance: 0.5,
  vocabularyBreadth: 0.5,
  grammarFamiliarity: 0.5,
  subtitleReliance: 0.5,
  contextInference: 0.5,
  emotionalReceptivity: 0.5,
  narrativeFollowing: 0.5,
  sceneProcessing: 0.5,
  accentAdaptability: 0.5,
  abstractionCapacity: 0.5,
}

const DEFAULT_CONTENT_FEATURES: ContentFeatureVector = {
  speechSpeed: 0.5,
  lexicalNovelty: 0.3,
  grammarDensity: 0.3,
  subtitleDependency: 0.4,
  visualContextStrength: 0.6,
  emotionalIntensity: 0.4,
  narrativeDependency: 0.3,
  sceneComplexity: 0.3,
  accentDistance: 0.2,
  abstractionLevel: 0.2,
}

const PROFILE_DIMENSION_MAP: Record<string, keyof UserProfileVector> = {
  speechSpeed: 'speedTolerance',
  lexicalNovelty: 'vocabularyBreadth',
  grammarDensity: 'grammarFamiliarity',
  subtitleExposure: 'subtitleReliance',
  visualContextStrength: 'contextInference',
  emotionalIntensity: 'emotionalReceptivity',
  narrativeDependency: 'narrativeFollowing',
  sceneComplexity: 'sceneProcessing',
  accentDistance: 'accentAdaptability',
  abstractionLevel: 'abstractionCapacity',
}

@Injectable()
export class RecommendationService {
  private userStates: Map<string, UserState> = new Map()

  getNextContent(
    userId: string,
    profile: UserProfileVector,
    candidates: Array<{ id: string; features: ContentFeatureVector }>,
    currentContentId?: string,
    signals?: ComprehensionSignalVector,
  ): { nextContentId: string | null; comprehensionEstimate: number; iPlusOneScore: number } {
    let comprehensionEstimate = 0.5
    if (signals) {
      comprehensionEstimate = estimateComprehensionV1(signals)
    }

    const result = recommendNext(profile, candidates)

    const state: UserState = {
      profile,
      currentContentId: result?.id ?? null,
      currentContentFeatures: result?.features ?? null,
      comprehensionEstimate,
      immersionScore: 0.5,
      cognitiveLoad: 0.3,
    }
    this.userStates.set(userId, state)

    return {
      nextContentId: result?.id ?? null,
      comprehensionEstimate,
      iPlusOneScore: result?.iPlusOneScore ?? 0,
    }
  }

  getUserState(userId: string): UserState | null {
    return this.userStates.get(userId) ?? null
  }

  updateProfile(userId: string, profile: UserProfileVector): void {
    const existing = this.userStates.get(userId)
    if (existing) {
      existing.profile = profile
    } else {
      this.userStates.set(userId, {
        profile,
        currentContentId: null,
        currentContentFeatures: null,
        comprehensionEstimate: 0.5,
        immersionScore: 0.3,
        cognitiveLoad: 0.3,
      })
    }
  }

  adaptProfileFromComprehension(
    userId: string,
    signals: ComprehensionSignalVector,
    candidates: Array<{ id: string; features: ContentFeatureVector }>,
  ): { updatedProfile: UserProfileVector; comprehension: number; adjustment: DifficultyAdjustment; nextContentId: string | null; iPlusOneScore: number } {
    const existing = this.userStates.get(userId)
    const profile = existing?.profile ?? { ...DEFAULT_PROFILE }
    const currentContentFeatures = existing?.currentContentFeatures ?? { ...DEFAULT_CONTENT_FEATURES }

    const estimate: ComprehensionEstimate = createEstimate(signals)
    const adjustment: DifficultyAdjustment = computeDifficultyAdjustment(estimate)
    const adaptations: AdaptationAdjustment[] = computeAdaptation(profile, currentContentFeatures, estimate.value)
    const appliedAdaptations = applyCompensationInteractions(adaptations)

    const updatedProfile = { ...profile }
    for (const adj of appliedAdaptations) {
      const profileKey = PROFILE_DIMENSION_MAP[adj.dimension]
      if (profileKey) {
        const delta = adj.direction === 'increase' ? adj.magnitude : adj.direction === 'decrease' ? -adj.magnitude : 0
        updatedProfile[profileKey] = Math.max(0, Math.min(1, updatedProfile[profileKey] + delta))
      }
    }

    const nextResult = recommendNext(updatedProfile, candidates)

    const state: UserState = {
      profile: updatedProfile,
      currentContentId: nextResult?.id ?? null,
      currentContentFeatures: nextResult?.features ?? null,
      comprehensionEstimate: estimate.value,
      immersionScore: existing?.immersionScore ?? 0.5,
      cognitiveLoad: existing?.cognitiveLoad ?? 0.3,
    }
    this.userStates.set(userId, state)

    return {
      updatedProfile,
      comprehension: estimate.value,
      adjustment,
      nextContentId: nextResult?.id ?? null,
      iPlusOneScore: nextResult?.iPlusOneScore ?? 0,
    }
  }
}
