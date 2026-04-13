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
        cep: cuidador.cep || "",
        cidade: cuidador.cidade || "",
        cargo: cuidador.cargo || "",
        experiencia: cuidador.experiencia || "",
        disponibilidade_horarios: cuidador.disponibilidade_horarios || "",
        descricao_experiencia: cuidador.descricao_experiencia || "",
        cursos: cuidador.cursos || "",
        referencia_1: cuidador.referencia_1 || "",
        referencia_2: cuidador.referencia_2 || "",
        referencia_3: cuidador.referencia_3 || "",
      });
    }
  }, [cuidador]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "cep") {
      setFormData((prev: any) => ({ ...prev, [name]: maskCEP(value) }));
      return;
    }
    
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const maskCEP = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 9);
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
          cep: formData.cep,
          cidade: normalizeCity(formData.cidade),
          cargo: formData.cargo,
          experiencia: formData.experiencia,
          disponibilidade_horarios: formData.disponibilidade_horarios,
          descricao_experiencia: formData.descricao_experiencia,
          cursos: formData.cursos,
          referencia_1: formData.referencia_1,
          referencia_2: formData.referencia_2,
          referencia_3: formData.referencia_3,
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
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">CEP</label>
                <Input
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  placeholder="00000-000"
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
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-700">Cursos e Especializações</label>
            <Textarea
              name="cursos"
              value={formData.cursos}
              onChange={handleChange}
              placeholder="Listagem de cursos, certificações..."
              rows={2}
            />
          </div>

          <div className="space-y-4 border-t pt-4">
            <h4 className="font-semibold text-gray-900">Referências</h4>
            <div className="grid gap-3">
              <div className="grid gap-1">
                <label className="text-xs font-medium text-gray-500">Referência 1</label>
                <Input
                  name="referencia_1"
                  value={formData.referencia_1}
                  onChange={handleChange}
                  placeholder="Nome e contato da primeira referência"
                />
              </div>
              <div className="grid gap-1">
                <label className="text-xs font-medium text-gray-500">Referência 2</label>
                <Input
                  name="referencia_2"
                  value={formData.referencia_2}
                  onChange={handleChange}
                  placeholder="Nome e contato da segunda referência"
                />
              </div>
              <div className="grid gap-1">
                <label className="text-xs font-medium text-gray-500">Referência 3</label>
                <Input
                  name="referencia_3"
                  value={formData.referencia_3}
                  onChange={handleChange}
                  placeholder="Nome e contato da terceira referência"
                />
              </div>
            </div>
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
