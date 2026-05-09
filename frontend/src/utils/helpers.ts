export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${minutes}:${String(secs).padStart(2, '0')}`;
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function getDifficultyLabel(score: number): string {
  if (score <= 2) return 'Beginner';
  if (score <= 4) return 'Elementary';
  if (score <= 6) return 'Intermediate';
  if (score <= 8) return 'Upper Intermediate';
  return 'Advanced';
}

export function getLanguageName(code: string): string {
  const names: Record<string, string> = {
    en: 'English',
    ja: 'Japanese',
    ko: 'Korean',
    zh: 'Chinese',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
  };
  return names[code] ?? code;
}
