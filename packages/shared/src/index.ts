export interface ContentItem {
  id: string
  title: string
  description?: string
  language: 'en' | 'ja' | 'ko'
  level: number
  videoUrl: string
  thumbnailUrl?: string
  subtitleUrl?: string
  durationSeconds: number
  features: Record<string, number>
  tags?: string[]
}

export interface FeedRequest {
  userProfile: Record<string, number>
  language?: 'en' | 'ja' | 'ko'
  level?: number
  limit?: number
}

export interface FeedResponse {
  items: ContentItem[]
  total: number
}

export interface SignalEvent {
  userId: string
  event: Record<string, unknown>
}

export interface UserState {
  profile: Record<string, number> | null
  currentContentId: string | null
  comprehensionEstimate: number
  immersionScore: number
  cognitiveLoad: number
}
