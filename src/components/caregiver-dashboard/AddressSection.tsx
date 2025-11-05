import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Edit, Save, X, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

// ✅ Interface: AddressSectionProps
// 📌 Description: Defines the props for the AddressSection component
// 📥 Parameters: Individual address fields and handlers
interface AddressSectionProps {
  cep: string;
  endereco: string;
  cidade: string;
  estado: string;
  isEditing: boolean;
  saving: boolean;
  onInputChange: (field: string, value: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const estados = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", 
  "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão", 
  "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", 
  "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", 
  "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", 
  "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
];

const cidadesPorEstado: { [key: string]: string[] } = {
  "São Paulo": [
    "Amparo", "Analândia", "Aparecida", "Arujá", "Biritiba Mirim",
    "Caçapava", "Cachoeira Paulista", "Campinas", "Cruzeiro", 
    "Ferraz de Vasconcelos", "Guararema", "Guaratinguetá", "Igaratá",
    "Jacareí", "Jambeiro", "Lagoinha", "Lorena", "Mogi das Cruzes",
    "Monteiro Lobato", "Natividade da Serra", "Paraibuna", "Pindamonhangaba",
    "Potim", "Queluz", "Redenção da Serra", "Roseira", "Santa Branca",
    "Santo Antônio do Pinhal", "São Bento do Sapucaí", "São José do Barreiro",
    "São José dos Campos", "São Luiz do Paraitinga", "Silveiras", "Taubaté",
    "Tremembé", "Ubatuba", "São Paulo", "Guarulhos", "Osasco", "Santo André",
    "São Bernardo do Campo", "São Caetano do Sul", "Diadema", "Mauá",
    "Ribeirão Pires", "Rio Grande da Serra"
  ],
  "Rio de Janeiro": [
    "Rio de Janeiro", "Niterói", "Nova Iguaçu", "Duque de Caxias",
    "São Gonçalo", "Volta Redonda", "Petrópolis", "Magé", "Itaboraí",
    "Mesquita", "Nova Friburgo", "Barra Mansa", "Campos dos Goytacazes",
    "Belford Roxo", "São João de Meriti", "Angra dos Reis", "Cabo Frio",
    "Resende", "Araruama", "Teresópolis"
  ],
  "Minas Gerais": [
    "Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora",
    "Betim", "Montes Claros", "Ribeirão das Neves", "Uberaba",
    "Governador Valadares", "Ipatinga", "Sete Lagoas", "Divinópolis",
    "Santa Luzia", "Ibirité", "Poços de Caldas", "Patos de Minas",
    "Pouso Alegre", "Teófilo Otoni", "Barbacena", "Sabará"
  ]
  // Adicione mais estados conforme necessário
};

// ✅ Component: AddressSection
// 📌 Description: Renders address form fields with edit functionality
// 📥 Parameters: AddressSectionProps
// 📤 Returns: JSX.Element - Address section component
const AddressSection: React.FC<AddressSectionProps> = ({
  cep,
  endereco,
  cidade,
  estado,
  isEditing,
  saving,
  onInputChange,
  onEdit,
  onSave,
  onCancel,
}) => {
  const selectedEstado = estado || "";
  const cidades = cidadesPorEstado[selectedEstado] || [];
  
  // ✅ Function: checkCompletion
  // 📌 Description: Checks if all required address fields are filled
  // 📤 Returns: boolean - true if section is complete
  const checkCompletion = () => {
    return !!(cep && endereco && cidade && estado);
  };

  // ✅ Function: handleInputChange
  // 📌 Description: Handles input changes for text fields
  // 📥 Parameters: e (React.ChangeEvent<HTMLInputElement>)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.name, e.target.value);
  };

  // ✅ Function: handleSelectChange
  // 📌 Description: Handles select changes and resets dependent fields
  // 📥 Parameters: field (string), value (string)
  const handleSelectChange = (field: string, value: string) => {
    onInputChange(field, value);
    
    // Reset cidade when estado changes
    if (field === 'estado') {
      onInputChange('cidade', '');
    }
  };

  return (
    <AccordionItem value="address" className="border rounded-lg">
      <Card>
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <div className="flex items-center gap-3 w-full">
            <MapPin className="w-5 h-5 text-careconnect-blue" />
            <div className="text-left flex-1">
              <h3 className="font-semibold">Endereço</h3>
              <p className="text-sm text-gray-600">CEP, endereço, estado, cidade</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">CEP</label>
                <Input
                  name="cep"
                  value={cep}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="00000-000"
                  maxLength={9}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Endereço</label>
                <Input
                  name="endereco"
                  value={endereco}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Rua, número, complemento"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Estado</label>
                <Select
                  value={estado}
                  onValueChange={(value) => handleSelectChange('estado', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estados.map((estadoOption) => (
                      <SelectItem key={estadoOption} value={estadoOption}>
                        {estadoOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Cidade</label>
                <Select
                  value={cidade}
                  onValueChange={(value) => handleSelectChange('cidade', value)}
                  disabled={!isEditing || !estado}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={!estado ? "Selecione primeiro o estado" : "Selecione a cidade"} />
                  </SelectTrigger>
                  <SelectContent>
                    {cidades.map((cidadeOption) => (
                      <SelectItem key={cidadeOption} value={cidadeOption}>
                        {cidadeOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};

export default AddressSection;