import { create } from 'zustand';
import type { Subtitle } from '../types';

interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  showSubtitles: boolean;
  showTranslatedSubtitles: boolean;
  currentSubtitle: Subtitle | null;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (currentTime: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  toggleSubtitles: () => void;
  toggleTranslatedSubtitles: () => void;
  setCurrentSubtitle: (subtitle: Subtitle | null) => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  playbackRate: 1,
  showSubtitles: true,
  showTranslatedSubtitles: false,
  currentSubtitle: null,

  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  setPlaybackRate: (playbackRate) => set({ playbackRate }),
  toggleSubtitles: () => set((state) => ({ showSubtitles: !state.showSubtitles })),
  toggleTranslatedSubtitles: () => set((state) => ({ showTranslatedSubtitles: !state.showTranslatedSubtitles })),
  setCurrentSubtitle: (currentSubtitle) => set({ currentSubtitle }),
  reset: () => set({ isPlaying: false, currentTime: 0, duration: 0, playbackRate: 1, currentSubtitle: null }),
}));
