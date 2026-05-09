const API_BASE_CONTENT = 'http://localhost:3001'
const API_BASE_RECOMMENDATION = 'http://localhost:3002'

export async function fetchContentFeed(userProfile?: Record<string, number>, language?: string, level?: number) {
  const params = new URLSearchParams()
  if (language) params.set('language', language)
  if (level !== undefined) params.set('level', String(level))
  const res = await fetch(`${API_BASE_CONTENT}/content/feed?${params}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return res.json()
}

export async function fetchNextRecommendation(userId: string, userProfile: Record<string, number>, candidates: Array<{ id: string; features: Record<string, number> }>, currentContentId?: string, signals?: Record<string, number>) {
  const res = await fetch(`${API_BASE_RECOMMENDATION}/recommendation/next`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, userProfile, candidates, currentContentId, signals }),
  })
  return res.json()
}

export async function adaptDifficulty(userId: string, signals: Record<string, unknown>) {
  const res = await fetch(`${API_BASE_RECOMMENDATION}/recommendation/adapt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, signals }),
  })
  return res.json()
}

export async function sendSignalEvent(userId: string, event: Record<string, unknown>) {
  await fetch(`${API_BASE_RECOMMENDATION}/signal/event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, event }),
  })
}
