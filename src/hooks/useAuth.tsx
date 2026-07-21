import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { isAdminUser } from "@/lib/authRole";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  isAdminLoading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const authRequestId = useRef(0);

  const applySession = useCallback(async (nextSession: Session | null) => {
    const requestId = authRequestId.current + 1;
    authRequestId.current = requestId;

    setSession(nextSession);
    setUser(nextSession?.user ?? null);
    setIsLoading(false);

    if (!nextSession?.user) {
      setIsAdmin(false);
      setIsAdminLoading(false);
      return;
    }

    setIsAdminLoading(true);

    try {
      const admin = await isAdminUser(nextSession.user);
      if (authRequestId.current === requestId) {
        setIsAdmin(admin);
      }
    } catch (error) {
      console.error("Falha ao validar permissao administrativa:", error);
      if (authRequestId.current === requestId) {
        setIsAdmin(false);
      }
    } finally {
      if (authRequestId.current === requestId) {
        setIsAdminLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setIsLoading(false);
      setIsAdminLoading(!!nextSession?.user);

      setTimeout(() => {
        if (isMounted) {
          void applySession(nextSession);
        }
      }, 0);
    });

    supabase.auth
      .getSession()
      .then(({ data: { session: currentSession }, error }) => {
        if (error) throw error;
        if (isMounted) {
          void applySession(currentSession);
        }
      })
      .catch((error) => {
        console.error("Falha ao recuperar sessao:", error);
        if (isMounted) {
          void applySession(null);
        }
      });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [applySession]);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await applySession(data.session);
    return data.user ?? null;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("admin-token");
    }
    await applySession(null);
  };

  const refreshSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    await applySession(data.session);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!user,
        isLoading,
        isAdmin,
        isAdminLoading,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
