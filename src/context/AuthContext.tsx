import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types/domain';
import { MOCK_USER } from '../data/mockUser';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string, autoLogin: boolean) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = 'billycash_app_auth';
const AUTO_LOGIN_KEY = 'billycash_app_auto_login';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const autoLogin = localStorage.getItem(AUTO_LOGIN_KEY) === 'true';
      if (!autoLogin) return null;
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (email: string, _password: string, autoLogin: boolean): boolean => {
    const mockUser = { ...MOCK_USER, email };
    setUser(mockUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    localStorage.setItem(AUTO_LOGIN_KEY, autoLogin ? 'true' : 'false');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(AUTO_LOGIN_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
