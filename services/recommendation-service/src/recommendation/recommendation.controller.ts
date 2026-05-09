import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { RecommendationService } from './recommendation.service'
import { IsString, IsObject, IsOptional, IsArray, ValidateNested } from 'class-validator'
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
}
