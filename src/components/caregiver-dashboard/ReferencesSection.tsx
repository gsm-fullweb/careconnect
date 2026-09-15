import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Users, Edit, Save, X } from "lucide-react";

// ✅ Interface: ReferencesSectionProps
// 📌 Description: Defines the props for the ReferencesSection component
// 📥 Parameters: dados (any), editData (any), isEditing (boolean), handleInputChange (function), onEdit (function), onSave (function), onCancel (function)
interface ReferencesSectionProps {
  dados: any;
  editData: any;
  isEditing: boolean;
  handleInputChange: (field: string, value: string) => void;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

// ✅ Component: ReferencesSection
// 📌 Description: Renders professional references input fields for up to 3 references with edit functionality
// 📥 Parameters: ReferencesSectionProps
// 📤 Returns: JSX.Element - Professional references form section
export const ReferencesSection: React.FC<ReferencesSectionProps> = ({
  dados,
  editData,
  isEditing,
  handleInputChange,
  onEdit,
  onSave,
  onCancel
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            Referências Profissionais
          </CardTitle>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                onClick={onEdit}
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Edit className="w-4 h-4 mr-1" />
                Editar
              </Button>
            ) : (
              <>
                <Button
                  onClick={onSave}
                  variant="secondary"
                  size="sm"
                  className="bg-green-500/80 hover:bg-green-600 text-white border-green-400"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Salvar
                </Button>
                <Button
                  onClick={onCancel}
                  variant="secondary"
                  size="sm"
                  className="bg-red-500/80 hover:bg-red-600 text-white border-red-400"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancelar
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Users className="w-4 h-4" />
              Referência 1
            </Label>
            <Input
              value={isEditing ? (editData?.referencia_1 || '') : (dados?.referencia_1 || '')}
              onChange={(e) => handleInputChange('referencia_1', e.target.value)}
              disabled={!isEditing}
              placeholder="Nome e telefone da primeira referência"
              className="transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Users className="w-4 h-4" />
              Referência 2
            </Label>
            <Input
              value={isEditing ? (editData?.referencia_2 || '') : (dados?.referencia_2 || '')}
              onChange={(e) => handleInputChange('referencia_2', e.target.value)}
              disabled={!isEditing}
              placeholder="Nome e telefone da segunda referência"
              className="transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Users className="w-4 h-4" />
              Referência 3
            </Label>
            <Input
              value={isEditing ? (editData?.referencia_3 || '') : (dados?.referencia_3 || '')}
              onChange={(e) => handleInputChange('referencia_3', e.target.value)}
              disabled={!isEditing}
              placeholder="Nome e telefone da terceira referência"
              className="transition-all duration-200"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ✅ Export: Default export for ReferencesSection component
// 📌 Description: Exports ReferencesSection as default for easier importing
export default ReferencesSection;