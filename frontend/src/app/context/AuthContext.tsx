import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, registerDonor as apiRegister, logout as apiLogout, getMe } from '../../api/auth.api';
import type { User, LoginDto, RegisterDonorDto } from '../../types';

const USER_KEY = 'dona_user';

function saveUser(user: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearUser() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem('access_token');
}

function loadCachedUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (dto: LoginDto) => Promise<void>;
  register: (dto: RegisterDonorDto) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadCachedUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      setLoading(false);
      return;
    }

    // Token exists → validate in background. Keep cached user visible while we wait.
    getMe()
      .then((fresh) => {
        setUser(fresh);
        saveUser(fresh);
      })
      .catch((err: any) => {
        // Only evict session on an explicit 401 (bad/expired token).
        // Network errors or 5xx (backend restarting) keep the cached user alive.
        if (err?.status === 401) {
          clearUser();
          setUser(null);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(dto: LoginDto) {
    const tokens = await apiLogin(dto);
    setUser(tokens.user);
    saveUser(tokens.user);
  }

  async function register(dto: RegisterDonorDto) {
    const tokens = await apiRegister(dto);
    setUser(tokens.user);
    saveUser(tokens.user);
  }

  function logout() {
    apiLogout();
    clearUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
