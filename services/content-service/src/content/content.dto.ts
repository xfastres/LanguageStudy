import { IsString, IsOptional, IsEnum, IsNumber, IsObject, IsArray, Min, Max, IsUrl } from 'class-validator'

export class CreateContentDto {
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description?: string

  @IsEnum(['en', 'ja', 'ko'])
  language: 'en' | 'ja' | 'ko'

  @IsNumber()
  @Min(0)
  @Max(2)
  level: number

  @IsUrl()
  videoUrl: string

  @IsOptional()
  @IsUrl()
  thumbnailUrl?: string

  @IsOptional()
  @IsUrl()
  subtitleUrl?: string

  @IsNumber()
  @Min(1)
  durationSeconds: number

  @IsObject()
  features: Record<string, number>

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[]
}

export class FeedQueryDto {
  @IsOptional()
  @IsObject()
  userProfile?: Record<string, number>

  @IsOptional()
  @IsEnum(['en', 'ja', 'ko'])
  language?: 'en' | 'ja' | 'ko'

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  level?: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number
}

export class ComprehensionFeedbackDto {
  @IsNumber()
  @Min(0)
  @Max(1)
  comprehension: number

  @IsOptional()
  @IsString()
  source?: 'self_report' | 'inferred'
}
