import { useContentStore } from '../stores/contentStore';
import { contentService } from '../services/content';
import type { InputContent } from '../types';

export function useContent() {
  const { feed, currentContent, isLoading, setFeed, setCurrentContent, appendFeed } = useContentStore();

  const fetchFeed = async (page = 1, pageSize = 20) => {
    const { data } = await contentService.getFeed(page, pageSize);
    if (data?.data?.items) {
      if (page === 1) {
        setFeed(data.data.items);
      } else {
        appendFeed(data.data.items);
      }
    }
    return data;
  };

  const fetchContent = async (id: string): Promise<InputContent | null> => {
    const { data } = await contentService.getContent(id);
    const content = data?.data ?? null;
    if (content) {
      setCurrentContent(content);
    }
    return content;
  };

  const searchContent = async (query: string, page = 1) => {
    const { data } = await contentService.search(query, page);
    return data;
  };

  return {
    feed,
    currentContent,
    isLoading,
    fetchFeed,
    fetchContent,
    searchContent,
    setFeed,
    setCurrentContent,
  };
}
