import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, GraduationCap, Baby, Cigarette, Clock, BookOpen } from "lucide-react";

// ✅ Interface: ProfessionalDataSectionProps
// 📌 Description: Defines the props for the ProfessionalDataSection component
// 📥 Parameters: dados (any), editData (any), isEditing (boolean), handleInputChange (function)
interface ProfessionalDataSectionProps {
  dados: any;
  editData: any;
  isEditing: boolean;
  handleInputChange: (field: string, value: string | boolean) => void;
}

// ✅ Component: ProfessionalDataSection
// 📌 Description: Renders professional data fields including education, children, smoking status, availability and experience
// 📥 Parameters: ProfessionalDataSectionProps
// 📤 Returns: JSX.Element - Professional data form section
export const ProfessionalDataSection: React.FC<ProfessionalDataSectionProps> = ({
  dados,
  editData,
  isEditing,
  handleInputChange
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-6 h-6" />
          Dados Profissionais
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <GraduationCap className="w-4 h-4" />
              Escolaridade
            </Label>
            <Select 
              value={isEditing ? editData.escolaridade : (dados?.escolaridade || '')} 
              onValueChange={(value) => handleInputChange('escolaridade', value)}
              disabled={!isEditing}
            >
              <SelectTrigger className="transition-all duration-200">
                <SelectValue placeholder="Selecione sua escolaridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fundamental">Ensino Fundamental</SelectItem>
                <SelectItem value="medio">Ensino Médio</SelectItem>
                <SelectItem value="superior">Ensino Superior</SelectItem>
                <SelectItem value="pos-graduacao">Pós-graduação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Baby className="w-4 h-4" />
              Possui Filhos
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                checked={isEditing ? editData.possui_filhos : (dados?.possui_filhos || false)}
                onCheckedChange={(checked) => handleInputChange('possui_filhos', checked)}
                disabled={!isEditing}
              />
              <span className="text-sm text-gray-600">
                {(isEditing ? editData.possui_filhos : dados?.possui_filhos) ? 'Sim' : 'Não'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Cigarette className="w-4 h-4" />
              Fumante
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                checked={isEditing ? editData.fumante : (dados?.fumante || false)}
                onCheckedChange={(checked) => handleInputChange('fumante', checked)}
                disabled={!isEditing}
              />
              <span className="text-sm text-gray-600">
                {(isEditing ? editData.fumante : dados?.fumante) ? 'Sim' : 'Não'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4" />
              Disponibilidade de Horários
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                checked={isEditing ? editData.disponibilidade_horarios : (dados?.disponibilidade_horarios || false)}
                onCheckedChange={(checked) => handleInputChange('disponibilidade_horarios', checked)}
                disabled={!isEditing}
              />
              <span className="text-sm text-gray-600">
                {(isEditing ? editData.disponibilidade_horarios : dados?.disponibilidade_horarios) ? 'Flexível' : 'Restrita'}
              </span>
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Briefcase className="w-4 h-4" />
              Possui Experiência
            </Label>
            <Select 
              value={isEditing ? editData.possui_experiencia : (dados?.possui_experiencia || '')} 
              onValueChange={(value) => handleInputChange('possui_experiencia', value)}
              disabled={!isEditing}
            >
              <SelectTrigger className="transition-all duration-200">
                <SelectValue placeholder="Selecione se possui experiência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sim">Sim</SelectItem>
                <SelectItem value="Não">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Briefcase className="w-4 h-4" />
              Descrição da Experiência
            </Label>
            <Textarea
              value={isEditing ? editData.descricao_experiencia : (dados?.descricao_experiencia || '')}
              onChange={(e) => handleInputChange('descricao_experiencia', e.target.value)}
              disabled={!isEditing}
              placeholder="Descreva sua experiência profissional..."
              className="transition-all duration-200"
              rows={3}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <BookOpen className="w-4 h-4" />
              Cursos
            </Label>
            <Textarea
              value={isEditing ? editData.cursos : (dados?.cursos || '')}
              onChange={(e) => handleInputChange('cursos', e.target.value)}
              disabled={!isEditing}
              placeholder="Liste seus cursos e certificações..."
              className="transition-all duration-200"
              rows={3}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};