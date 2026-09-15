import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

type UserRole = 'admin' | 'cuidador' | 'cliente' | null;

export default function useUserRole() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setLoading(true);
        
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('type, user_role')
            .eq('id', user.id)
            .single();

          if (error) throw error;
          
          // Prioriza user_role para admin, depois verifica type
          const role = profile.user_role === 'admin' 
            ? 'admin' 
            : profile.type === 'cuidador' 
              ? 'cuidador' 
              : 'cliente';
              
          setUserRole(role);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return { userRole, loading };
}