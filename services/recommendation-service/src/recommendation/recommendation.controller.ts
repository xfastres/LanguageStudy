import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { RecommendationService } from './recommendation.service'
import { IsString, IsObject, IsOptional, IsArray } from 'class-validator'
import type { UserProfileVector, ContentFeatureVector } from '@linguaflow/feature-space'
import type { ComprehensionSignalVector } from '@linguaflow/comprehension'

class NextContentRequestDto {
  @IsString()
  userId!: string

  @IsObject()
  userProfile!: Record<string, number>

  @IsArray()
  candidates!: Array<{ id: string; features: Record<string, number> }>

  @IsOptional()
  @IsString()
  currentContentId?: string

  @IsOptional()
  @IsObject()
  signals?: Record<string, number>
}

class UpdateProfileDto {
  @IsObject()
  userProfile!: Record<string, number>
}

class AdaptRequestDto {
  @IsString()
  userId!: string

  @IsObject()
  signals!: Record<string, unknown>

  @IsOptional()
  @IsArray()
  candidates?: Array<{ id: string; features: Record<string, number> }>
}

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Post('next')
  async getNextContent(@Body() dto: NextContentRequestDto) {
    const result = this.recommendationService.getNextContent(
      dto.userId,
      dto.userProfile as unknown as UserProfileVector,
      dto.candidates.map((c) => ({
        id: c.id,
        features: c.features as unknown as ContentFeatureVector,
      })),
      dto.currentContentId,
      dto.signals as unknown as ComprehensionSignalVector | undefined,
    )
    return result
  }

  @Get('state/:userId')
  async getUserState(@Param('userId') userId: string) {
    const state = this.recommendationService.getUserState(userId)
    return state ?? { profile: null, comprehensionEstimate: 0, immersionScore: 0, cognitiveLoad: 0 }
  }

  @Post('profile/:userId')
  async updateProfile(@Param('userId') userId: string, @Body() dto: UpdateProfileDto) {
    this.recommendationService.updateProfile(userId, dto.userProfile as unknown as UserProfileVector)
    return { ok: true }
  }

  @Post('adapt')
  async adaptDifficulty(@Body() dto: AdaptRequestDto) {
    const signals = dto.signals as unknown as ComprehensionSignalVector
    const candidates = (dto.candidates ?? []).map((c) => ({
      id: c.id,
      features: c.features as unknown as ContentFeatureVector,
    }))

    const result = this.recommendationService.adaptProfileFromComprehension(
      dto.userId,
      signals,
      candidates,
    )

    return {
      comprehension: result.comprehension,
      adjustment: result.adjustment,
      nextContentId: result.nextContentId,
      iPlusOneScore: result.iPlusOneScore,
      updatedProfile: result.updatedProfile,
    }
  }
}
