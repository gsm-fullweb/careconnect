import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import SEO from "@/components/SEO";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { 
  RefreshCw, User, CheckCircle, ArrowRight, ArrowLeft, 
  MapPin, Briefcase, Heart, GraduationCap, Lock, Mail, Phone, Calendar,
  Clock, FileText, Award
} from "lucide-react";
import { normalizeCity } from "@/lib/utils";

// ─── Schema de validação completo ───────────────────────────────────────────
const formSchema = z.object({
  name: z.string().min(3, { message: "Nome completo é necessário." }),
  email: z.string().email({ message: "Email inválido." }),
  whatsapp: z.string().min(10, { message: "Mínimo 10 dígitos." }),
  password: z.string().min(6, { message: "Senha deve ter 6+ caracteres." }),
  birth_date: z.string().min(1, { message: "Data de nascimento é obrigatória." }),
  cep: z.string().min(8, { message: "CEP inválido." }),
  city: z.string().min(2, { message: "Cidade é necessária." }),
  address: z.string().min(5, { message: "Endereço completo é necessário." }),
  education: z.string().min(1, { message: "Selecione sua escolaridade." }),
  role: z.string().min(2, { message: "Informe seu cargo principal." }),
  experience_level: z.string().min(1, { message: "Selecione seu nível de experiência." }),
  experience_description: z.string().optional(),
  courses: z.string().optional(),
  has_experience: z.string(),
  availability: z.string().min(3, { message: "Informe sua disponibilidade." }),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
  { id: "personal", title: "Quem é você?", icon: User },
  { id: "account", title: "Acesso e Contato", icon: Lock },
  { id: "location", title: "Onde você atua?", icon: MapPin },
  { id: "professional", title: "Sua Formação", icon: GraduationCap },
  { id: "preferences", title: "Disponibilidade", icon: Heart },
];

export default function PreCadastro() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      password: "",
      birth_date: "",
      cep: "",
      city: "",
      address: "",
      education: "Ensino Médio",
      role: "Cuidador",
      experience_level: "Menos de 1 ano",
      experience_description: "",
      courses: "",
      has_experience: "Sim",
      availability: "",
    },
  });

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  // ─── CEP Auto-fill ────────────────────────────────────────────────────────
  const cepValue = form.watch("cep");
  useEffect(() => {
    const fetchAddress = async () => {
      const cleanCep = cepValue?.replace(/\D/g, "");
      if (cleanCep?.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
          const data = await response.json();
          if (!data.erro) {
            form.setValue("city", data.localidade);
            form.setValue("address", `${data.logradouro}, ${data.bairro}`);
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
        }
      }
    };
    fetchAddress();
  }, [cepValue, form]);

  // ─── Lógica de navegação ──────────────────────────────────────────────────
  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fields as any);
    if (isValid) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
      } else {
        form.handleSubmit(onSubmit)();
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
    window.scrollTo(0, 0);
  };

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 0: return ["name", "birth_date"];
      case 1: return ["email", "whatsapp", "password"];
      case 2: return ["cep", "city", "address"];
      case 3: return ["education", "role", "experience_level", "has_experience"];
      case 4: return ["availability"];
      default: return [];
    }
  };

  // ─── Submissão Final ──────────────────────────────────────────────────────
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // 1. Auth SignUp
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email.toLowerCase().trim(),
        password: data.password,
        options: { data: { name: data.name, whatsapp: data.whatsapp } },
      });

      if (authError) {
        // Se o erro NÃO for "já cadastrado", interrompemos.
        // Se FOR "já cadastrado", ignoramos o erro de Auth e tentamos inserir os dados na tabela de candidatos.
        if (!authError.message.toLowerCase().includes("user already registered") && 
            !authError.message.toLowerCase().includes("usuário já cadastrado")) {
          throw authError;
        }
      }

      // 2. Insert into candidatos_cuidadores_rows (Sempre tenta inserir se chegou aqui)
      const { error: dbError } = await supabase.from("candidatos_cuidadores_rows").insert({
        nome: data.name,
        email: data.email,
        telefone: data.whatsapp,
        data_nascimento: data.birth_date,
        cep: data.cep,
        cidade: normalizeCity(data.city),
        endereco: data.address,
        escolaridade: data.education,
        cargo: data.role,
        possui_experiencia: data.has_experience,
        disponivel_dormir_local: "A combinar",
        fumante: "Não informado",
        possui_filhos: false,
        status_candidatura: "Em análise",
        ativo: "Sim",
        data_cadastro: new Date().toLocaleDateString('en-CA'), // Formato YYYY-MM-DD local
        cursos: data.courses || "Não informado",
        referencias: "Não informado",
        perfil_profissional: "Candidato via site",
        Declaracao: "Aceito",
        disponibilidade_horarios: data.availability,
        desconfortos_atividades: "Nenhum",
        descricao_experiencia: data.experience_description || "Verificar com o candidato",
        experiencia: data.experience_level || "Não detalhado"
      });

      if (dbError) {
        // Se já existe na tabela de candidatos mas não deu erro no auth, também consideramos sucesso
        if (dbError.message.includes("duplicate key")) {
          localStorage.setItem('fallback_user', JSON.stringify({ name: data.name, email: data.email }));
          navigate("/obrigado");
          return;
        }
        throw dbError;
      }

      localStorage.setItem('fallback_user', JSON.stringify({ name: data.name, email: data.email }));
      navigate("/obrigado");
    } catch (err: any) {
      toast.error(err.message || "Erro ao realizar cadastro.");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <Layout>
      <SEO title="Cadastro de Cuidador" canonical="/pre-cadastro" noindex={true} />
      <section className="py-12 md:py-20 bg-slate-50 min-h-screen">

        <div className="container mx-auto px-4 max-w-xl">
          <div className="mb-8 space-y-2">
            <div className="flex justify-between items-end text-sm text-gray-500 mb-1">
              <span>Passo {currentStep + 1} de {STEPS.length}</span>
              <span className="font-semibold text-primary">{Math.round(progress)}% Completo</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="border-0 shadow-xl bg-white overflow-hidden">
            <CardHeader className="bg-primary/5 py-4 border-b flex flex-row items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                {(() => {
                  const Icon = STEPS[currentStep].icon;
                  return <Icon className="w-6 h-6" />;
                })()}
              </div>
              <div>
                <CardTitle className="text-xl font-bold">{STEPS[currentStep].title}</CardTitle>
                <p className="text-sm text-gray-500">Vamos completar seu perfil profissional.</p>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <Form {...form}>
                <form className="space-y-6">
                  {currentStep === 0 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Como você gostaria de ser chamado?</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input placeholder="Nome Completo" className="pl-10 h-12" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="birth_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Data de Nascimento</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input type="date" className="pl-10 h-12" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Seu melhor email profissional</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <Input placeholder="email@exemplo.com" className="pl-10 h-12" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="whatsapp" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">WhatsApp (para receber vagas)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <Input placeholder="(00) 00000-0000" className="pl-10 h-12" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Defina sua senha</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <Input type="password" placeholder="Mínimo 6 caracteres" className="pl-10 h-12" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                      <FormField control={form.control} name="cep" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Qual seu CEP?</FormLabel>
                          <FormControl>
                            <Input placeholder="00000-000" className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Cidade</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: São Paulo" className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Endereço</FormLabel>
                          <FormControl>
                            <Input placeholder="Rua, número e bairro" className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                      <FormField control={form.control} name="education" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Sua Escolaridade</FormLabel>
                          <FormControl>
                            <select className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...field}>
                              <option value="Ensino Médio">Ensino Médio</option>
                              <option value="Técnico em Enfermagem">Técnico em Enfermagem</option>
                              <option value="Graduação em Enfermagem">Graduação em Enfermagem</option>
                              <option value="Cuidador de Idosos">Curso de Cuidador Profissional</option>
                              <option value="Outros">Outros</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="role" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Como você se define profissionalmente?</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <Input placeholder="Ex: Cuidador de Idosos" className="pl-10 h-12" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="experience_level" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Tempo / Nível de Experiência</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <select className="flex h-12 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...field}>
                                <option value="Menos de 1 ano">Menos de 1 ano</option>
                                <option value="1 a 2 anos">1 a 2 anos</option>
                                <option value="3 a 5 anos">3 a 5 anos</option>
                                <option value="5 a 10 anos">5 a 10 anos</option>
                                <option value="Mais de 10 anos">Mais de 10 anos</option>
                              </select>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="experience_description" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Descrição de Experiência</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                              <Textarea 
                                placeholder="Descreva brevemente suas experiências anteriores como cuidador(a)..." 
                                className="pl-10 min-h-[100px] resize-none" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="courses" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Cursos Realizados</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Award className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                              <Textarea 
                                placeholder="Ex: Curso de Cuidador de Idosos (2023), Primeiros Socorros (2022)..." 
                                className="pl-10 min-h-[100px] resize-none" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="has_experience" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Possui experiência comprovada?</FormLabel>
                          <FormControl>
                            <div className="flex gap-4">
                              {["Sim", "Não"].map((val) => (
                                <Button 
                                  key={val}
                                  type="button" 
                                  variant={field.value === val ? "default" : "outline"}
                                  className="flex-1 py-6"
                                  onClick={() => field.onChange(val)}
                                >
                                  {val}
                                </Button>
                              ))}
                            </div>
                          </FormControl>
                        </FormItem>
                      )} />
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                      <FormField control={form.control} name="availability" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Quais dias e horários você está disponível?</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                              <Textarea 
                                placeholder="Ex: Segunda a sexta, das 8h às 18h. Sábados pela manhã..." 
                                className="pl-10 min-h-[120px] resize-none" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  )}

                  <div className="flex gap-4 pt-6 mt-6 border-t font-medium">
                    {currentStep > 0 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={prevStep}
                        className="py-6 flex-1 text-gray-500"
                        disabled={isSubmitting}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar
                      </Button>
                    )}
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="py-6 flex-[2] bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                      disabled={isSubmitting}
                    >
                      {currentStep === STEPS.length - 1 ? (
                        isSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Finalizando...
                          </>
                        ) : "Concluir Cadastro"
                      ) : (
                        <>
                          Continuar
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <p className="text-center mt-6 text-sm text-gray-400">
            Passo {currentStep + 1} de {STEPS.length}: {STEPS[currentStep].title}
          </p>
        </div>
      </section>
    </Layout>
  );
}

