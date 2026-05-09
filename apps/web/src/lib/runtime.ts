import { TelemetryBus, SessionTracker } from '@linguaflow/telemetry'
import { ImmersionRuntimeImpl } from '@linguaflow/runtime-core'
import type { ImmersionRuntime, ImmersionState } from '@linguaflow/runtime-core'
import type { RuntimeEvent, SessionMetrics } from '@linguaflow/telemetry'

let telemetryBus: TelemetryBus | null = null
let sessionTracker: SessionTracker | null = null
let immersionRuntime: ImmersionRuntime | null = null

export function initializeRuntime(): void {
  if (telemetryBus) return

  telemetryBus = new TelemetryBus()
  sessionTracker = new SessionTracker(telemetryBus)
  immersionRuntime = new ImmersionRuntimeImpl(
    {
      onMetricsUpdate: (callback: (metrics: SessionMetrics) => void) => {
        sessionTracker!.onMetricsUpdate(callback)
      },
    },
  )

  const sessionId = sessionTracker.startSession()

  telemetryBus.emit({
    type: 'SessionStarted',
    timestamp: Date.now(),
    sessionId,
  })
}

export function getTelemetryBus(): TelemetryBus {
  if (!telemetryBus) initializeRuntime()
  return telemetryBus!
}

export function getSessionTracker(): SessionTracker {
  if (!sessionTracker) initializeRuntime()
  return sessionTracker!
}

export function getImmersionRuntime(): ImmersionRuntime {
  if (!immersionRuntime) initializeRuntime()
  return immersionRuntime!
}

export function getRuntimeState(): ImmersionState {
  return getImmersionRuntime().getState()
}

export function emitEvent(event: Omit<RuntimeEvent, 'timestamp' | 'sessionId'> & { timestamp?: number; sessionId?: string }): void {
  const bus = getTelemetryBus()
  const tracker = getSessionTracker()

  const fullEvent = {
    ...event,
    timestamp: event.timestamp ?? Date.now(),
    sessionId: event.sessionId ?? (tracker as unknown as { sessionId: string | null }).sessionId ?? 'unknown',
  } as RuntimeEvent

  bus.emit(fullEvent)
}

export function destroyRuntime(): void {
  if (sessionTracker) {
    sessionTracker.endSession()
  }
  telemetryBus = null
  sessionTracker = null
  immersionRuntime = null
}
