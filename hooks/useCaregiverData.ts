import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

// ✅ Interface: CaregiverData
// 📌 Description: Defines the structure for caregiver data
// 📥 Parameters: All caregiver profile fields
interface CaregiverData {
  id?: string;
  nome?: string;
  email?: string;
  telefone?: string;
  cpf?: string;
  data_nascimento?: string;
  cep?: string;
  endereco?: string;
  estado?: string;
  cidade?: string;
  escolaridade?: string;
  possui_filhos?: boolean;
  fumante?: boolean;
  disponibilidade_horarios?: boolean;
  possui_experiencia?: string;
  descricao_experiencia?: string;
  cursos?: string;
  cargo?: string;
  coren?: string;
  crefito?: string;
  crm?: string;
  referencia_1?: string;
  referencia_2?: string;
  referencia_3?: string;
  Declaracao?: string;
  updated_at?: string;
}

// ✅ Interface: DeclarationData
// 📌 Description: Defines the structure for declaration acceptance data
// 📥 Parameters: accepted_terms (boolean), accepted_declaration (boolean)
interface DeclarationData {
  accepted_terms: boolean;
  accepted_declaration: boolean;
}

// ✅ Hook: useCaregiverData
// 📌 Description: Custom hook to manage caregiver data fetching, updating and saving to Supabase
// 📥 Parameters: None
// 📤 Returns: Object with data, loading states, and functions to manage caregiver data
export const useCaregiverData = () => {
  const { user } = useAuth();
  const [dados, setDados] = useState<CaregiverData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedDeclaration, setAcceptedDeclaration] = useState(false);

  // ✅ Function: parseDeclaration
  // 📌 Description: Parses the declaration JSON string to extract acceptance status
  // 📥 Parameters: declaracao (string) - JSON string containing declaration data
  // 📤 Returns: DeclarationData - Object with acceptance status
  const parseDeclaration = (declaracao: string | null): DeclarationData => {
    if (!declaracao) {
      return { accepted_terms: false, accepted_declaration: false };
    }
    
    try {
      const parsed = JSON.parse(declaracao);
      return {
        accepted_terms: parsed.accepted_terms || false,
        accepted_declaration: parsed.accepted_declaration || false
      };
    } catch {
      return { accepted_terms: false, accepted_declaration: false };
    }
  };

  // ✅ Function: fetchCaregiverData
  // 📌 Description: Fetches caregiver data from Supabase database
  // 📥 Parameters: None
  // 📤 Returns: Promise<void>
  const fetchCaregiverData = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('candidatos_cuidadores_rows')
        .select('*')
        .eq('email', user.email)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao buscar dados:', error);
        toast({
          title: "Erro",
          description: "Erro ao carregar dados do perfil",
          variant: "destructive"
        });
        return;
      }

      if (data) {
        setDados(data);
        const declaration = parseDeclaration(data.Declaracao);
        setAcceptedTerms(declaration.accepted_terms);
        setAcceptedDeclaration(declaration.accepted_declaration);
      } else {
        // Create new record if doesn't exist
        const newRecord = {
          email: user.email,
          nome: user.user_metadata?.name || '',
          telefone: user.user_metadata?.telefone || '',
          updated_at: new Date().toISOString()
        };

        const { data: newData, error: insertError } = await supabase
          .from('candidatos_cuidadores_rows')
          .insert([newRecord])
          .select()
          .single();

        if (insertError) {
          console.error('Erro ao criar registro:', insertError);
          toast({
            title: "Erro",
            description: "Erro ao criar perfil",
            variant: "destructive"
          });
        } else {
          setDados(newData);
        }
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao carregar dados",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Function: saveData
  // 📌 Description: Saves caregiver data to Supabase database
  // 📥 Parameters: editData (CaregiverData) - Data to be saved
  // 📤 Returns: Promise<boolean> - Success status
  const saveData = async (editData: CaregiverData): Promise<boolean> => {
    if (!user?.email) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive"
      });
      return false;
    }

    setSaving(true);

    try {
      const declarationData = {
        accepted_terms: acceptedTerms,
        accepted_declaration: acceptedDeclaration
      };

      const dataToSave = {
        ...editData,
        email: user.email,
        Declaracao: JSON.stringify(declarationData),
        updated_at: new Date().toISOString()
      };

      let result;
      if (dados?.id) {
        // Update existing record
        result = await supabase
          .from('candidatos_cuidadores_rows')
          .update(dataToSave)
          .eq('id', dados.id)
          .select()
          .single();
      } else {
        // Insert new record
        result = await supabase
          .from('candidatos_cuidadores_rows')
          .insert([dataToSave])
          .select()
          .single();
      }

      if (result.error) {
        console.error('Erro ao salvar:', result.error);
        toast({
          title: "Erro",
          description: "Erro ao salvar dados",
          variant: "destructive"
        });
        return false;
      }

      // Update local state
      setDados(result.data);
      const declaration = parseDeclaration(result.data.Declaracao);
      setAcceptedTerms(declaration.accepted_terms);
      setAcceptedDeclaration(declaration.accepted_declaration);

      toast({
        title: "Sucesso",
        description: "Dados salvos com sucesso!"
      });

      return true;
    } catch (error) {
      console.error('Erro inesperado ao salvar:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao salvar dados",
        variant: "destructive"
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  // ✅ Effect: fetchCaregiverData
  // 📌 Description: Fetches caregiver data when user changes
  // 📥 Parameters: user dependency
  // 📤 Returns: void
  useEffect(() => {
    fetchCaregiverData();
  }, [user]);

  return {
    dados,
    loading,
    saving,
    acceptedTerms,
    acceptedDeclaration,
    setAcceptedTerms,
    setAcceptedDeclaration,
    saveData,
    refetch: fetchCaregiverData
  };
};

// ✅ Function: saveData
// 📌 Description: Temporarily remove cpf field to avoid database error
// 📥 Parameters: editData (object), declarationData (object)
// 📤 Returns: boolean - success status
const saveData = async (editData: any, declarationData: DeclarationData) => {
  setSaving(true);

  try {
    // Remove cpf temporarily if causing issues
    const { cpf, ...dataWithoutCpf } = editData;
    
    const dataToSave = {
      ...dataWithoutCpf, // Use data without cpf
      email: user.email,
      // ❌ Remover: Declaracao: JSON.stringify(declarationData),
      // ❌ Remover: updated_at: new Date().toISOString()
      ultima_atualizacao: new Date().toISOString() // ✅ Usar o nome correto da coluna
    };

    let result;
    if (dados?.id) {
      // Update existing record
      result = await supabase
        .from('candidatos_cuidadores_rows')
        .update(dataToSave)
        .eq('id', dados.id)
        .select()
        .single();
    } else {
      // Insert new record
      result = await supabase
        .from('candidatos_cuidadores_rows')
        .insert([dataToSave])
        .select()
        .single();
    }

    if (result.error) {
      console.error('Erro ao salvar:', result.error);
      toast({
        title: "Erro",
        description: "Erro ao salvar dados",
        variant: "destructive"
      });
      return false;
    }

    // Update local state
    setDados(result.data);
    const declaration = parseDeclaration(result.data.Declaracao);
    setAcceptedTerms(declaration.accepted_terms);
    setAcceptedDeclaration(declaration.accepted_declaration);

    toast({
      title: "Sucesso",
      description: "Dados salvos com sucesso!"
    });

    return true;
  } catch (error) {
    console.error('Erro inesperado ao salvar:', error);
    toast({
      title: "Erro",
      description: "Erro inesperado ao salvar dados",
      variant: "destructive"
    });
    return false;
  } finally {
    setSaving(false);
  }
};