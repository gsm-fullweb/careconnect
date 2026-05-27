import React, { useState, useEffect, useRef } from "react";
import { PUBLIC_CAREGIVER_FIELDS, formatCargoLabel, formatDate, formatPhoneDisplay, getCanonicalCargoKey, getWhatsAppHref, normalizeCity } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, MessageSquare, User, Star, MapPin, Phone, LogOut, Heart, Filter } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditCuidadorModal } from "@/components/admin/EditCuidadorModal";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { isCaregiverUser } from "@/lib/authRole";
import { useNavigate, Navigate, useLocation } from 'react-router-dom';

const CLIENT_SEARCH_STORAGE_KEY = "careconnect_client_search";

type ClientSearchFilters = {
  cidade: string;
  disponibilidade: string;
};

const getInitialClientSearchFilters = (search: string): ClientSearchFilters => {
  const params = new URLSearchParams(search);
  const filters: ClientSearchFilters = {
    cidade: params.get("cidade") || "",
    disponibilidade: params.get("disponibilidade") || "",
  };

  if (filters.cidade || filters.disponibilidade || typeof window === "undefined") {
    return filters;
  }

  try {
    const stored = localStorage.getItem(CLIENT_SEARCH_STORAGE_KEY);
    if (!stored) return filters;
    const parsed = JSON.parse(stored);
    return {
      cidade: typeof parsed?.cidade === "string" ? parsed.cidade : "",
      disponibilidade: typeof parsed?.disponibilidade === "string" ? parsed.disponibilidade : "",
    };
  } catch {
    return filters;
  }
};

const ClienteDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const initialClientSearchRef = useRef<ClientSearchFilters | null>(null);

  if (initialClientSearchRef.current === null) {
    initialClientSearchRef.current = getInitialClientSearchFilters(location.search);
  }

  const initialClientSearch = initialClientSearchRef.current;

  // Estados de Perfil
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [shouldRedirectToCaregiver, setShouldRedirectToCaregiver] = useState(false);
  const initialLoadUserIdRef = useRef<string | null>(null);

  // Estados principais (para Clientes)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(
    initialClientSearch.cidade ? normalizeCity(initialClientSearch.cidade) : "__all__"
  );
  const [selectedCargo, setSelectedCargo] = useState("__all__");
  const [requestedAvailability, setRequestedAvailability] = useState(initialClientSearch.disponibilidade);
  const [cuidadoresEncontrados, setCuidadoresEncontrados] = useState<any[]>([]);
  const [cuidadorSelecionado, setCuidadorSelecionado] = useState<any>(null);
  const [buscaRealizada, setBuscaRealizada] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availableCargos, setAvailableCargos] = useState<string[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [cuidadorParaEditar, setCuidadorParaEditar] = useState<any>(null);

  // Estados (para Cuidadores)
  const [candidatoData, setCandidatoData] = useState<any>(null);

  // Estados para depoimentos
  const [novoDepoimento, setNovoDepoimento] = useState({
    cuidador_id: "",
    cuidador_nome: "",
    texto: "",
    avaliacao: 5
  });
  const [meusDepoimentos, setMeusDepoimentos] = useState<any[]>([]);

  const normalizeFilterText = (text: string | null | undefined) =>
    (text || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");

  // Carregar dados iniciais e Perfil
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      initialLoadUserIdRef.current = null;
      setProfileLoading(false);
      return;
    }

    if (initialLoadUserIdRef.current === user.id) return;
    initialLoadUserIdRef.current = user.id;

    const fetchProfile = async () => {
      try {
        const caregiver = await isCaregiverUser(user);
        setShouldRedirectToCaregiver(caregiver);

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setUserProfile(profile);

        // Se for cuidador, buscar dados na tabela de candidatos
        if (caregiver) {
          const { data: candidato } = await supabase
            .from('candidatos_cuidadores_rows')
            .select('*')
            .ilike('email', user.email?.trim().toLowerCase() ?? '')
            .maybeSingle();
          setCandidatoData(candidato);
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
    loadMeusDepoimentos();
    loadFavoritos();
    loadFilterOptions();
    // Executa uma vez ao entrar na pagina. Depois disso, so pelo botao/Enter de busca.
    handleBuscarCuidadores();
  }, [user?.id, authLoading]);

  const loadFilterOptions = async () => {
    try {
      // Carregar cidades únicas
      const { data: cidadesData } = await supabase
        .from('candidatos_cuidadores_rows')
        .select('cidade')
        .eq('status_candidatura', 'Aprovado')
        .or('ativo.eq.Sim,ativo.eq.true,ativo.is.null')
        .not('cidade', 'is', null);

      // Carregar cargos únicos
      const { data: cargosData } = await supabase
        .from('candidatos_cuidadores_rows')
        .select('cargo')
        .eq('status_candidatura', 'Aprovado')
        .or('ativo.eq.Sim,ativo.eq.true,ativo.is.null')
        .not('cargo', 'is', null);

      const uniqueCities = [
        ...new Set(cidadesData?.map(item => normalizeCity(item.cidade)).filter(Boolean))
      ].sort();
      const uniqueCargoKeys = [
        ...new Set(cargosData?.map(item => getCanonicalCargoKey(item.cargo)).filter(Boolean))
      ].sort((a, b) => formatCargoLabel(a).localeCompare(formatCargoLabel(b), "pt-BR"));

      setAvailableCities(uniqueCities);
      setAvailableCargos(uniqueCargoKeys);
    } catch (error) {
      console.error('Erro ao carregar opções de filtro:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logout realizado",
        description: "Você saiu da sua conta.",
      });
      setTimeout(() => {
        navigate('/');
      }, 200); // Pequeno delay para garantir atualização do contexto antes do redirect
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast({
        title: "Erro ao sair",
        description: "Ocorreu um problema ao sair. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleBuscarCuidadores = async () => {
    setLoading(true);
    setBuscaRealizada(true);

    try {
      console.log('Iniciando busca de cuidadores...');
      console.log('Filtros aplicados:', { searchTerm, selectedCity, selectedCargo, requestedAvailability });

      // Normalizar o termo de busca
      const termoNormalizado = searchTerm?.trim().toLowerCase() || '';
      const disponibilidadeNormalizada = normalizeFilterText(requestedAvailability);

      let query = supabase
        .from('candidatos_cuidadores_rows')
        .select(PUBLIC_CAREGIVER_FIELDS)
        .eq('status_candidatura', 'Aprovado')
        .or('ativo.eq.Sim,ativo.eq.true,ativo.is.null');

      // Filtro nome ou ID (já que o nome real é ocultado)
      if (termoNormalizado) {
        const matchId = termoNormalizado.match(/\d+/);
        if ((termoNormalizado.includes('cuidador') || termoNormalizado.includes('#')) && matchId) {
          query = query.eq('id', Number(matchId[0]));
        } else if (!isNaN(Number(termoNormalizado)) && termoNormalizado.trim() !== '') {
          query = query.eq('id', Number(termoNormalizado));
        } else {
          query = query.ilike('nome', `%${termoNormalizado}%`);
        }
      }

      const { data, error } = await query
        .order('nome')
        .limit(100);

      if (error) {
        console.error('Erro na query:', error);
        throw error;
      }

      const cuidadoresFiltrados = (data || []).filter((cuidador) => {
        const matchesCity =
          !selectedCity ||
          selectedCity === "__all__" ||
          normalizeFilterText(cuidador.cidade) === normalizeFilterText(selectedCity);

        const matchesCargo =
          !selectedCargo ||
          selectedCargo === "__all__" ||
          getCanonicalCargoKey(cuidador.cargo) === selectedCargo;

        return matchesCity && matchesCargo;
      });

      // Mapear os dados para o formato da tabela
      const cuidadoresFormatados = cuidadoresFiltrados.map(cuidador => {
        return {
          id: cuidador.id,
          nome: cuidador.nome || `Cuidador #${cuidador.id}`,
          nomePublico: cuidador.nome || `Cuidador #${cuidador.id}`,
          cidade: cuidador.cidade || 'Não informado',
          cargo: formatCargoLabel(cuidador.cargo),
          experiencia: cuidador.experiencia || 'Não informado',
          disponibilidade: cuidador.disponibilidade_horarios || 'Não informado',
          descricao: cuidador.descricao_experiencia || 'Profissional experiente',
          telefone: cuidador.telefone || ''
        };
      }).sort((a, b) => {
        if (!disponibilidadeNormalizada) return 0;
        const aMatches = normalizeFilterText(a.disponibilidade).includes(disponibilidadeNormalizada);
        const bMatches = normalizeFilterText(b.disponibilidade).includes(disponibilidadeNormalizada);
        return Number(bMatches) - Number(aMatches);
      });

      setCuidadoresEncontrados(cuidadoresFormatados);

      const filtrosAplicados = [
        termoNormalizado && `nome: "${termoNormalizado}"`,
        selectedCity !== "__all__" && `cidade: "${selectedCity}"`,
        selectedCargo !== "__all__" && `cargo: "${formatCargoLabel(selectedCargo)}"`,
        requestedAvailability && `disponibilidade desejada: "${requestedAvailability}"`
      ].filter(Boolean).join(', ');

      toast({
        title: "Busca realizada com sucesso",
        description: `Encontrados ${cuidadoresFormatados.length} cuidador(es)${filtrosAplicados ? ` com filtros: ${filtrosAplicados}` : ''}`,
      });

    } catch (error) {
      console.error('Erro ao buscar cuidadores:', error);
      toast({
        title: "Erro na busca",
        description: "Ocorreu um erro ao buscar cuidadores. Tente novamente.",
        variant: "destructive"
      });
      setCuidadoresEncontrados([]);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCity("__all__");
    setSelectedCargo("__all__");
    setRequestedAvailability("");
    setCuidadoresEncontrados([]);
    setBuscaRealizada(false);
    localStorage.removeItem(CLIENT_SEARCH_STORAGE_KEY);

    toast({
      title: "Filtros limpos",
      description: "Todos os filtros foram removidos. Faça uma nova busca.",
    });
  };

  const handleDemonstrarInteresse = async (cuidador: any) => {
    if (!user) {
      toast({
        title: "Atenção",
        description: "Você precisa estar logado para demonstrar interesse.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    try {
      const email = user.email;
      const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email || 'Cliente Logado';
      const whatsapp = user.user_metadata?.phone || user.user_metadata?.whatsapp || '';
      
      const { data: customerData, error: fetchError } = await supabase
        .from('customer')
        .select('*')
        .eq('email', email)
        .maybeSingle();
        
      if (fetchError) throw fetchError;
      
      const dataHora = new Date().toLocaleString('pt-BR');
      const novaObservacao = `[${dataHora}] Demonstrou interesse no cuidador ${cuidador.nomePublico || `ID ${cuidador.id}`}. WhatsApp liberado ao cliente: ${formatPhoneDisplay(cuidador.telefone)}.`;
      
      if (customerData) {
        const obsAtual = customerData.observations ? `${customerData.observations}\n${novaObservacao}` : novaObservacao;
        
        const { error: updateError } = await supabase
          .from('customer')
          .update({
            observations: obsAtual,
            updated_at: new Date().toISOString()
          })
          .eq('id', customerData.id);
          
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('customer')
          .insert({
            name: name,
            email: email,
            whatsapp: whatsapp || 'Não informado',
            city: cuidador.cidade || 'Não informada',
            observations: novaObservacao,
            status: 'pending',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
        if (insertError) throw insertError;
      }
      
      toast({
        title: "WhatsApp liberado!",
        description: `Voce ja pode contatar ${cuidador.nomePublico} pelo WhatsApp.`,
      });

      const whatsappHref = getWhatsAppHref(
        cuidador.telefone,
        `Ola, encontrei seu perfil na CareConnect e tenho interesse em conversar sobre cuidados.`
      );

      if (whatsappHref) {
        window.open(whatsappHref, '_blank', 'noopener,noreferrer');
      }
      
    } catch (error) {
      console.error('Erro ao registrar interesse:', error);
      toast({
        title: "Erro ao registrar interesse",
        description: "Não foi possível registrar seu interesse no momento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorito = async (cuidadorId: string) => {
    const isFavorito = favoritos.includes(cuidadorId);

    try {
      if (isFavorito) {
        // Remover dos favoritos
        setFavoritos(prev => prev.filter(id => id !== cuidadorId));
        toast({
          title: "Removido dos favoritos",
          description: "Cuidador removido da sua lista de favoritos.",
        });
      } else {
        // Adicionar aos favoritos
        setFavoritos(prev => [...prev, cuidadorId]);
        toast({
          title: "Adicionado aos favoritos",
          description: "Cuidador adicionado à sua lista de favoritos.",
        });
      }
    } catch (error) {
      console.error('Erro ao gerenciar favoritos:', error);
    }
  };

  const loadFavoritos = () => {
    // Em uma implementação real, isso viria do localStorage ou banco de dados
    const favoritosLocal = localStorage.getItem(`favoritos_${user?.id}`);
    if (favoritosLocal) {
      setFavoritos(JSON.parse(favoritosLocal));
    }
  };

  // Salvar favoritos no localStorage quando mudarem
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`favoritos_${user.id}`, JSON.stringify(favoritos));
    }
  }, [favoritos, user?.id]);

  const handleSelecionarCuidador = (cuidador: any) => {
    setCuidadorSelecionado(cuidador);
    setNovoDepoimento({
      ...novoDepoimento,
      cuidador_id: cuidador.id,
      cuidador_nome: cuidador.nomePublico
    });

    toast({
      title: "Cuidador selecionado",
      description: `${cuidador.nomePublico} foi selecionado para avaliação.`,
    });
  };

  const handleSubmitDepoimento = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cuidadorSelecionado) {
      toast({
        title: "Erro",
        description: "Selecione um cuidador para avaliar.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('testimonials')
        .insert({
          name: user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || 'Cliente',
          role: 'Cliente',
          content: novoDepoimento.texto,
          rating: novoDepoimento.avaliacao,
          published: false,
          customer_id: user?.id,
          caregiver_id: novoDepoimento.cuidador_id
        });

      if (error) throw error;

      toast({
        title: "Depoimento enviado",
        description: "Seu depoimento foi enviado com sucesso e está em análise.",
      });

      setNovoDepoimento({ cuidador_id: "", cuidador_nome: "", texto: "", avaliacao: 5 });
      setCuidadorSelecionado(null);

      loadMeusDepoimentos();
    } catch (error) {
      console.error("Erro ao enviar depoimento:", error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar seu depoimento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMeusDepoimentos = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (error && error.code !== '42P01') throw error;

      setMeusDepoimentos(data || []);
    } catch (error) {
      console.error('Erro ao carregar depoimentos:', error);
      setMeusDepoimentos([]);
    }
  };

  // Guard de autenticação
  if (!authLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  // Loading de autenticação ou perfil
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-careconnect-blue border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 animate-pulse">Preparando seu dashboard...</p>
        </div>
      </div>
    );
  }

  // Redireciona cuidadores diretamente para o painel de cuidador
  if (shouldRedirectToCaregiver) {
    return <Navigate to="/painel-cuidador" replace />;
  }

  const isCaregiver = false;
  const cityOptions = selectedCity !== "__all__" && !availableCities.includes(selectedCity)
    ? [selectedCity, ...availableCities]
    : availableCities;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isCaregiver ? `Bem-vindo, ${userProfile?.name?.split(' ')[0] || 'Profissional'}` : 'Busca de Cuidadores'}
              </h1>
              <p className="text-gray-600">
                {isCaregiver 
                  ? 'Gerencie seu perfil e acompanhe suas oportunidades' 
                  : 'Encontre o cuidador ideal para suas necessidades'}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {isCaregiver ? (
          /* ==========================================
             VISÃO DO CUIDADOR
             ========================================== */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Card de Status */}
              <Card className="border-l-4 border-l-careconnect-blue shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    Status da sua Conta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-blue-50/50 rounded-xl">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-blue-100">
                      <User className="w-10 h-10 text-careconnect-blue" />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{candidatoData?.nome || userProfile?.name}</h3>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          candidatoData?.status_candidatura === 'Aprovado' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {candidatoData?.status_candidatura || 'Em Análise'}
                        </span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          {candidatoData?.cargo || 'Cuidador'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg bg-white">
                      <p className="text-sm text-gray-500 mb-1">Cidade de Atuação</p>
                      <p className="font-semibold flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-careconnect-blue" />
                        {candidatoData?.cidade || 'Não informado'}
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg bg-white">
                      <p className="text-sm text-gray-500 mb-1">Contato Registrado</p>
                      <p className="font-semibold flex items-center gap-2">
                        <Phone className="w-4 h-4 text-careconnect-blue" />
                        {candidatoData?.telefone || 'Não informado'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card de Mensagem / Próximos Passos */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-blue-900">Experiência Profissional</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 leading-relaxed italic">
                      "{candidatoData?.descricao_experiencia || 'Seu resumo profissional aparecerá aqui assim que for revisado por nossa equipe.'}"
                    </p>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-bold text-gray-900 mb-2">💡 Dica Care Connect:</h4>
                    <p className="text-sm text-gray-600">
                      Mantenha seu telefone sempre ativo! As famílias costumam entrar em contato via WhatsApp para agendar entrevistas rápidas.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Cuidador */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-none shadow-xl">
                <CardContent className="pt-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                      <Heart className="w-8 h-8 text-white fill-white" />
                    </div>
                    <h3 className="text-xl font-bold">Mantenha o Foco!</h3>
                    <p className="text-blue-100 text-sm">
                      Estamos conectando seu perfil com as melhores famílias da sua região.
                    </p>
                    <div className="pt-4">
                      <Button className="w-full bg-white text-blue-800 hover:bg-blue-50 font-bold py-6 rounded-xl shadow-lg">
                        Atualizar Meu Currículo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-gray-400">Suporte</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Precisa de ajuda com sua conta ou tem dúvidas sobre vagas?</p>
                  <Button variant="outline" className="w-full justify-start gap-2 py-6 border-blue-100 text-blue-700 hover:bg-blue-50">
                    <MessageSquare className="w-4 h-4" />
                    Falar com Atendimento
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* ==========================================
             VISÃO DO CLIENTE (BUSCA)
             ========================================== */
          <>
            {/* Busca com filtros */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Buscar Cuidadores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Primeira linha - Nome */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Cuidador
                  </label>
                  <Input
                    placeholder="Digite parte do nome (ex: 'ali' para Aline) ou deixe vazio para ver todos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleBuscarCuidadores()}
                  />
                </div>

                {/* Segunda linha - Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cidade
                    </label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma cidade" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                        <SelectItem value="__all__">Todas as cidades</SelectItem>
                        {cityOptions.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cargo/Especialidade
                    </label>
                    <Select value={selectedCargo} onValueChange={setSelectedCargo}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cargo" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                        <SelectItem value="__all__">Todos os cargos</SelectItem>
                        {availableCargos.map((cargo) => (
                          <SelectItem key={cargo} value={cargo}>{formatCargoLabel(cargo)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Terceira linha - Botões */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Disponibilidade desejada
                  </label>
                  <Input
                    placeholder="Ex: Seg a Sex, das 8h as 18h..."
                    value={requestedAvailability}
                    onChange={(e) => setRequestedAvailability(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleBuscarCuidadores()}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleBuscarCuidadores}
                    disabled={loading}
                    className="flex-1 md:flex-none"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {loading ? "Buscando..." : "Buscar"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Limpar Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tabela de Resultados */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Cuidadores Encontrados ({cuidadoresEncontrados.length})</CardTitle>
                    <p className="text-sm text-gray-500">
                      Exibimos apenas dados parciais. Ao demonstrar interesse, liberamos somente o WhatsApp do cuidador.
                    </p>
                  </CardHeader>
                  <CardContent>
                    {!buscaRealizada ? (
                      <div className="text-center py-12 text-gray-500">
                        <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <h3 className="text-lg font-medium mb-2">Faça sua primeira busca</h3>
                        <p>Use os filtros acima e clique em "Buscar"</p>
                      </div>
                    ) : cuidadoresEncontrados.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <User className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <h3 className="text-lg font-medium mb-2">Nenhum cuidador encontrado</h3>
                        <p>Tente ajustar os filtros ou limpar a busca</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Cuidador</TableHead>
                              <TableHead>Cidade</TableHead>
                              <TableHead>Disponibilidade</TableHead>
                              <TableHead className="text-center">Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {cuidadoresEncontrados.map((cuidador) => (
                              <TableRow key={cuidador.id} className="hover:bg-gray-50">
                                <TableCell>
                                  <div>
                                    <p className="font-medium text-gray-900">{cuidador.nomePublico}</p>
                                    <p className="text-sm text-gray-600">{cuidador.cargo}</p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    {cuidador.cidade}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <span className="text-sm text-gray-700">{cuidador.disponibilidade}</span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-2 justify-center">
                                    <Button
                                      size="sm"
                                      variant={favoritos.includes(cuidador.id) ? "default" : "outline"}
                                      onClick={() => toggleFavorito(cuidador.id)}
                                      className="px-2 animate-hover"
                                      title={favoritos.includes(cuidador.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                                    >
                                      <Heart className={`w-4 h-4 ${favoritos.includes(cuidador.id) ? 'fill-red-500 text-red-500' : ''}`} />
                                    </Button>
 
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleSelecionarCuidador(cuidador)}
                                      className="animate-hover"
                                    >
                                      <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
                                      Avaliar
                                    </Button>
 
                                    <Button
                                      size="sm"
                                      className="bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all duration-300 shadow-sm hover:shadow animate-hover"
                                      onClick={() => handleDemonstrarInteresse(cuidador)}
                                      disabled={loading}
                                    >
                                      <Phone className="w-4 h-4 mr-1" />
                                      WhatsApp
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Avaliações */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Avaliar Cuidador
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!cuidadorSelecionado ? (
                      <div className="text-center py-6 text-gray-500">
                        <Star className="w-10 h-10 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">Selecione um cuidador da tabela para avaliar</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitDepoimento} className="space-y-4">
                        <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                          <p className="font-medium text-blue-900">{cuidadorSelecionado.nomePublico}</p>
                          <p className="text-sm text-blue-700">{cuidadorSelecionado.cidade}</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sua Avaliação
                          </label>
                          <select
                            value={novoDepoimento.avaliacao}
                            onChange={(e) => setNovoDepoimento({
                              ...novoDepoimento,
                              avaliacao: parseInt(e.target.value)
                            })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                          >
                            <option value={5}>⭐⭐⭐⭐⭐ Excelente (5)</option>
                            <option value={4}>⭐⭐⭐⭐ Muito Bom (4)</option>
                            <option value={3}>⭐⭐⭐ Bom (3)</option>
                            <option value={2}>⭐⭐ Regular (2)</option>
                            <option value={1}>⭐ Ruim (1)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Seu Depoimento
                          </label>
                          <Textarea
                            value={novoDepoimento.texto}
                            onChange={(e) => setNovoDepoimento({
                              ...novoDepoimento,
                              texto: e.target.value
                            })}
                            placeholder="Conte como foi sua experiência com este cuidador..."
                            rows={4}
                            required
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setCuidadorSelecionado(null);
                              setNovoDepoimento({ cuidador_id: "", cuidador_nome: "", texto: "", avaliacao: 5 });
                            }}
                            className="flex-1"
                          >
                            Cancelar
                          </Button>
                          <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1"
                          >
                            {loading ? "Enviando..." : "Enviar Avaliação"}
                          </Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Minhas Avaliações ({meusDepoimentos.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {meusDepoimentos.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">Nenhuma avaliação enviada ainda</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {meusDepoimentos.map((depoimento: any) => (
                          <div key={depoimento.id} className="border rounded-lg p-3 bg-white">
                            <div className="flex justify-between items-start mb-2">
                              <p className="font-medium text-sm">Cuidador avaliado</p>
                              <div className="flex">
                                {[...Array(parseInt(depoimento.rating))].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">{depoimento.content}</p>
                            <div className="flex justify-between items-center">
                              <span className={`text-xs px-2 py-1 rounded ${depoimento.published
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {depoimento.published ? '✅ Publicado' : '⏳ Em análise'}
                              </span>
                              <span className="text-xs text-gray-400">
                                {formatDate(depoimento.created_at)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Estatísticas simples */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Search className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{buscaRealizada ? '1' : '0'}</p>
                      <p className="text-sm text-gray-600">Buscas Realizadas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <User className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">{cuidadoresEncontrados.length}</p>
                      <p className="text-sm text-gray-600">Cuidadores Encontrados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Heart className="w-8 h-8 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold">{favoritos.length}</p>
                      <p className="text-sm text-gray-600">Favoritos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>

      <EditCuidadorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        cuidador={cuidadorParaEditar}
        onUpdate={handleBuscarCuidadores}
      />
    </div>
  );
};

export default ClienteDashboard;
