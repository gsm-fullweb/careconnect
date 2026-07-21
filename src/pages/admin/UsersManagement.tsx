import { useState, useEffect } from "react";
import { CARGO_OPTIONS, formatCargoLabel, formatDate, getCanonicalCargoKey, normalizeCity } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search, Trash, UserPlus, Eye, Filter, Users, CheckCircle, XCircle, Clock, RefreshCw, Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CandidateDetailsModal } from "@/components/admin/CandidateDetailsModal";
import { EditCuidadorModal } from "@/components/admin/EditCuidadorModal";

type CandidatoCuidador = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  data_cadastro: string;
  status_candidatura: string;
  cargo: string | null;
  data_nascimento: string;
  fumante: string;
  possui_filhos: boolean;
  escolaridade: string;
  cursos: string | null;
  possui_experiencia: string;
  descricao_experiencia: string | null;
  disponibilidade_horarios: string | null;
  disponivel_dormir_local: string;
  referencias: string | null;
  referencia_1: string | null;
  referencia_2: string | null;
  referencia_3: string | null;
  perfil_profissional: string | null;
  ultima_atualizacao: string | null;
  cidade: string;
  endereco: string;
  cep: string;
  cpf: string | null;
  RG: string | null;
  estado: string | null;
  coren: string | null;
  crefito: string | null;
  crm: string | null;
  ativo?: string | null;
};

const STATUS_OPTIONS = ["Em análise", "Aprovado", "Rejeitado"];
const ATIVO_OPTIONS = ["Sim", "Não", "Pausado"];

const LIST_FIELDS = `
  id, nome, email, telefone, data_cadastro, status_candidatura, cargo,
  escolaridade, possui_experiencia, disponibilidade_horarios,
  cidade, cep, ativo
`;

