import api from './api';
import type { CommunityPost, CommunityGroup, ApiResponse, PaginatedResponse } from '../types';

export const communityService = {
  getPosts: (page = 1, pageSize = 20) =>
    api.get<ApiResponse<PaginatedResponse<CommunityPost>>>('/community/posts', { params: { page, pageSize } }),

  createPost: (content: string, relatedContentId?: string) =>
    api.post<ApiResponse<CommunityPost>>('/community/posts', { content, relatedContentId }),

  getGroups: (page = 1, pageSize = 20) =>
    api.get<ApiResponse<PaginatedResponse<CommunityGroup>>>('/community/groups', { params: { page, pageSize } }),

  joinGroup: (groupId: string) =>
    api.post<ApiResponse<void>>(`/community/groups/${groupId}/join`),
};
