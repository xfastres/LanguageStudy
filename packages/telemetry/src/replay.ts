import type { RuntimeEvent } from './events'
import { TelemetryBus } from './bus'

export interface SessionTrace {
  sessionId: string
  events: RuntimeEvent[]
  startTime: number
  endTime: number
  duration: number
}

export class ReplayEngine {
  constructor(private bus: TelemetryBus) {}

  getSessionTrace(sessionId: string): SessionTrace | null {
    const events = this.bus
      .getEventLog()
      .filter(
        (e) =>
          'sessionId' in e && e.sessionId === sessionId,
      ) as RuntimeEvent[]

    if (events.length === 0) return null

    const startTime = events[0].timestamp
    const endTime = events[events.length - 1].timestamp

    return {
      sessionId,
      events,
      startTime,
      endTime,
      duration: endTime - startTime,
    }
  }

  analyzeImmersionCollapse(trace: SessionTrace): ImmersionCollapsePoint[] {
    const collapses: ImmersionCollapsePoint[] = []
    const events = trace.events

    for (let i = 1; i < events.length; i++) {
      const prev = events[i - 1]
      const curr = events[i]

      if (curr.type === 'AppBackgrounded') {
        collapses.push({
          timestamp: curr.timestamp,
          type: 'app_switch',
          precedingEvent: prev,
        })
      }

      if (curr.type === 'ContentSkip' && prev.type === 'Pause') {
        collapses.push({
          timestamp: curr.timestamp,
          type: 'skip_after_pause',
          precedingEvent: prev,
        })
      }

      if (curr.type === 'SessionEnded') {
        const sessionDuration = (curr as { duration: number }).duration
        if (sessionDuration < 300000) {
          collapses.push({
            timestamp: curr.timestamp,
            type: 'early_abandonment',
            precedingEvent: prev,
          })
        }
      }
    }

    return collapses
  }

  analyzeCognitiveOverload(trace: SessionTrace): CognitiveOverloadPoint[] {
    const overloads: CognitiveOverloadPoint[] = []
    const events = trace.events
    let recentReplays = 0
    let recentPauses = 0
    const windowMs = 60000

    for (let i = 0; i < events.length; i++) {
      const event = events[i]
      const windowStart = event.timestamp - windowMs

      recentReplays = events
        .slice(0, i + 1)
        .filter(
          (e) =>
            e.type === 'Replay' &&
            e.timestamp >= windowStart,
        ).length

      recentPauses = events
        .slice(0, i + 1)
        .filter(
          (e) =>
            e.type === 'Pause' &&
            e.timestamp >= windowStart,
        ).length

      if (recentReplays > 3 || recentPauses > 5) {
        overloads.push({
          timestamp: event.timestamp,
          replayCount: recentReplays,
          pauseCount: recentPauses,
          triggerEvent: event,
        })
      }
    }

    return overloads
  }

  analyzeFlowBreaks(trace: SessionTrace): FlowBreakPoint[] {
    const breaks: FlowBreakPoint[] = []
    const events = trace.events

    for (let i = 1; i < events.length; i++) {
      const prev = events[i - 1]
      const curr = events[i]

      if (curr.type === 'SubtitleToggle' && (curr as { enabled: boolean }).enabled === true) {
        const timeSinceLastToggle = curr.timestamp - (prev.timestamp || 0)
        if (timeSinceLastToggle < 10000) {
          breaks.push({
            timestamp: curr.timestamp,
            type: 'subtitle_frantic_toggle',
            description: 'User rapidly toggling subtitles suggests comprehension difficulty',
          })
        }
      }

      if (curr.type === 'Pause' && prev.type === 'Replay') {
        breaks.push({
          timestamp: curr.timestamp,
          type: 'pause_after_replay',
          description: 'Pause after replay suggests struggle to understand',
        })
      }
    }

    return breaks
  }
}

export interface ImmersionCollapsePoint {
  timestamp: number
  type: 'app_switch' | 'skip_after_pause' | 'early_abandonment'
  precedingEvent: RuntimeEvent
}

export interface CognitiveOverloadPoint {
  timestamp: number
  replayCount: number
  pauseCount: number
  triggerEvent: RuntimeEvent
}

export interface FlowBreakPoint {
  timestamp: number
  type: string
  description: string
}
