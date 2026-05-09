import api from './api';
import type { UserProgress, Progress, ApiResponse } from '../types';

export const progressService = {
  getUserProgress: () =>
    api.get<ApiResponse<UserProgress>>('/progress'),

  recordSession: (data: Omit<Progress, 'id'>) =>
    api.post<ApiResponse<Progress>>('/progress', data),

  getHistory: (page = 1, pageSize = 20) =>
    api.get<ApiResponse<Progress[]>>('/progress/history', { params: { page, pageSize } }),
};
