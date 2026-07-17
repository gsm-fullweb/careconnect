import { ReactNode, useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { isAdminUser } from "@/lib/authRole";

interface ProtectedRouteProps {
  children: ReactNode;
}

type AccessStatus = "checking" | "granted" | "denied";

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [status, setStatus] = useState<AccessStatus>("checking");
  const location = useLocation();
  // Evita atualizar estado em componente desmontado
  const isMounted = useRef(true);
  // Uma vez concedido acesso, não revoga exceto em logout explícito
  const accessGrantedRef = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    const resolveAccess = async (user: User | null): Promise<AccessStatus> => {
      if (!user) return "denied";
      try {
        const admin = await isAdminUser(user);
        return admin ? "granted" : "denied";
      } catch (err) {
        // Se a verificação de papel falhar (ex: RLS, rede), mantém o acesso
        // se já foi concedido — evita logout espúrio por falha transitória.
        console.error("[ProtectedRoute] Erro ao verificar papel admin:", err);
        return accessGrantedRef.current ? "granted" : "denied";
      }
    };

    // Verificação inicial única — fonte de verdade para o primeiro render.
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        const next = await resolveAccess(data?.session?.user ?? null);
        if (isMounted.current) {
          accessGrantedRef.current = next === "granted";
          setStatus(next);
        }
      } catch (err) {
        console.error("[ProtectedRoute] Auth check failed:", err);
        if (isMounted.current) setStatus("denied");
      }
    };

    checkAuth();

    // Só reage ao SIGNED_OUT (logout explícito) e SIGNED_IN (novo login).
    // Qualquer outro evento (TOKEN_REFRESHED, USER_UPDATED, INITIAL_SESSION,
    // etc.) é ignorado para evitar loop /admin → /admin/login durante
    // operações de banco de dados que disparam refreshes de token.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Logout explícito: revoga o acesso imediatamente
        if (event === "SIGNED_OUT") {
          accessGrantedRef.current = false;
          if (isMounted.current) setStatus("denied");
          return;
        }

        // Novo login: re-verifica o papel
        if (event === "SIGNED_IN") {
          const next = await resolveAccess(session?.user ?? null);
          if (isMounted.current) {
            accessGrantedRef.current = next === "granted";
            setStatus(next);
          }
          return;
        }

        // Todos os outros eventos (TOKEN_REFRESHED, USER_UPDATED, etc.)
        // são ignorados — o acesso continua como está.
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

  // Sem sessao ou sem papel de admin: usa o login unico e preserva o destino.
  if (status === "denied") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admin autenticado: libera o conteudo protegido
  return <>{children}</>;
};

export default ProtectedRoute;
