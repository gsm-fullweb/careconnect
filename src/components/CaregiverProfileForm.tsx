import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

type ProfileData = {
  first_name: string;
  last_name: string;
  phone: string;
  bio: string;
  experience_years: number;
  specialties: string;
};

export default function CaregiverProfileForm() {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset, setValue } = useForm<ProfileData>();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error("Usuário não autenticado");
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        // Preenche os campos com os dados existentes
        setValue('first_name', profile.first_name || '');
        setValue('last_name', profile.last_name || '');
        setValue('phone', profile.phone || '');
        setValue('bio', profile.bio || '');
        setValue('experience_years', profile.experience_years || 0);
        setValue('specialties', profile.specialties || '');
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar seu perfil",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setValue, toast]);

  const onSubmit = async (data: ProfileData) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          bio: data.bio,
          experience_years: data.experience_years,
          specialties: data.specialties,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Perfil atualizado",
        description: "Seus dados foram salvos com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar seu perfil. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="first_name">Nome</Label>
          <Input 
            id="first_name" 
            {...register("first_name", { required: true })}
            placeholder="Seu nome"
          />
        </div>
        
        <div>
          <Label htmlFor="last_name">Sobrenome</Label>
          <Input 
            id="last_name" 
            {...register("last_name")}
            placeholder="Seu sobrenome"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="phone">Telefone</Label>
        <Input 
          id="phone" 
          {...register("phone", { required: true })}
          placeholder="(00) 00000-0000"
          type="tel"
        />
      </div>
      
      <div>
        <Label htmlFor="bio">Sobre você</Label>
        <Textarea 
          id="bio" 
          {...register("bio")}
          placeholder="Conte um pouco sobre sua experiência e abordagem"
          className="min-h-[100px]"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="experience_years">Anos de experiência</Label>
          <Input 
            id="experience_years" 
            {...register("experience_years", { valueAsNumber: true })}
            type="number"
            min="0"
          />
        </div>
        
        <div>
          <Label htmlFor="specialties">Especialidades</Label>
          <Input 
            id="specialties" 
            {...register("specialties")}
            placeholder="Ex: Cuidados com idosos, primeiros socorros"
          />
        </div>
      </div>
      
      <Button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar Alterações"}
      </Button>
    </form>
  );
}