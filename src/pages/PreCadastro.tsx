
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { RefreshCw, User, CheckCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Email inválido.",
  }),
  whatsapp: z.string().min(10, {
    message: "WhatsApp deve ter pelo menos 10 dígitos.",
  }),
  password: z.string().min(6, {
    message: "Senha deve ter pelo menos 6 caracteres.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function PreCadastro() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      password: "",
    },
  });

  const sendToWebhook = async (data: FormData) => {
    try {
      console.log("Enviando dados para webhook:", data);
      
      await fetch("https://n8n-n8n.n1n956.easypanel.host/webhook/sdr-youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp,
          timestamp: new Date().toISOString(),
          source: "cadastro-cuidador-acesso",
        }),
      });

      console.log("Dados enviados para webhook com sucesso");
      return true;
    } catch (error) {
      console.error("Erro ao enviar para webhook:", error);
      return false;
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log("Iniciando cadastro de acesso para:", data.email);

    try {
      // Primeiro, enviar para o webhook
      await sendToWebhook(data);

      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email.toLowerCase().trim(),
        password: data.password,
        options: {
          data: {
            name: data.name,
            whatsapp: data.whatsapp,
          }
        }
      });

      if (authError) {
        console.error("Erro ao criar usuário:", authError);
        if (authError.message.includes('already registered')) {
          toast.error("Este email já está cadastrado no sistema.");
        } else {
          toast.error("Erro ao criar conta. Tente novamente.");
        }
        return;
      }

      console.log("Usuário criado no auth:", authData);

      // Criar registro na tabela de candidatos
      const { data: candidateData, error: candidateError } = await supabase
        .from('candidatos_cuidadores_rows')
        .insert({
          nome: data.name,
          email: data.email.toLowerCase().trim(),
          telefone: data.whatsapp,
          data_nascimento: "1900-01-01",
          fumante: "Não",
          escolaridade: "Não informado",
          possui_experiencia: "Não",
          disponivel_dormir_local: "Não",
          status_candidatura: 'Em análise',
          cidade: '',
          endereco: "Não informado",
          cep: "00000-000",
          possui_filhos: false,
          cursos: "",
          experiencia: "",
          perfil_profissional: "",
          descricao_experiencia: "",
          disponibilidade_horarios: "A combinar",
          descricao: "",
          desconfortos_atividades: "",
          Declaracao: "Aceito",
          ativo: "Sim",
          data_cadastro: new Date().toISOString().split('T')[0]
        })
        .select()
        .single();

      if (candidateError) {
        console.error("Erro ao criar registro do candidato:", candidateError);
        // If it's a conflict but auth succeeded, we should still proceed or handle it
        if (candidateError.code !== '23505') {
          toast.error("Sua conta foi criada, mas houve um erro ao salvar seus dados profissionais. Por favor, complete seu perfil após o login.");
        }
      }

      console.log("Candidato criado:", candidateData);
      setIsSuccess(true);
      toast.success("Cadastro realizado com sucesso!");

    } catch (error) {
      console.error("Erro no cadastro:", error);
      toast.error("Erro ao processar cadastro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Layout>
        <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 via-white to-primary/5 min-h-screen flex items-center">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <Card className="border-2 border-green-100 shadow-2xl overflow-hidden">
              <div className="bg-green-500 h-2 w-full" />
              <CardContent className="pt-10 pb-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Cadastro Concluído!</h2>
                <p className="text-gray-600 text-lg mb-8">
                  Sua conta foi criada com sucesso. Enviamos um link de confirmação para o seu email. 
                  Por favor, verifique sua caixa de entrada.
                </p>
                
                <div className="space-y-4">
                  <Button 
                    onClick={() => navigate("/admin/login")} 
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                  >
                    Acessar meu Painel
                  </Button>
                  <p className="text-sm text-gray-500">
                    Você será redirecionado para a página de login onde poderá acessar sua área exclusiva.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                <User className="w-8 h-8" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">
                Seja um Cuidador
              </CardTitle>
              <p className="text-gray-500 mt-2">
                Cadastre-se para encontrar as melhores oportunidades.
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Seu nome completo" 
                            className="bg-gray-50/50"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="seu@email.com" 
                            className="bg-gray-50/50"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="(11) 99999-9999" 
                            className="bg-gray-50/50"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Mínimo 6 caracteres" 
                            className="bg-gray-50/50"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex gap-3">
                    <div className="bg-primary/20 p-2 rounded-lg h-fit">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Ao se cadastrar, você concorda com nossos termos. Você receberá notificações sobre vagas via WhatsApp.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 py-6 text-lg font-semibold shadow-lg shadow-primary/20 transition-all active:scale-95"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Criando Conta...
                      </div>
                    ) : "Começar Agora"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Já possui uma conta?{" "}
                  <a href="/admin/login" className="text-primary hover:underline">
                    Faça login aqui
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
