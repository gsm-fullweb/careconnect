import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { User, Edit, Save, X, CheckCircle } from "lucide-react";

// ✅ Interface: PersonalDataSectionProps
// 📌 Description: Defines the props for PersonalDataSection component
// 📥 Parameters: Individual personal data fields and handlers
interface PersonalDataSectionProps {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  possuiFilhos: boolean;
  fumante: boolean;
  isEditing: boolean;
  saving: boolean;
  onInputChange: (field: string, value: string | boolean) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

// ✅ Component: PersonalDataSection
// 📌 Description: Renders personal data form fields with edit functionality
// 📥 Parameters: PersonalDataSectionProps
// 📤 Returns: JSX.Element - Personal data section component
const PersonalDataSection: React.FC<PersonalDataSectionProps> = ({ 
  nome,
  email,
  telefone,
  cpf,
  dataNascimento,
  possuiFilhos,
  fumante,
  isEditing,
  saving,
  onInputChange,
  onEdit,
  onSave,
  onCancel
}) => {
  // ✅ Function: checkCompletion
  // 📌 Description: Checks if all required personal data fields are filled
  // 📤 Returns: boolean - true if section is complete
  const checkCompletion = () => {
    return !!(nome && email && telefone && cpf && dataNascimento);
  };

  return (
    <AccordionItem value="personal" className="border rounded-lg">
      <Card>
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <div className="flex items-center gap-3 w-full">
            <User className="w-5 h-5 text-careconnect-blue" />
            <div className="text-left flex-1">
              <h3 className="font-semibold">Dados Pessoais</h3>
              <p className="text-sm text-gray-600">Nome, email, telefone, CPF, data de nascimento</p>
            </div>
            {checkCompletion() && (
              <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <CardContent className="pt-0">
            <div className="flex justify-end mb-4">
              {!isEditing ? (
                <Button
                  onClick={onEdit}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={onSave}
                    disabled={saving}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Salvando...' : 'Salvar'}
                  </Button>
                  <Button
                    onClick={onCancel}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome Completo</label>
                <Input
                  name="nome"
                  value={nome}
                  onChange={(e) => onInputChange('nome', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Digite seu nome completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  value={email}
                  disabled
                  placeholder="Email não pode ser alterado"
                  className="bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Telefone</label>
                <Input
                  name="telefone"
                  value={telefone}
                  onChange={(e) => onInputChange('telefone', e.target.value)}
                  disabled={!isEditing}
                  placeholder="(11) 99999-9999"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">CPF</label>
                <Input
                  name="cpf"
                  value={cpf}
                  onChange={(e) => onInputChange('cpf', e.target.value)}
                  disabled={!isEditing}
                  placeholder="000.000.000-00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
                <Input
                  name="data_nascimento"
                  type="date"
                  value={dataNascimento}
                  onChange={(e) => onInputChange('data_nascimento', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Possui Filhos</label>
                <select
                  value={possuiFilhos ? 'true' : 'false'}
                  onChange={(e) => onInputChange('possui_filhos', e.target.value === 'true')}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                >
                  <option value="false">Não</option>
                  <option value="true">Sim</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Fumante</label>
                <select
                  value={fumante ? 'true' : 'false'}
                  onChange={(e) => onInputChange('fumante', e.target.value === 'true')}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                >
                  <option value="false">Não</option>
                  <option value="true">Sim</option>
                </select>
              </div>
            </div>
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};

export default PersonalDataSection;