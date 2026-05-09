import api from './api';
import type { User, ApiResponse } from '../types';

export const authService = {
  login: (email: string, password: string) =>
    api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', { email, password }),

  register: (email: string, password: string, displayName: string) =>
    api.post<ApiResponse<{ user: User; token: string }>>('/auth/register', { email, password, displayName }),

  getMe: () =>
    api.get<ApiResponse<User>>('/auth/me'),

  refreshToken: () =>
    api.post<ApiResponse<{ token: string }>>('/auth/refresh'),
};
