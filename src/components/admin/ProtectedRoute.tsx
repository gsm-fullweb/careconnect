import { ReactNode, useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { AuthChangeEvent, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { isAdminUser } from "@/lib/authRole";

interface ProtectedRouteProps {
  children: ReactNode;
}

type AccessStatus = "checking" | "granted" | "denied";

// Eventos que NÃO devem forçar uma re-verificação — são transitórios e
// causavam o loop /admin → /admin/login → /admin ao dispararem com session
// momentaneamente nula durante refresh de token.
const IGNORED_EVENTS: AuthChangeEvent[] = [
  "INITIAL_SESSION",
  "TOKEN_REFRESHED",
  "USER_UPDATED",
  "MFA_CHALLENGE_VERIFIED",
  "PASSWORD_RECOVERY",
];

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [status, setStatus] = useState<AccessStatus>("checking");
  const location = useLocation();
  // Evita atualizar estado em componente desmontado
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const resolveAccess = async (user: User | null): Promise<AccessStatus> => {
      if (!user) return "denied";
      const admin = await isAdminUser(user);
      return admin ? "granted" : "denied";
    };

    // Verificação inicial única — fonte de verdade para o primeiro render.
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        const next = await resolveAccess(data?.session?.user ?? null);
        if (isMounted.current) setStatus(next);
      } catch (err) {
        console.error("[ProtectedRoute] Auth check failed:", err);
        if (isMounted.current) setStatus("denied");
      }
    };

    checkAuth();

    // Escuta apenas eventos explícitos de login/logout para não reagir a
    // refreshes de token que chegam com session transitoriamente nula.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (IGNORED_EVENTS.includes(event)) return;
        const next = await resolveAccess(session?.user ?? null);
        if (isMounted.current) setStatus(next);
      }
    );

    return () => {
      isMounted.current = false;
      subscription.unsubscribe();
    };
  }, []);

  // Enquanto verifica sessao/papel
  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-careconnect-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  // Sem sessao ou sem papel de admin: volta para o login administrativo
  if (status === "denied") {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Admin autenticado: libera o conteudo protegido
  return <>{children}</>;
};

export default ProtectedRoute;
