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
        escolaridade: cuidador.escolaridade || "",
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

  const handleSave = async () => {
    setLoading(true);
    console.log("Iniciando salvamento para ID:", cuidador.id, formData);
    
    try {
      const { data, error } = await supabase
        .from('candidatos_cuidadores_rows')
        .update({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          cep: formData.cep,
          cidade: normalizeCity(formData.cidade),
          cargo: formData.cargo,
          escolaridade: formData.escolaridade,
          ultima_atualizacao: new Date().toISOString()
        })
        .eq('id', cuidador.id)
        .select();

      if (error) {
        console.error("Erro no Supabase update:", error);
        throw error;
      }

      console.log("Dados atualizados com sucesso:", data);

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
      <DialogContent className="sm:max-w-[500px] bg-white border-none shadow-2xl rounded-2xl p-0 overflow-hidden">
        <div className="bg-careconnect-blue p-6 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
              <div className="bg-white/20 p-2 rounded-lg">
                <Pencil className="w-6 h-6 text-white" />
              </div>
              Editar Cuidador
            </DialogTitle>
          </DialogHeader>
          <p className="text-blue-100 mt-2 text-sm">
            Atualize as informações essenciais do candidato abaixo.
          </p>
        </div>

        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* GRUPO 1: NOME COMPLETO */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-careconnect-blue uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-careconnect-blue rounded-full"></span>
              Nome completo
            </h3>
            <div className="grid gap-2">
              <Input
                name="nome"
                value={formData.nome || ''}
                onChange={handleChange}
                placeholder="Nome completo do cuidador"
                className="border-gray-200 focus:border-careconnect-blue focus:ring-careconnect-blue rounded-xl h-11"
              />
            </div>
          </div>

          {/* GRUPO 2: CONTATO */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-careconnect-blue uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-careconnect-blue rounded-full"></span>
              Contato
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-medium text-gray-500 ml-1">Telefone / WhatsApp</label>
                <Input
                  name="telefone"
                  value={formData.telefone || ''}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className="border-gray-200 focus:border-careconnect-blue focus:ring-careconnect-blue rounded-xl h-11"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-medium text-gray-500 ml-1">E-mail</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  placeholder="email@exemplo.com"
                  className="border-gray-200 focus:border-careconnect-blue focus:ring-careconnect-blue rounded-xl h-11"
                />
              </div>
            </div>
          </div>

          {/* GRUPO 3: LOCALIZAÇÃO */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-careconnect-blue uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-careconnect-blue rounded-full"></span>
              Localização
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-medium text-gray-500 ml-1">Cidade</label>
                <Input
                  name="cidade"
                  value={formData.cidade || ''}
                  onChange={handleChange}
                  placeholder="Cidade"
                  className="border-gray-200 focus:border-careconnect-blue focus:ring-careconnect-blue rounded-xl h-11"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-medium text-gray-500 ml-1">CEP</label>
                <Input
                  name="cep"
                  value={formData.cep || ''}
                  onChange={handleChange}
                  placeholder="00000-000"
                  className="border-gray-200 focus:border-careconnect-blue focus:ring-careconnect-blue rounded-xl h-11"
                />
              </div>
            </div>
          </div>

          {/* GRUPO 4: QUALIFICAÇÃO */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-careconnect-blue uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-careconnect-blue rounded-full"></span>
              Qualificação
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-medium text-gray-500 ml-1">Cargo / Especialidade</label>
                <Input
                  name="cargo"
                  value={formData.cargo || ''}
                  onChange={handleChange}
                  placeholder="Ex: Cuidador de Idosos"
                  className="border-gray-200 focus:border-careconnect-blue focus:ring-careconnect-blue rounded-xl h-11"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-medium text-gray-500 ml-1">Escolaridade / Formação</label>
                <Input
                  name="escolaridade"
                  value={formData.escolaridade || ''}
                  onChange={handleChange}
                  placeholder="Ex: Superior Completo"
                  className="border-gray-200 focus:border-careconnect-blue focus:ring-careconnect-blue rounded-xl h-11"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 bg-gray-50 flex gap-3 sm:justify-end border-t border-gray-100">
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={loading} 
            className="flex-1 sm:flex-none h-11 rounded-xl border-gray-300 hover:bg-white hover:border-gray-400 font-semibold"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={loading} 
            className="flex-1 sm:flex-none h-11 rounded-xl bg-careconnect-blue hover:bg-careconnect-blue/90 font-bold px-6 shadow-md shadow-blue-200"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Salvando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar Alterações
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
