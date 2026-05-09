import type { ContentFeatureVector } from '@linguaflow/feature-space'

export interface ContentItem {
  id: string
  videoUrl: string
  subtitleUrl: string
  features: ContentFeatureVector
  level: number
  language: string
  title: string
  description: string
  duration: number
  thumbnailUrl: string
}