const normalizeStatus = (status?: string | null) => {
  const normalized = (status || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  if (normalized === "aprovado") return "Aprovado";
  if (normalized === "rejeitado") return "Rejeitado";
  return "Em análise";
};

const normalizeAtivo = (ativo?: string | null) => {
  const normalized = (ativo || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  if (normalized === "false" || normalized === "nao" || normalized === "não") return "Não";
  if (normalized === "pausado") return "Pausado";
  return "Sim";
};

const UsersManagement = () => {
  const [users, setUsers] = useState<CandidatoCuidador[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<CandidatoCuidador | null>(null);
  const [selectedEditUser, setSelectedEditUser] = useState<CandidatoCuidador | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cargoFilter, setCargoFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('candidatos_cuidadores_rows')
        .select(LIST_FIELDS)
        .order('id', { ascending: false });
      
      if (error) {
        console.error('Erro ao buscar candidatos:', error);
        throw error;
      }
      setUsers((data || []) as CandidatoCuidador[]);
      setError(null);
    } catch (error) {
      console.error('Erro ao buscar candidatos:', error);
      setError('Falha ao carregar dados dos candidatos. Por favor, tente novamente.');
      toast({
        title: "Erro",
        description: "Não foi possível carregar os candidatos do banco de dados.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('candidatos_cuidadores_rows')
        .update({ 
          status_candidatura: newStatus,
          ultima_atualizacao: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (error) {
        throw error;
      }
      
      // Atualiza o estado local
      setUsers(currentUsers =>
        currentUsers.map(user =>
          user.id === userId ? { ...user, status_candidatura: newStatus } : user
        )
      );
      
      toast({
        title: "Status atualizado",
        description: `Status do candidato alterado para "${newStatus}" com sucesso.`,
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status do candidato. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleAtivoChange = async (userId: number, newAtivo: string) => {
    try {
      const { error } = await supabase
        .from('candidatos_cuidadores_rows')
        .update({ 
          ativo: newAtivo,
          ultima_atualizacao: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (error) {
        throw error;
      }
      
      // Atualiza o estado local
      setUsers(currentUsers =>
        currentUsers.map(user =>
          user.id === userId ? { ...user, ativo: newAtivo } : user
        )
      );
      
      toast({
        title: "Visibilidade atualizada",
        description: `Visibilidade do cuidador alterada para "${newAtivo}" com sucesso.`,
      });
    } catch (error) {
      console.error('Erro ao atualizar visibilidade:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a visibilidade do cuidador. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.nome?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.cidade?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCargo = cargoFilter === "all" || getCanonicalCargoKey(user.cargo) === cargoFilter;
    const matchesStatus = statusFilter === "all" || normalizeStatus(user.status_candidatura) === statusFilter;
    
    return matchesSearch && matchesCargo && matchesStatus;
  });

  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este candidato?")) {
      try {
        const { error } = await supabase
          .from('candidatos_cuidadores_rows')
          .delete()
          .eq('id', id);
        
        if (error) {
          throw error;
        }
        
        setUsers(users.filter(user => user.id !== id));
        
        toast({
          title: "Candidato excluído",
          description: "O candidato foi excluído com sucesso.",
        });
      } catch (error) {
        console.error('Erro ao excluir candidato:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir o candidato. Por favor, tente novamente.",
          variant: "destructive"
        });
      }
    }
  };

  const openCandidateDetails = async (userId: number, mode: "view" | "edit") => {
    const cachedUser = users.find((user) => user.id === userId) || null;

    if (mode === "view") {
      setSelectedUser(cachedUser);
      setIsDetailsModalOpen(true);
    } else {
      setSelectedEditUser(cachedUser);
      setIsEditModalOpen(true);
    }

    try {
      const { data, error } = await supabase
        .from("candidatos_cuidadores_rows")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      const fullUser = data as CandidatoCuidador;
      setUsers((currentUsers) =>
        currentUsers.map((user) => (user.id === userId ? { ...user, ...fullUser } : user))
      );

      if (mode === "view") {
        setSelectedUser(fullUser);
      } else {
        setSelectedEditUser(fullUser);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do candidato:", error);
      toast({
        title: "Erro",
        description: "NÃ£o foi possÃ­vel carregar os detalhes completos do candidato.",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (user: CandidatoCuidador) => {
    openCandidateDetails(user.id, "view");
  };

  const handleEditUser = (user: CandidatoCuidador) => {
    openCandidateDetails(user.id, "edit");
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEditUser(null);
  };

  const handleEditUpdate = () => {
    handleCloseEditModal();
    fetchUsers();
  };

  const [newCandidate, setNewCandidate] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    cep: "",
    cargo: "Cuidador(a) de Idosos",
    endereco: "",
    status_candidatura: "Em análise"
  });

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('candidatos_cuidadores_rows')
        .insert({
          nome: newCandidate.nome,
          email: newCandidate.email.toLowerCase().trim(),
          telefone: newCandidate.telefone,
          cidade: normalizeCity(newCandidate.cidade),
          status_candidatura: newCandidate.status_candidatura,
          cargo: newCandidate.cargo,
          data_nascimento: "1990-01-01",
          fumante: "Não",
          escolaridade: "Não informado",
          possui_experiencia: "Sim",
          disponivel_dormir_local: "Sim",
          endereco: newCandidate.endereco || "Não informado",
          cep: newCandidate.cep || "00000-000",
          possui_filhos: false,
          cursos: "Cadastrado pelo administrador",
          experiencia: "Cadastrado pelo administrador",
          perfil_profissional: "Perfil criado manualmente",
          descricao_experiencia: "Informações no telefone",
          disponibilidade_horarios: "A combinar",
          desconfortos_atividades: "Nenhum",
          referencias: "Em análise pelo administrador",
          Declaracao: "Aceito",
          ativo: "Sim"
        })
        .select()
        .single();

      if (error) throw error;

      setUsers(prev => [data, ...prev]);
      setIsAddUserModalOpen(false);
      setNewCandidate({
        nome: "",
        email: "",
        telefone: "",
        cidade: "",
        cep: "",
        cargo: "Cuidador(a) de Idosos",
        endereco: "",
        status_candidatura: "Em análise"
      });

      toast({
        title: "Candidato adicionado",
        description: "O novo candidato foi cadastrado com sucesso.",
      });
    } catch (error: any) {
      console.error('Erro ao adicionar candidato:', error);
      toast({
        title: "Erro ao adicionar",
        description: error.message || "Não foi possível adicionar o candidato.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = (updatedUser: CandidatoCuidador) => {
    setUsers(currentUsers =>
      currentUsers.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    setIsDetailsModalOpen(false);
    fetchUsers();
  };

  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedUser(null);
  };

  const cargoOptions = Array.from(
    new Set(users.map(user => getCanonicalCargoKey(user.cargo)).filter(Boolean))
  ).sort((a, b) => formatCargoLabel(a).localeCompare(formatCargoLabel(b), "pt-BR"));

  const statusOptions = Array.from(
    new Set(users.map(user => normalizeStatus(user.status_candidatura)))
  ).sort((a, b) => STATUS_OPTIONS.indexOf(a) - STATUS_OPTIONS.indexOf(b));

  const uniqueCidades = [...new Set(users.map(item => normalizeCity(item.cidade)).filter(Boolean))].sort();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aprovado":
        return <CheckCircle className="w-4 h-4" />;
      case "Rejeitado":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "default";
      case "Rejeitado":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const formatBooleanValue = (value: boolean | string | null): string => {
    if (value === true || value === "true" || value === "Sim") return "Sim";
    if (value === false || value === "false" || value === "Não") return "Não";
    return String(value || "Não informado");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-careconnect-blue" />
            <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Candidatos</h1>
          </div>
          <p className="text-sm text-gray-600">
            Gerencie contas de candidatos e visualize seus dados de forma organizada.
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <div className="bg-gray-100 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-gray-700">{users.length} candidatos total</span>
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-gray-700">{filteredUsers.length} filtrados</span>
            </div>
          </div>
        </div>
        <Button 
          size="sm"
          className="mt-4 lg:mt-0 bg-careconnect-blue hover:bg-careconnect-blue/90 text-white font-semibold"
          onClick={() => setIsAddUserModalOpen(true)}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Adicionar Candidato
        </Button>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader className="border-b bg-gray-50/50 p-4">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-careconnect-blue" />
              Lista de Candidatos
            </CardTitle>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Buscar por nome, email ou cidade..."
                  className="pl-9 h-9 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filtros
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchUsers}
                className="flex items-center gap-2"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
            </div>
          </div>
          
          {showFilters && (
            <div className="flex flex-wrap gap-3 pt-3 border-t">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Cargo</label>
                <select 
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-careconnect-blue min-w-40"
                  value={cargoFilter}
                  onChange={(e) => setCargoFilter(e.target.value)}
                >
                  <option value="all">Todos os Cargos</option>
                  {cargoOptions.map((cargo) => (
                    <option key={cargo} value={cargo}>{formatCargoLabel(cargo)}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select 
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-careconnect-blue min-w-40"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Todos os Status</option>
                  {statusOptions.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              {(cargoFilter !== "all" || statusFilter !== "all") && (
                <div className="flex items-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCargoFilter("all");
                      setStatusFilter("all");
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="p-0">
          {loading && (
            <div className="flex flex-col justify-center items-center py-10">
              <div className="w-10 h-10 border-4 border-careconnect-blue border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-sm text-gray-500">Carregando candidatos...</p>
            </div>
          )}
          
          {!loading && error && (
            <div className="bg-red-50 border border-red-200 p-4 m-4 rounded-lg text-center">
              <div className="text-red-600 mb-3">
                <XCircle className="w-10 h-10 mx-auto mb-2" />
                <h3 className="font-semibold text-lg">Erro ao carregar dados</h3>
                <p className="text-sm">{error}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={fetchUsers}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Tentar novamente
              </Button>
            </div>
          )}
          
          {!loading && !error && (
            <div className="overflow-x-auto">
              <Table className="admin-table text-xs [&_th]:h-9 [&_th]:px-2 [&_td]:px-2 [&_td]:py-2">
                <TableHeader>
                  <TableRow className="bg-gray-50/50">
                    <TableHead className="font-semibold">Candidato</TableHead>
                    <TableHead className="font-semibold">Contato</TableHead>
                    <TableHead className="font-semibold">Localização</TableHead>
                    <TableHead className="font-semibold">Qualificação</TableHead>
                    <TableHead className="font-semibold">Disponibilidade</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Visibilidade</TableHead>
                    <TableHead className="font-semibold">Cadastro</TableHead>
                    <TableHead className="font-semibold text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Users className="w-12 h-12 mb-2 opacity-50" />
                          <p className="font-medium">Nenhum candidato encontrado</p>
                          <p className="text-sm">Tente ajustar os filtros de busca</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50/50 transition-colors">
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900">{user.nome}</p>
                            {user.cargo && (
                              <Badge variant="outline" className="text-xs">
                                {formatCargoLabel(user.cargo)}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-xs">
                            <p className="text-gray-900">{user.email}</p>
                            <p className="text-gray-500">{user.telefone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-xs">
                            <p className="text-gray-900">{user.cidade}</p>
                            <p className="text-gray-500">{user.cep}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-xs">
                            <p className="text-gray-900">{user.escolaridade}</p>
                            <p className="text-gray-500">
                              {user.possui_experiencia === "Sim" ? "Com experiência" : "Sem experiência"}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs text-gray-700 max-w-[160px] truncate" title={user.disponibilidade_horarios || 'Não informado'}>
                            {user.disponibilidade_horarios || 'Não informado'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={normalizeStatus(user.status_candidatura)}
                            onValueChange={(newStatus) => handleStatusChange(user.id, newStatus)}
                          >
                            <SelectTrigger className="h-8 w-28 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {STATUS_OPTIONS.map((status) => (
                                <SelectItem key={status} value={status}>
                                  <div className="flex items-center gap-2">
                                    {getStatusIcon(status)}
                                    {status}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={normalizeAtivo(user.ativo)}
                            onValueChange={(newAtivo) => handleAtivoChange(user.id, newAtivo)}
                          >
                            <SelectTrigger className="h-8 w-28 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                              {ATIVO_OPTIONS.map((ativo) => (
                                <SelectItem key={ativo} value={ativo}>
                                  <span className={`font-semibold flex items-center gap-2 ${
                                    ativo === "Sim" ? "text-green-600" : ativo === "Não" ? "text-red-600" : "text-yellow-600"
                                  }`}>
                                    ● {ativo}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-xs text-gray-500">
                          {formatDate(user.data_cadastro)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewDetails(user)}
                              className="h-7 w-7 p-0 hover:bg-blue-50 hover:text-blue-600"
                              title="Visualizar detalhes"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditUser(user)}
                              className="h-7 w-7 p-0 border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700"
                              title="Editar candidato"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteUser(user.id)}
                              className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600"
                              title="Excluir candidato"
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          
          {!loading && !error && filteredUsers.length > 0 && (
            <div className="flex justify-between items-center p-3 border-t bg-gray-50/30">
              <div className="text-xs text-gray-600">
                Mostrando <span className="font-medium">{filteredUsers.length}</span> de{" "}
                <span className="font-medium">{users.length}</span> candidatos
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Paginação em desenvolvimento</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {selectedUser && (
        <CandidateDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseModal}
          candidate={selectedUser}
          onUpdate={handleUpdateUser}
          onEdit={handleEditUser}
        />
      )}

      {selectedEditUser && (
        <EditCuidadorModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          cuidador={selectedEditUser}
          onUpdate={handleEditUpdate}
        />
      )}
      
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsAddUserModalOpen(false)}></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-3">Adicionar Novo Candidato</h3>
              <form onSubmit={handleAddCandidate}>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo
                    </label>
                    <Input 
                      required 
                      value={newCandidate.nome}
                      onChange={(e) => setNewCandidate({...newCandidate, nome: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input 
                      type="email" 
                      required 
                      value={newCandidate.email}
                      onChange={(e) => setNewCandidate({...newCandidate, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <Input 
                      type="tel" 
                      required 
                      value={newCandidate.telefone}
                      onChange={(e) => setNewCandidate({...newCandidate, telefone: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CEP
                      </label>
                      <Input 
                        required 
                        placeholder="00000-000"
                        value={newCandidate.cep}
                        onChange={(e) => {
                          const val = e.target.value
                            .replace(/\D/g, "")
                            .replace(/(\d{5})(\d)/, "$1-$2")
                            .substring(0, 9);
                          setNewCandidate({...newCandidate, cep: val});
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cidade
                      </label>
                      <Input 
                        required 
                        value={newCandidate.cidade}
                        onChange={(e) => setNewCandidate({...newCandidate, cidade: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cargo
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-careconnect-blue"
                      value={newCandidate.cargo}
                      onChange={(e) => setNewCandidate({...newCandidate, cargo: e.target.value})}
                    >
                      {CARGO_OPTIONS.map((cargo) => (
                        <option key={cargo.key} value={cargo.label}>{cargo.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Endereço (Opcional)
                    </label>
                    <Input 
                      value={newCandidate.endereco}
                      onChange={(e) => setNewCandidate({...newCandidate, endereco: e.target.value})}
                      placeholder="Ex: Rua das Flores, 123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status da Candidatura
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-careconnect-blue"
                      value={newCandidate.status_candidatura}
                      onChange={(e) => setNewCandidate({...newCandidate, status_candidatura: e.target.value})}
                    >
                      <option value="Em análise">Em análise</option>
                      <option value="Aprovado">Aprovado</option>
                      <option value="Rejeitado">Rejeitado</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddUserModalOpen(false)}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-careconnect-blue hover:bg-careconnect-blue/90"
                    disabled={loading}
                  >
                    {loading ? "Adicionando..." : "Adicionar Candidato"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
