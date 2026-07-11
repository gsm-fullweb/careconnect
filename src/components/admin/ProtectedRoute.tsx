import { ReactNode, useEffect, useState } from "react";
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

  useEffect(() => {
    let isMounted = true;

    // Verifica sessao E papel de admin. Estar apenas autenticado (cuidador ou
    // cliente) NAO libera o painel administrativo.
    const resolveAccess = async (user: User | null): Promise<AccessStatus> => {
      if (!user) return "denied";
      const admin = await isAdminUser(user);
      return admin ? "granted" : "denied";
    };

    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        const next = await resolveAccess(data?.session?.user ?? null);
        if (isMounted) setStatus(next);
      } catch (err) {
        console.error("Auth check failed:", err);
        if (isMounted) setStatus("denied");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const next = await resolveAccess(session?.user ?? null);
        if (isMounted) setStatus(next);
      }
    );

    return () => {
      isMounted = false;
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
