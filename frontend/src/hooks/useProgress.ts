import { useProgressStore } from '../stores/progressStore';
import { progressService } from '../services/progress';
import type { UserProgress, Progress } from '../types';

export function useProgress() {
  const { userProgress, recentSessions, isLoading, setUserProgress, setRecentSessions } = useProgressStore();

  const fetchUserProgress = async (): Promise<UserProgress | null> => {
    const { data } = await progressService.getUserProgress();
    const progress = data?.data ?? null;
    if (progress) {
      setUserProgress(progress);
    }
    return progress;
  };

  const recordSession = async (session: Omit<Progress, 'id'>): Promise<Progress | null> => {
    const { data } = await progressService.recordSession(session);
    return data?.data ?? null;
  };

  const fetchHistory = async (page = 1, pageSize = 20): Promise<Progress[]> => {
    const { data } = await progressService.getHistory(page, pageSize);
    const sessions = data?.data ?? [];
    setRecentSessions(sessions);
    return sessions;
  };

  return {
    userProgress,
    recentSessions,
    isLoading,
    fetchUserProgress,
    recordSession,
    fetchHistory,
  };
}
