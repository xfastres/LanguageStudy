import { Injectable } from '@nestjs/common'
import { recommendNext } from '@linguaflow/feature-space'
import type { ContentFeatureVector, UserProfileVector } from '@linguaflow/feature-space'
import { estimateComprehensionV1 } from '@linguaflow/comprehension'
import type { ComprehensionSignalVector } from '@linguaflow/comprehension'

export interface UserState {
  profile: UserProfileVector
  currentContentId: string | null
  comprehensionEstimate: number
  immersionScore: number
  cognitiveLoad: number
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
        comprehensionEstimate: 0.5,
        immersionScore: 0.3,
        cognitiveLoad: 0.3,
      })
    }
  }
}
