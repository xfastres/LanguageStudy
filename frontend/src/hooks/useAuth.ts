import { useAuthStore } from '../stores/authStore';
import { authService } from '../services/auth';
import type { User } from '../types';

export function useAuth() {
  const { user, isAuthenticated, isLoading, login, register, logout, checkAuth } = useAuthStore();

  const loginWithEmail = async (email: string, password: string): Promise<User> => {
    await login(email, password);
    return useAuthStore.getState().user!;
  };

  const registerWithEmail = async (email: string, password: string, displayName: string): Promise<User> => {
    await register(email, password, displayName);
    return useAuthStore.getState().user!;
  };

  const fetchCurrentUser = async () => {
    const { data } = await authService.getMe();
    return data;
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    loginWithEmail,
    registerWithEmail,
    logout,
    checkAuth,
    fetchCurrentUser,
  };
}
