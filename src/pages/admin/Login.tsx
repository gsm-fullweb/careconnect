
import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if already logged in
  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = localStorage.getItem("admin-token");
      if (isAuthenticated) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('type, user_role')
              .eq('id', user.id)
              .single();
              
            if (profile?.user_role === 'admin') {
              setShouldRedirect('/admin');
            } else if (profile?.type === 'cuidador') {
              setShouldRedirect('/caregiver-dashboard');
            } else if (profile?.type === 'cliente') {
              setShouldRedirect('/client-dashboard');
            }
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          localStorage.removeItem("admin-token");
        }
      }
      setIsCheckingAuth(false);
    };

    checkAuthentication();
  }, []);

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-careconnect-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Redirect if already authenticated
  if (shouldRedirect) {
    return <Navigate to={shouldRedirect} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Use Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }

      if (data.session) {
        // Store the session token
        localStorage.setItem("admin-token", data.session.access_token);
        
        // Get user profile to determine redirect
        const { data: profile } = await supabase
          .from('profiles')
          .select('type, user_role')
          .eq('id', data.user?.id)
          .single();
          
        toast({
          title: "Login successful",
          description: "Welcome to CareConnect",
        });
        
        // Redirect based on user role/type
        if (profile?.user_role === 'admin') {
          navigate("/admin");
        } else if (profile?.type === 'cuidador') {
          navigate("/caregiver-dashboard");
        } else if (profile?.type === 'cliente') {
          navigate("/client-dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-careconnect-blue">
            Care<span className="text-careconnect-green">Connect</span>
            <span className="block text-lg text-gray-600 mt-1">Admin Dashboard</span>
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@careconnect.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>
          
          <div>
            <Button 
              type="submit" 
              className="w-full bg-careconnect-blue hover:bg-careconnect-blue/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>Sign in with your Supabase account credentials.</p>
          </div>
        </form>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-careconnect-blue hover:underline">
            &larr; Back to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
