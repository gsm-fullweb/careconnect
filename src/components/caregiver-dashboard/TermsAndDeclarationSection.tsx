import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileCheck, AlertTriangle, ExternalLink } from 'lucide-react';

// ✅ Interface: TermsAndDeclarationSectionProps
// 📌 Description: Defines the props for the TermsAndDeclarationSection component
// 📥 Parameters: acceptedTerms (boolean), acceptedDeclaration (boolean), isEditing (boolean), onTermsChange (function), onDeclarationChange (function)
interface TermsAndDeclarationSectionProps {
  acceptedTerms: boolean;
  acceptedDeclaration: boolean;
  isEditing: boolean;
  onTermsChange: (accepted: boolean) => void;
  onDeclarationChange: (accepted: boolean) => void;
}

// ✅ Constant: TERMS_TEXT
// 📌 Description: Contains the terms of use and privacy policy text
const TERMS_TEXT = `
TERMOS DE USO E POLÍTICA DE PRIVACIDADE

1. ACEITAÇÃO DOS TERMOS
Ao utilizar nossa plataforma, você concorda com estes termos de uso e nossa política de privacidade.

2. COLETA DE DADOS
Coletamos apenas as informações necessárias para conectar cuidadores e clientes de forma segura.

3. USO DAS INFORMAÇÕES
Suas informações serão utilizadas exclusivamente para:
- Criação e manutenção do seu perfil
- Conexão com potenciais clientes
- Comunicação sobre oportunidades de trabalho
- Melhorias na plataforma

4. COMPARTILHAMENTO DE DADOS
Seus dados pessoais não serão vendidos ou compartilhados com terceiros sem seu consentimento, exceto quando necessário para a prestação do serviço.

5. SEGURANÇA
Implementamos medidas de segurança para proteger suas informações pessoais.

6. SEUS DIREITOS
Você tem o direito de:
- Acessar seus dados pessoais
- Corrigir informações incorretas
- Solicitar a exclusão de seus dados
- Retirar seu consentimento a qualquer momento

7. CONTATO
Para dúvidas sobre estes termos ou nossa política de privacidade, entre em contato conosco.

Última atualização: Janeiro de 2024
`;

// ✅ Component: TermsAndDeclarationSection
// 📌 Description: Component for handling terms acceptance and declaration of information veracity with improved accessibility and UX
// 📥 Parameters: TermsAndDeclarationSectionProps
// 📤 Returns: JSX.Element - Terms and declaration form section
const TermsAndDeclarationSection: React.FC<TermsAndDeclarationSectionProps> = ({
  acceptedTerms,
  acceptedDeclaration,
  isEditing,
  onTermsChange,
  onDeclarationChange,
}) => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState<boolean>(false);

  // ✅ Function: handleTermsChange
  // 📌 Description: Handles terms acceptance change with proper type checking
  // 📥 Parameters: checked (boolean | string)
  // 📤 Returns: void
  const handleTermsChange = (checked: boolean | string) => {
    onTermsChange(Boolean(checked));
  };

  // ✅ Function: handleDeclarationChange
  // 📌 Description: Handles declaration acceptance change with proper type checking
  // 📥 Parameters: checked (boolean | string)
  // 📤 Returns: void
  const handleDeclarationChange = (checked: boolean | string) => {
    onDeclarationChange(Boolean(checked));
  };

  // ✅ Function: handleKeyDown
  // 📌 Description: Handles keyboard navigation for terms link
  // 📥 Parameters: event (React.KeyboardEvent)
  // 📤 Returns: void
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsTermsModalOpen(true);
    }
  };

  const hasRequiredAcceptances = acceptedTerms && acceptedDeclaration;
  const showWarning = isEditing && !hasRequiredAcceptances;

  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <FileCheck className="w-6 h-6" />
          Termos e Declaração
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Terms and Privacy Policy */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={handleTermsChange}
              disabled={!isEditing}
              aria-describedby="terms-description"
            />
            <div className="grid gap-1.5 leading-none flex-1">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Aceito os{' '}
                <Dialog open={isTermsModalOpen} onOpenChange={setIsTermsModalOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm text-blue-600 hover:text-blue-800 underline"
                      onKeyDown={handleKeyDown}
                      aria-label="Abrir termos de uso e política de privacidade"
                    >
                      Termos de Uso e Política de Privacidade
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>Termos de Uso e Política de Privacidade</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
                      <div className="whitespace-pre-line text-sm leading-relaxed">
                        {TERMS_TEXT}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </label>
              <p id="terms-description" className="text-xs text-muted-foreground">
                Leia e aceite nossos termos para continuar
              </p>
            </div>
          </div>

          {/* Declaration of Information Veracity */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="declaration"
              checked={acceptedDeclaration}
              onCheckedChange={handleDeclarationChange}
              disabled={!isEditing}
              aria-describedby="declaration-description"
            />
            <div className="grid gap-1.5 leading-none flex-1">
              <label
                htmlFor="declaration"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 cursor-pointer"
              >
                <FileCheck className="h-4 w-4 text-green-600" />
                Declaro que todas as informações fornecidas são verdadeiras
              </label>
              <p id="declaration-description" className="text-xs text-muted-foreground leading-relaxed">
                Confirmo que todos os dados pessoais, profissionais e de experiência informados neste cadastro são verdadeiros e estou ciente de que a prestação de informações falsas pode resultar no cancelamento do meu cadastro.
              </p>
            </div>
          </div>

          {/* Warning message when editing and terms/declaration not accepted */}
          {showWarning && (
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg" role="alert">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 mb-1">
                  Ação necessária
                </p>
                <p className="text-sm text-yellow-700">
                  É necessário aceitar os termos e confirmar a declaração para salvar as alterações.
                </p>
              </div>
            </div>
          )}

          {/* Success message when both are accepted */}
          {hasRequiredAcceptances && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <FileCheck className="h-4 w-4 text-green-600" />
              <p className="text-sm text-green-800">
                Termos aceitos e declaração confirmada
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TermsAndDeclarationSection;