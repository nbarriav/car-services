import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Session } from '@supabase/supabase-js';
import { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
interface AuthContextProps {
  session: Session | null;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<string | null>;
  signup: (email: string, password: string) => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextProps>({
  session: null,
  login: async () => null,
  logout: async () => null,
  signup: async () => null,
});

export function AuthProvider() {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return error.message;
    navigate('/');
    return null;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return error.message;
    } else {
      navigate('/login');
      return null;
    }
  };

  const signup = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      return error.message;
    } else {
      navigate('/');
      return null;
    }
  };
  return (
    <AuthContext.Provider value={{ session, login, logout, signup }}>
      <Outlet />
    </AuthContext.Provider>
  );
}
