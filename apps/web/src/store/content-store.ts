import { create } from 'zustand'
import type { ContentItem } from '@/types/content'
import { mockContent } from '@/lib/mock-content'

interface ContentFeedState {
  contentList: ContentItem[]
  currentIndex: number
  isLoading: boolean
  setCurrentIndex: (index: number) => void
  goNext: () => void
  goPrev: () => void
  setLoading: (loading: boolean) => void
}

export const useContentStore = create<ContentFeedState>((set, get) => ({
  contentList: mockContent,
  currentIndex: 0,
  isLoading: false,
  setCurrentIndex: (index: number) =>
    set({ currentIndex: Math.max(0, Math.min(index, get().contentList.length - 1)) }),
  goNext: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.contentList.length - 1),
    })),
  goPrev: () =>
    set((state) => ({
      currentIndex: Math.max(state.currentIndex - 1, 0),
    })),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}))
