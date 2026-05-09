import { create } from 'zustand';
import type { UserProgress, Progress } from '../types';

interface ProgressState {
  userProgress: UserProgress | null;
  recentSessions: Progress[];
  isLoading: boolean;
  setUserProgress: (progress: UserProgress) => void;
  setRecentSessions: (sessions: Progress[]) => void;
  clear: () => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  userProgress: null,
  recentSessions: [],
  isLoading: false,

  setUserProgress: (userProgress) => set({ userProgress }),
  setRecentSessions: (recentSessions) => set({ recentSessions }),
  clear: () => set({ userProgress: null, recentSessions: [] }),
}));
