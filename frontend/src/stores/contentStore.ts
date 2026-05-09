import { create } from 'zustand';
import type { InputContent, FeedItem } from '../types';

interface ContentState {
  feed: FeedItem[];
  currentContent: InputContent | null;
  isLoading: boolean;
  setFeed: (feed: FeedItem[]) => void;
  setCurrentContent: (content: InputContent | null) => void;
  appendFeed: (items: FeedItem[]) => void;
  clear: () => void;
}

export const useContentStore = create<ContentState>((set) => ({
  feed: [],
  currentContent: null,
  isLoading: false,

  setFeed: (feed) => set({ feed }),
  setCurrentContent: (currentContent) => set({ currentContent }),
  appendFeed: (items) => set((state) => ({ feed: [...state.feed, ...items] })),
  clear: () => set({ feed: [], currentContent: null }),
}));
