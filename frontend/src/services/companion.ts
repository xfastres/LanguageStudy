import api from './api';
import type { CompanionMessage, ApiResponse } from '../types';

export const companionService = {
  sendMessage: (message: string) =>
    api.post<ApiResponse<CompanionMessage>>('/companion/chat', { message }),

  getHistory: () =>
    api.get<ApiResponse<CompanionMessage[]>>('/companion/history'),
};
