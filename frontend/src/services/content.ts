import api from './api';
import type { InputContent, FeedItem, ApiResponse, PaginatedResponse } from '../types';

export const contentService = {
  getFeed: (page = 1, pageSize = 20) =>
    api.get<ApiResponse<PaginatedResponse<FeedItem>>>('/content/feed', { params: { page, pageSize } }),

  getContent: (id: string) =>
    api.get<ApiResponse<InputContent>>(`/content/${id}`),

  search: (query: string, page = 1, pageSize = 20) =>
    api.get<ApiResponse<PaginatedResponse<InputContent>>>('/content/search', { params: { query, page, pageSize } }),

  getByTopic: (topic: string, page = 1, pageSize = 20) =>
    api.get<ApiResponse<PaginatedResponse<InputContent>>>('/content/topic', { params: { topic, page, pageSize } }),
};
