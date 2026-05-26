
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { isAdminUser } from "@/lib/authRole";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(() => {
    // Optimistically assume authenticated if token exists in localStorage
    // to bypass the loading spinner and render the dashboard immediately.
    // The background validation will securely confirm or redirect.
    return localStorage.getItem("admin-token") ? true : null;
  });
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in with Supabase
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (data?.session) {
          const isAdmin = await isAdminUser(data.session.user);
          setIsAuthenticated(isAdmin);
          if (isAdmin) {
            localStorage.setItem("admin-token", data.session.access_token);
          } else {
            localStorage.removeItem("admin-token");
          }
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("admin-token");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuthenticated(false);
        localStorage.removeItem("admin-token");
      }
    };
    
    checkAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          if (session) {
            const isAdmin = await isAdminUser(session.user);
            setIsAuthenticated(isAdmin);
            if (isAdmin) {
              localStorage.setItem("admin-token", session.access_token);
            } else {
              localStorage.removeItem("admin-token");
            }
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem("admin-token");
          }
        } catch (err) {
          console.error("Auth state change error:", err);
          setIsAuthenticated(false);
          localStorage.removeItem("admin-token");
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // While checking authentication status
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-careconnect-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your credentials...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
