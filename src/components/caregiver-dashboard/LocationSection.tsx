import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Home, Building2 } from "lucide-react";

// ✅ Interface: LocationSectionProps
// 📌 Description: Props interface for LocationSection component
// 📥 Parameters: component props
// 📤 Returns: TypeScript interface
interface LocationSectionProps {
  dados: any;
  editData: any;
  isEditing: boolean;
  handleCidadeChange: (cidade: string) => void;
  handleEnderecoChange: (endereco: string) => void;
  handleEstadoChange: (estado: string) => void;
}

// ✅ Component: LocationSection
// 📌 Description: Location section component for address information
// 📥 Parameters: LocationSectionProps
// 📤 Returns: JSX.Element
export const LocationSection: React.FC<LocationSectionProps> = ({
  dados,
  editData,
  isEditing,
  handleCidadeChange,
  handleEnderecoChange,
  handleEstadoChange
}) => {
  const cidadesPorEstado = {
    'SP': [
      'Amparo', 'Analândia', 'Aparecida', 'Arujá', 'Biritiba Mirim',
      'Caçapava', 'Cachoeira Paulista', 'Campinas', 'Cruzeiro',
      'Ferraz de Vasconcelos', 'Guararema', 'Guaratinguetá', 'Guarulhos',
      'Itaquaquecetuba', 'Jacareí', 'Lorena', 'Mogi das Cruzes', 'Osasco',
      'Pindamonhangaba', 'Poá', 'Salesópolis', 'Santa Isabel', 'Santos',
      'São Bernardo do Campo', 'São Caetano do Sul', 'São José dos Campos',
      'São Paulo', 'São Roque', 'Santo André', 'Suzano', 'Taubaté', 'Mauá'
    ],
    'RJ': [
      'Rio de Janeiro', 'Niterói', 'Nova Iguaçu', 'Duque de Caxias', 'Belford Roxo',
      'Campos dos Goytacazes', 'Petrópolis', 'Volta Redonda', 'Magé', 'Cabo Frio'
    ],
    'MG': [
      'Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim',
      'Montes Claros', 'Ribeirão das Neves', 'Uberaba', 'Governador Valadares', 'Ipatinga'
    ]
  };

  const estados = [
    { value: 'SP', label: 'São Paulo' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'MG', label: 'Minas Gerais' }
  ];

  const estadoSelecionado = isEditing ? editData.estado : (dados?.estado || '');
  const cidadesDisponiveis = estadoSelecionado ? cidadesPorEstado[estadoSelecionado as keyof typeof cidadesPorEstado] || [] : [];

  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          Localização
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Building2 className="w-4 h-4" />
              Estado
            </Label>
            <Select 
              value={estadoSelecionado} 
              onValueChange={handleEstadoChange}
              disabled={!isEditing}
            >
              <SelectTrigger className="transition-all duration-200">
                <SelectValue placeholder="Selecione um estado" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {estados.map((estado) => (
                  <SelectItem key={estado.value} value={estado.value}>
                    {estado.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin className="w-4 h-4" />
              Cidade
            </Label>
            <Select 
              value={isEditing ? editData.cidade : (dados?.cidade || '')} 
              onValueChange={handleCidadeChange}
              disabled={!isEditing || !estadoSelecionado}
            >
              <SelectTrigger className="transition-all duration-200">
                <SelectValue placeholder="Selecione uma cidade" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {cidadesDisponiveis.map((cidade) => (
                  <SelectItem key={cidade} value={cidade}>
                    {cidade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Home className="w-4 h-4" />
              Endereço
            </Label>
            <Input
              value={isEditing ? editData.endereco : (dados?.endereco || '')}
              onChange={(e) => handleEnderecoChange(e.target.value)}
              placeholder="Digite seu endereço completo"
              disabled={!isEditing}
              className="transition-all duration-200"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};