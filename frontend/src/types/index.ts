export type Language = 'en' | 'ja' | 'ko' | 'zh' | 'es' | 'fr' | 'de';

export type ContentFormat = 'video' | 'audio' | 'animation' | 'dialogue' | 'podcast' | 'vlog';

export type InputZone = 'slow_visual' | 'daily_scene' | 'native';

export type TopicTag = 'food' | 'travel' | 'work' | 'science' | 'daily' | 'music' | 'sports' | 'culture' | 'tech' | 'nature';

export interface User {
  id: string;
  email: string;
  displayName: string;
  nativeLanguage: Language;
  targetLanguage: Language;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserAcquisitionProfile {
  id: string;
  userId: string;
  targetLanguage: Language;
  inputZone: InputZone;
  knownWords: number;
  listeningHours: number;
  grammarAcquisitionLevel: number;
  speechSpeedTolerance: number;
  topicFamiliarity: Record<string, number>;
  visualDependency: number;
  subtitleDependency: number;
  acquiredStructures: string[];
  activeExpressions: string[];
  passiveVocabulary: number;
  fatiguePattern: Record<string, number>;
  preferredInputTypes: ContentFormat[];
  interestTopics: TopicTag[];
  comprehensionWindow: { min: number; max: number };
  createdAt: string;
  updatedAt: string;
}

export interface ContentFeatures {
  id: string;
  contentId: string;
  speechRate: number;
  vocabComplexity: number;
  sentenceComplexity: number;
  abstractness: number;
  subtitleDependency: number;
  visualSupportStrength: number;
  topicTags: TopicTag[];
  duration: number;
  difficultyScore: number;
}

export interface InputContent {
  id: string;
  title: string;
  description: string;
  format: ContentFormat;
  language: Language;
  originalUrl: string;
  slowVersionUrl?: string;
  simplifiedVersionUrl?: string;
  thumbnailUrl?: string;
  waveformUrl?: string;
  subtitles: Subtitle[];
  translatedSubtitles: Subtitle[];
  features: ContentFeatures;
  expressions: Expression[];
  topicTags: TopicTag[];
  visualSupportLevel: number;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface Subtitle {
  id: string;
  contentId: string;
  index: number;
  startTime: number;
  endTime: number;
  text: string;
  words?: SubtitleWord[];
}

export interface SubtitleWord {
  text: string;
  startTime: number;
  endTime: number;
  definition?: string;
  contextExample?: string;
}

export interface Expression {
  id: string;
  text: string;
  contextSentence: string;
  contextContentId: string;
  contextTimestamp: number;
  frequency: number;
  type: 'vocabulary' | 'phrase' | 'grammar';
  usageExamples: string[];
}

export interface BehaviorSignals {
  replayCount: number;
  subtitleUsage: number;
  pauseFrequency: number;
  shadowingBehavior: number;
  quickComprehensionChecks: number[];
  selfRating: number;
  sessionCompletion: number;
  sessionDurationSeconds: number;
}

export interface Progress {
  id: string;
  userId: string;
  contentId: string;
  effectiveMinutes: number;
  behaviorSignals: BehaviorSignals;
  comprehensionScore: number;
  completedAt: string;
}

export interface UserProgress {
  totalEffectiveMinutes: number;
  todayEffectiveMinutes: number;
  streakDays: number;
  inputZone: InputZone;
  recentSessions: Progress[];
}

export interface Achievement {
  id: string;
  type: 'milestone' | 'streak' | 'zone_expansion';
  title: string;
  description: string;
  icon: string;
  threshold: number;
  unit: string;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  achievedAt: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatarUrl?: string;
  content: string;
  relatedContentId?: string;
  relatedContentTitle?: string;
  resonanceCount: number;
  encouragementCount: number;
  recommendationCount: number;
  createdAt: string;
}

export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  targetLanguage: Language;
  topicTags: TopicTag[];
  memberCount: number;
  createdAt: string;
}

export interface CompanionMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface FeedItem {
  content: InputContent;
  comprehensionScore: number;
  reason?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
