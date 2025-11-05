import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Stethoscope, FileText, Edit, Save, X, CheckCircle, AlertCircle } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// ✅ Interface: CategorySectionProps
// 📌 Description: Defines the props for the CategorySection component
// 📥 Parameters: Professional category fields and handlers
interface CategorySectionProps {
  cargo: string;
  coren: string;
  crefito: string;
  crm: string;
  isEditing: boolean;
  saving: boolean;
  onInputChange: (field: string, value: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

// ✅ Component: CategorySection
// 📌 Description: Renders professional category selection with conditional registration number fields
// 📥 Parameters: CategorySectionProps
// 📤 Returns: JSX.Element - Professional category form section
export const CategorySection: React.FC<CategorySectionProps> = ({
  cargo,
  coren,
  crefito,
  crm,
  isEditing,
  saving,
  onInputChange,
  onEdit,
  onSave,
  onCancel
}) => {
  // ✅ Function: checkCompletion
  // 📌 Description: Checks if all required professional category fields are filled
  // 📤 Returns: boolean - true if section is complete
  const checkCompletion = () => {
    if (!cargo) return false;
    
    switch (cargo) {
      case 'enfermeiro':
      case 'tecnico':
        return !!(cargo && coren);
      case 'fisioterapeuta':
      case 'terapeuta':
        return !!(cargo && crefito);
      case 'medico':
        return !!(cargo && crm);
      case 'cuidador':
        return !!cargo;
      default:
        return false;
    }
  };

  // ✅ Function: handleInputChange
  // 📌 Description: Handles input changes for text fields
  // 📥 Parameters: e (React.ChangeEvent<HTMLInputElement>)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.name, e.target.value);
  };

  return (
    <AccordionItem value="category" className="border rounded-lg">
      <Card>
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <div className="flex items-center gap-3 w-full">
            <Stethoscope className="w-5 h-5 text-careconnect-blue" />
            <div className="text-left flex-1">
              <h3 className="font-semibold">Categoria Profissional</h3>
              <p className="text-sm text-gray-600">
                {cargo ? `${cargo}${getRegistrationNumber()}` : 'Selecione sua categoria profissional'}
              </p>
            </div>
            {checkCompletion() ? (
              <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
            ) : (
              <AlertCircle className="w-5 h-5 text-orange-500 ml-auto" />
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

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Stethoscope className="w-4 h-4" />
                  Categoria Profissional *
                </Label>
                <Select 
                  value={cargo} 
                  onValueChange={(value) => onInputChange('cargo', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Selecione sua categoria profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cuidador">Cuidador</SelectItem>
                    <SelectItem value="enfermeiro">Enfermeiro(a)</SelectItem>
                    <SelectItem value="tecnico">Técnico em Enfermagem</SelectItem>
                    <SelectItem value="fisioterapeuta">Fisioterapeuta</SelectItem>
                    <SelectItem value="terapeuta">Terapeuta Ocupacional</SelectItem>
                    <SelectItem value="medico">Médico(a)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(cargo === 'enfermeiro' || cargo === 'tecnico') && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FileText className="w-4 h-4" />
                    Número do COREN *
                  </Label>
                  <Input
                    name="coren"
                    value={coren}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Digite o número do seu COREN"
                    className="transition-all duration-200"
                  />
                </div>
              )}

              {(cargo === 'fisioterapeuta' || cargo === 'terapeuta') && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FileText className="w-4 h-4" />
                    Número do CREFITO *
                  </Label>
                  <Input
                    name="crefito"
                    value={crefito}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Digite o número do seu CREFITO"
                    className="transition-all duration-200"
                  />
                </div>
              )}

              {cargo === 'medico' && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FileText className="w-4 h-4" />
                    Número do CRM *
                  </Label>
                  <Input
                    name="crm"
                    value={crm}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Digite o número do seu CRM"
                    className="transition-all duration-200"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );

  // ✅ Function: getRegistrationNumber
  // 📌 Description: Gets the appropriate registration number based on professional category
  // 📤 Returns: string - formatted registration number or empty string
  function getRegistrationNumber(): string {
    switch (cargo) {
      case 'enfermeiro':
      case 'tecnico':
        return coren ? ` - COREN: ${coren}` : '';
      case 'fisioterapeuta':
      case 'terapeuta':
        return crefito ? ` - CREFITO: ${crefito}` : '';
      case 'medico':
        return crm ? ` - CRM: ${crm}` : '';
      default:
        return '';
    }
  }
};

export default CategorySection;