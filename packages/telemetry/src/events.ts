export type RuntimeEvent =
  | SessionStartedEvent
  | SessionEndedEvent
  | PauseEvent
  | ResumeEvent
  | SubtitleToggleEvent
  | ReplayEvent
  | ContentSkipEvent
  | AppBackgroundedEvent
  | AppForegroundedEvent
  | ContentCompletedEvent
  | DifficultyFeedbackEvent
  | EmotionSignalEvent
  | NativeContentEntryEvent

export interface SessionStartedEvent {
  type: 'SessionStarted'
  timestamp: number
  sessionId: string
  userId?: string
}

export interface SessionEndedEvent {
  type: 'SessionEnded'
  timestamp: number
  sessionId: string
  duration: number
}

export interface PauseEvent {
  type: 'Pause'
  timestamp: number
  sessionId: string
  contentId: string
  position: number
}

export interface ResumeEvent {
  type: 'Resume'
  timestamp: number
  sessionId: string
  contentId: string
  position: number
}

export interface SubtitleToggleEvent {
  type: 'SubtitleToggle'
  timestamp: number
  sessionId: string
  contentId: string
  enabled: boolean
}

export interface ReplayEvent {
  type: 'Replay'
  timestamp: number
  sessionId: string
  contentId: string
  from: number
  to: number
}

export interface ContentSkipEvent {
  type: 'ContentSkip'
  timestamp: number
  sessionId: string
  contentId: string
  from: number
  to: number
}

export interface AppBackgroundedEvent {
  type: 'AppBackgrounded'
  timestamp: number
  sessionId: string
}

export interface AppForegroundedEvent {
  type: 'AppForegrounded'
  timestamp: number
  sessionId: string
}

export interface ContentCompletedEvent {
  type: 'ContentCompleted'
  timestamp: number
  sessionId: string
  contentId: string
  duration: number
}

export interface DifficultyFeedbackEvent {
  type: 'DifficultyFeedback'
  timestamp: number
  sessionId: string
  contentId: string
  comprehension: number
  source: 'self_report' | 'inferred'
}

export interface EmotionSignalEvent {
  type: 'EmotionSignal'
  timestamp: number
  sessionId: string
  emotion: 'anxiety' | 'focus' | 'pleasure' | 'fatigue' | 'frustration'
  intensity: number
  source: 'behavioral' | 'self_report'
}

export interface NativeContentEntryEvent {
  type: 'NativeContentEntry'
  timestamp: number
  sessionId: string
  contentId: string
  source: 'search' | 'recommendation' | 'external'
}
