import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { normalizeCity } from "@/lib/utils";
import { Pencil, Save, X } from "lucide-react";

interface EditCuidadorModalProps {
  isOpen: boolean;
  onClose: () => void;
  cuidador: any;
  onUpdate: () => void;
}

export const EditCuidadorModal: React.FC<EditCuidadorModalProps> = ({
  isOpen,
  onClose,
  cuidador,
  onUpdate
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (cuidador) {
      setFormData({
        nome: cuidador.nome || "",
        email: cuidador.email || "",
        telefone: cuidador.telefone || "",
        cidade: cuidador.cidade || "",
        cargo: cuidador.cargo || "",
        experiencia: cuidador.experiencia || "",
        disponibilidade_horarios: cuidador.disponibilidade || "",
        descricao_experiencia: cuidador.descricao || ""
      });
    }
  }, [cuidador]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('candidatos_cuidadores_rows')
        .update({
          nome: formData.nome,
          telefone: formData.telefone,
          cidade: normalizeCity(formData.cidade),
          cargo: formData.cargo,
          experiencia: formData.experiencia,
          disponibilidade_horarios: formData.disponibilidade_horarios,
          descricao_experiencia: formData.descricao_experiencia,
          ultima_atualizacao: new Date().toISOString()
        })
        .eq('id', cuidador.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Dados do cuidador atualizados com sucesso.",
      });
      onUpdate();
      onClose();
    } catch (error: any) {
      console.error("Erro ao atualizar cuidador:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar os dados. " + (error.message || ""),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Pencil className="w-5 h-5 text-careconnect-blue" />
            Editar Cuidador
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-700">Nome Completo</label>
            <Input
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome do cuidador"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-gray-700">Telefone</label>
              <Input
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-gray-700">Cidade</label>
              <Input
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                placeholder="Cidade"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-gray-700">Cargo / Especialidade</label>
              <Input
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                placeholder="Ex: Cuidador de Idosos"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-gray-700">Experiência (Anos/Nível)</label>
              <Input
                name="experiencia"
                value={formData.experiencia}
                onChange={handleChange}
                placeholder="Ex: 5 anos"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-700">Disponibilidade</label>
            <Input
              name="disponibilidade_horarios"
              value={formData.disponibilidade_horarios}
              onChange={handleChange}
              placeholder="Ex: Integral, Noturno..."
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-700">Descrição da Experiência</label>
            <Textarea
              name="descricao_experiencia"
              value={formData.descricao_experiencia}
              onChange={handleChange}
              placeholder="Resumo das qualificações e experiências anteriores..."
              rows={4}
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:justify-end mt-4">
          <Button variant="outline" onClick={onClose} disabled={loading} className="gap-2">
            <X className="w-4 h-4" />
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={loading} className="bg-careconnect-blue hover:bg-careconnect-blue/90 gap-2">
            <Save className="w-4 h-4" />
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
