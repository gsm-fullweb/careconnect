import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Sparkles, User } from "lucide-react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { normalizeCity } from "@/lib/utils";

const CLIENT_SEARCH_STORAGE_KEY = "careconnect_client_search";
const TOTAL_STEPS = 4;

const maskCep = (value: string) => {
  const clean = value.replace(/\D/g, "").slice(0, 8);
  if (clean.length <= 5) return clean;
  return `${clean.slice(0, 5)}-${clean.slice(5)}`;
};

export default function EncontrarCuidador() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [cidade, setCidade] = useState("");
  const [diasHorarios, setDiasHorarios] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Passo 4 — dados de cadastro que o admin exibe (antes ficavam sempre vazios).
  const [dataNascimento, setDataNascimento] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [estado, setEstado] = useState("");

  const isStepValid = () => {
    switch (step) {
      case 1:
        return cidade.trim().length > 2;
      case 2:
        return diasHorarios.trim().length > 3;
      case 3:
        return nomeResponsavel.trim().length > 2 && whatsapp.replace(/\D/g, "").length >= 10;
      case 4:
        // Endereço e CEP são obrigatórios; data de nascimento é opcional.
        return endereco.trim().length > 3 && cep.replace(/\D/g, "").length === 8;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid()) setStep((prev) => Math.min(TOTAL_STEPS, prev + 1));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const maskPhone = (value: string) => {
    const clean = value.replace(/\D/g, "");
    if (clean.length <= 2) return clean;
    if (clean.length <= 6) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
    if (clean.length <= 10) return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
  };

  const handleSubmit = async () => {
    if (!isStepValid()) return;
    setSubmitting(true);

    try {
      const formattedWhatsapp = whatsapp.replace(/\D/g, "");
      const generatedEmail = `${formattedWhatsapp}@careconnect-family.com`;
      const normalizedCidade = normalizeCity(cidade);
      const specialCareText = `Disponibilidade desejada: ${diasHorarios}.`;
      const initialObs = `[Pre-cadastro Conversacional] Cliente informou necessidade para a regiao de ${normalizedCidade}. ${specialCareText}`;

      const dataHora = new Date().toLocaleString("pt-BR");
      const appendObs = `[Reenvio do Fluxo - ${dataHora}] Cidade: ${normalizedCidade}. ${specialCareText}`;

      // Captação de lead via RPC SECURITY DEFINER (sem acesso anônimo direto à
      // tabela customer). A função insere ou atualiza + acrescenta a observação.
      const { error: rpcError } = await supabase.rpc("upsert_customer_lead", {
        p_email: generatedEmail,
        p_name: nomeResponsavel,
        p_whatsapp: formattedWhatsapp,
        p_city: normalizedCidade,
        p_special_care: specialCareText,
        p_obs_initial: initialObs,
        p_obs_append: appendObs,
        p_birth_date: dataNascimento || null,
        p_cep: cep.replace(/\D/g, "") || null,
        p_address: endereco.trim() || null,
        p_state: estado.trim() || null,
      });

      if (rpcError) throw rpcError;

      const searchParams = new URLSearchParams({
        cidade: normalizedCidade,
        disponibilidade: diasHorarios.trim(),
      });

      localStorage.setItem(
        CLIENT_SEARCH_STORAGE_KEY,
        JSON.stringify({
          cidade: normalizedCidade,
          disponibilidade: diasHorarios.trim(),
          updatedAt: new Date().toISOString(),
        })
      );

      toast({
        title: "Solicitacao recebida!",
        description: "Vamos abrir o painel com sua cidade e disponibilidade.",
      });

      navigate(`/client-dashboard?${searchParams.toString()}`);
    } catch (error) {
      console.error("Erro no pre-cadastro da familia:", error);
      toast({
        title: "Erro no envio",
        description: "Nao foi possivel processar sua solicitacao no momento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getStepProgress = () => Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-100 flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center max-w-4xl">
        <div className="w-full">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-600/10 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Busca personalizada e segura
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Encontre o Cuidador Ideal
              </h1>
              <p className="text-gray-600 text-sm md:text-base mt-2 max-w-lg mx-auto">
                Registre sua necessidade. A busca e o contato com cuidadores ficam centralizados no painel do cliente.
              </p>
            </div>

            <Card className="shadow-2xl border-white/40 bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300">
              <div className="w-full h-2 bg-gray-100">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500 rounded-r-full"
                  style={{ width: `${getStepProgress()}%` }}
                />
              </div>

              <CardContent className="p-8 md:p-12">
                <div className="text-sm font-semibold text-purple-600 mb-2 tracking-wide uppercase">
                  Passo {step} de {TOTAL_STEPS}
                </div>

                <div className="min-h-[220px] flex flex-col justify-center">
                  {step === 1 && (
                    <div className="space-y-4 animate-fade-in">
                      <Label htmlFor="cidade" className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
                        Em qual cidade voce precisa de cuidador?
                      </Label>
                      <p className="text-gray-500 text-xs md:text-sm">
                        Informe o nome completo da cidade.
                      </p>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                        <Input
                          id="cidade"
                          type="text"
                          placeholder="Digite o nome da cidade..."
                          value={cidade}
                          onChange={(event) => setCidade(event.target.value)}
                          className="pl-12 py-6 text-lg border-gray-300 focus:ring-purple-500 rounded-xl"
                          onKeyDown={(event) => event.key === "Enter" && isStepValid() && handleNext()}
                          autoFocus
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <Label htmlFor="dias" className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
                        Quais dias e horarios voce precisa de apoio?
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                        <Input
                          id="dias"
                          type="text"
                          placeholder="Ex: Seg a Sex, das 8h as 18h..."
                          value={diasHorarios}
                          onChange={(event) => setDiasHorarios(event.target.value)}
                          className="pl-12 py-6 text-lg border-gray-300 focus:ring-purple-500 rounded-xl"
                          onKeyDown={(event) => event.key === "Enter" && isStepValid() && handleNext()}
                          autoFocus
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-5 animate-fade-in">
                      <Label className="text-xl md:text-2xl font-bold text-gray-800 leading-tight block">
                        Para finalizar, quem e o responsavel?
                      </Label>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nomeResp" className="text-sm font-medium text-gray-700">
                            Seu nome completo
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <Input
                              id="nomeResp"
                              type="text"
                              placeholder="Digite seu nome..."
                              value={nomeResponsavel}
                              onChange={(event) => setNomeResponsavel(event.target.value)}
                              className="pl-10 py-5 border-gray-300 rounded-xl"
                              autoFocus
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="whatsResp" className="text-sm font-medium text-gray-700">
                            Seu WhatsApp
                          </Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <Input
                              id="whatsResp"
                              type="tel"
                              placeholder="(00) 00000-0000"
                              value={whatsapp}
                              onChange={(event) => setWhatsapp(maskPhone(event.target.value))}
                              className="pl-10 py-5 border-gray-300 rounded-xl"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-5 animate-fade-in">
                      <Label className="text-xl md:text-2xl font-bold text-gray-800 leading-tight block">
                        Para concluir o cadastro, alguns dados do endereço
                      </Label>
                      <p className="text-gray-500 text-xs md:text-sm">
                        Usamos essas informações para indicar cuidadores próximos e organizar o atendimento.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cep" className="text-sm font-medium text-gray-700">
                            CEP
                          </Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <Input
                              id="cep"
                              type="text"
                              inputMode="numeric"
                              placeholder="00000-000"
                              value={cep}
                              onChange={(event) => setCep(maskCep(event.target.value))}
                              className="pl-10 py-5 border-gray-300 rounded-xl"
                              autoFocus
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="estado" className="text-sm font-medium text-gray-700">
                            Estado (UF)
                          </Label>
                          <Input
                            id="estado"
                            type="text"
                            maxLength={2}
                            placeholder="SP"
                            value={estado}
                            onChange={(event) => setEstado(event.target.value.toUpperCase())}
                            className="py-5 border-gray-300 rounded-xl uppercase"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endereco" className="text-sm font-medium text-gray-700">
                          Endereço (rua, número e bairro)
                        </Label>
                        <Input
                          id="endereco"
                          type="text"
                          placeholder="Ex: Rua das Flores, 123 - Centro"
                          value={endereco}
                          onChange={(event) => setEndereco(event.target.value)}
                          className="py-5 border-gray-300 rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nascimento" className="text-sm font-medium text-gray-700">
                          Data de nascimento do idoso <span className="text-gray-400">(opcional)</span>
                        </Label>
                        <Input
                          id="nascimento"
                          type="date"
                          value={dataNascimento}
                          onChange={(event) => setDataNascimento(event.target.value)}
                          className="py-5 border-gray-300 rounded-xl"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
                  {step > 1 ? (
                    <Button type="button" variant="ghost" onClick={handlePrev} className="text-gray-600 font-semibold">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < TOTAL_STEPS ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!isStepValid()}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-5 rounded-xl shadow-lg shadow-purple-600/20"
                    >
                      Avancar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!isStepValid() || submitting}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-8 py-6 rounded-xl shadow-xl shadow-purple-600/35 transition-all duration-300 hover:scale-105"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar solicitacao
                          <Sparkles className="w-4 h-4 ml-2 fill-white" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
      </main>

      <footer className="py-8 border-t border-gray-200/50 bg-white/50 text-center text-xs text-gray-500">
        <div className="container mx-auto px-4">
          <p>CareConnect. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
