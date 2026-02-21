import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { User, Edit, Save, X, FileText, ArrowRight, Home, GraduationCap, Briefcase, Users, CheckCircle, AlertCircle, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

const CadastrarCuidador = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [candidatoData, setCandidatoData] = useState<any>(null);
  const [editingSections, setEditingSections] = useState<{ [key: string]: boolean }>({});
  const [editFormData, setEditFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Function: fetchCandidatoData
  // 📌 Description: Fetches candidate data from Supabase based on user email
  // 📥 Parameters: none
  // 📤 Returns: void
  useEffect(() => {
    const fetchCandidatoData = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('candidatos_cuidadores_rows')
          .select('*')
          .eq('email', user.email)
          .single();

        if (error) {
          console.error('Erro ao buscar dados do candidato:', error);
          toast({
            title: "Erro",
            description: "Não foi possível carregar seus dados. Verifique se você está logado corretamente.",
            variant: "destructive"
          });
          return;
        }

        setCandidatoData(data);
        setEditFormData({ ...data });
      } catch (error) {
        console.error('Erro ao buscar candidato:', error);
        toast({
          title: "Erro",
          description: "Erro ao carregar dados. Tente novamente.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCandidatoData();
  }, [user]);

  // Redirect if not authenticated
  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  // Redirect if not a caregiver (no data found)
  if (!loading && !candidatoData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900">Acesso Negado</h2>
            <p className="text-gray-600 mb-4">
              Você não tem permissão para acessar esta página ou seus dados não foram encontrados.
            </p>
            <Button onClick={() => supabase.auth.signOut()}>
              Fazer Login Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ✅ Function: handleInputChange
  // 📌 Description: Handles form input changes for editing sections
  // 📥 Parameters: e (React.ChangeEvent)
  // 📤 Returns: void
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEditFormData((prev: any) => ({ ...prev, [name]: checked }));
      return;
    }

    setEditFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // ✅ Function: handleSectionEdit
  // 📌 Description: Toggles edit mode for a specific section
  // 📥 Parameters: section (string)
  // 📤 Returns: void
  const handleSectionEdit = (section: string) => {
    setEditingSections(prev => ({ ...prev, [section]: true }));
  };

  // ✅ Function: handleSectionSave
  // 📌 Description: Saves changes for a specific section
  // 📥 Parameters: section (string)
  // 📤 Returns: void
  const handleSectionSave = async (section: string) => {
    setSaving(true);

    try {
      const updateData = {
        ...editFormData, // Isso incluirá 'estado' se estiver em editFormData
        ultima_atualizacao: new Date().toISOString()
      };

      // Log para depuração (opcional, mas útil)
      console.log("Enviando para Supabase (updateData):", JSON.stringify(updateData, null, 2));

      const { error } = await supabase
        .from('candidatos_cuidadores_rows')
        .update(updateData)
        .eq('id', candidatoData.id);

      if (error) throw error;

      setCandidatoData({ ...candidatoData, ...updateData }); // Mescla para manter dados não editados
      setEditingSections(prev => ({ ...prev, [section]: false }));

      toast({
        title: "Dados atualizados",
        description: "Suas informações foram atualizadas com sucesso.",
      });

    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      // Verifique se o erro é específico sobre a coluna 'estado'
      // Se o erro for "Could not find the 'X' column", então X não existe na tabela.
      toast({
        title: "Erro",
        description: `Não foi possível atualizar seus dados. Detalhe: ${error.message || 'Erro desconhecido'}`,
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  // ✅ Function: handleSectionCancel
  // 📌 Description: Cancels editing for a specific section
  // 📥 Parameters: section (string)
  // 📤 Returns: void
  const handleSectionCancel = (section: string) => {
    setEditFormData({ ...candidatoData });
    setEditingSections(prev => ({ ...prev, [section]: false }));
  };

  // ✅ Function: handleCompleteRegistration
  // 📌 Description: Redirects to complete registration form
  // 📥 Parameters: none
  // 📤 Returns: void
  const handleCompleteRegistration = () => {
    localStorage.setItem('caregiver_data', JSON.stringify(candidatoData));
    navigate('/cadastrar-cuidador');
  };

  // ✅ Function: checkSectionCompletion
  // 📌 Description: Checks if a section has all required fields completed
  // 📥 Parameters: section (string)
  // 📤 Returns: boolean
  const checkSectionCompletion = (section: string): boolean => {
    switch (section) {
      case 'personal':
        return !!(candidatoData?.nome && candidatoData?.telefone && candidatoData?.data_nascimento);
      case 'address':
        return !!(candidatoData?.cep && candidatoData?.endereco && candidatoData?.cidade && candidatoData?.estado);
      case 'education':
        return !!(candidatoData?.escolaridade && candidatoData?.cargo);
      case 'experience':
        return !!(candidatoData?.possui_experiencia && candidatoData?.disponibilidade_horarios);
      case 'references':
        return !!(candidatoData?.referencia_1);
      default:
        return false;
    }
  };

  // Check if registration is incomplete
  const isRegistrationIncomplete = !candidatoData?.escolaridade ||
    !candidatoData?.disponibilidade_horarios ||
    !candidatoData?.cargo ||
    !candidatoData?.experiencia ||
    !candidatoData?.referencias;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-careconnect-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Painel do Cuidador</h1>
              <p className="text-gray-600">Bem-vindo, {candidatoData?.nome}</p>
            </div>
            <div className="flex gap-3">
              {/* Complete Registration Button */}
              {isRegistrationIncomplete && (
                <Button
                  onClick={handleCompleteRegistration}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Completar Cadastro
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => supabase.auth.signOut()}
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Status Alert */}
      {isRegistrationIncomplete && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <h3 className="text-yellow-800 font-medium">Cadastro Incompleto</h3>
                <p className="text-yellow-700 text-sm">
                  Seu cadastro ainda não está completo. Clique em "Completar Cadastro" para preencher
                  todas as informações necessárias e ativar seu perfil profissional.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Overview */}
      <div className="container mx-auto px-4 py-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Status do Perfil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { key: 'personal', label: 'Dados Pessoais', icon: User },
                { key: 'address', label: 'Endereço', icon: MapPin },
                { key: 'education', label: 'Formação', icon: GraduationCap },
                { key: 'experience', label: 'Experiência', icon: Briefcase },
                { key: 'references', label: 'Referências', icon: Users }
              ].map(({ key, label, icon: Icon }) => {
                const isComplete = checkSectionCompletion(key);
                return (
                  <div key={key} className={`flex items-center gap-2 p-2 rounded-lg ${isComplete ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{label}</span>
                    {isComplete ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Accordion Sections */}
      <div className="container mx-auto px-4 py-8">
        <Accordion type="multiple" className="space-y-4">

          {/* 📁 1. Dados Pessoais */}
          <AccordionItem value="personal" className="border rounded-lg">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-careconnect-blue" />
                  <div className="text-left">
                    <h3 className="font-semibold">Dados Pessoais</h3>
                    <p className="text-sm text-gray-600">Nome, email, telefone, nascimento</p>
                  </div>
                  {checkSectionCompletion('personal') && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0">
                  <div className="flex justify-end mb-4">
                    {!editingSections.personal ? (
                      <Button
                        onClick={() => handleSectionEdit('personal')}
                        size="sm"
                        className="bg-careconnect-blue hover:bg-careconnect-blue/90"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar Dados Pessoais
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleSectionSave('personal')}
                          disabled={saving}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {saving ? "Salvando..." : "Salvar"}
                        </Button>
                        <Button
                          onClick={() => handleSectionCancel('personal')}
                          variant="outline"
                          size="sm"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                      {editingSections.personal ? (
                        <Input
                          name="nome"
                          value={editFormData.nome || ''}
                          onChange={handleInputChange}
                          required
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.nome}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{candidatoData?.email}</p>
                      <p className="text-xs text-gray-500">Email não pode ser alterado</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                      {editingSections.personal ? (
                        <Input
                          name="telefone"
                          value={editFormData.telefone || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.telefone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                      {editingSections.personal ? (
                        <Input
                          name="data_nascimento"
                          type="date"
                          value={editFormData.data_nascimento || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.data_nascimento}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Possui Filhos</label>
                      {editingSections.personal ? (
                        <select
                          name="possui_filhos"
                          value={editFormData.possui_filhos || ''}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                          <option value="Sim">Sim</option>
                          <option value="Não">Não</option>
                        </select>
                      ) : (
                        <p className="text-gray-900">{candidatoData?.possui_filhos}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fumante</label>
                      {editingSections.personal ? (
                        <select
                          name="fumante"
                          value={editFormData.fumante || ''}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                          <option value="Sim">Sim</option>
                          <option value="Não">Não</option>
                        </select>
                      ) : (
                        <p className="text-gray-900">{candidatoData?.fumante}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* 🏠 2. Endereço */}
          <AccordionItem value="address" className="border rounded-lg">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-careconnect-blue" />
                  <div className="text-left">
                    <h3 className="font-semibold">Endereço</h3>
                    <p className="text-sm text-gray-600">CEP, endereço, estado, cidade</p>
                  </div>
                  {checkSectionCompletion('address') && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0">
                  <div className="flex justify-end mb-4">
                    {!editingSections.address ? (
                      <Button
                        onClick={() => handleSectionEdit('address')}
                        size="sm"
                        className="bg-careconnect-blue hover:bg-careconnect-blue/90"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar Endereço
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleSectionSave('address')}
                          disabled={saving}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {saving ? "Salvando..." : "Salvar"}
                        </Button>
                        <Button
                          onClick={() => handleSectionCancel('address')}
                          variant="outline"
                          size="sm"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                      {editingSections.address ? (
                        <Input
                          name="cep"
                          value={editFormData.cep || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.cep || 'Não informado'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                      {editingSections.address ? (
                        <Input
                          name="endereco"
                          value={editFormData.endereco || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.endereco || 'Não informado'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                      {editingSections.address ? (
                        <Input
                          name="estado"
                          value={editFormData.estado || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.estado || 'Não informado'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                      {editingSections.address ? (
                        <Input
                          name="cidade"
                          value={editFormData.cidade || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.cidade || 'Não informado'}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* 🎓 3. Formação e Certificações */}
          <AccordionItem value="education" className="border rounded-lg">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-careconnect-blue" />
                  <div className="text-left">
                    <h3 className="font-semibold">Formação e Certificações</h3>
                    <p className="text-sm text-gray-600">Escolaridade, cursos, categoria profissional</p>
                  </div>
                  {checkSectionCompletion('education') && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0">
                  <div className="flex justify-end mb-4">
                    {!editingSections.education ? (
                      <Button
                        onClick={() => handleSectionEdit('education')}
                        size="sm"
                        className="bg-careconnect-blue hover:bg-careconnect-blue/90"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar Formação
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleSectionSave('education')}
                          disabled={saving}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {saving ? "Salvando..." : "Salvar"}
                        </Button>
                        <Button
                          onClick={() => handleSectionCancel('education')}
                          variant="outline"
                          size="sm"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Escolaridade</label>
                      {editingSections.education ? (
                        <Input
                          name="escolaridade"
                          value={editFormData.escolaridade || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.escolaridade || 'Não informado'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cursos Realizados</label>
                      {editingSections.education ? (
                        <Textarea
                          name="cursos_realizados"
                          value={editFormData.cursos_realizados || ''}
                          onChange={handleInputChange}
                          rows={3}
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.cursos_realizados || 'Não informado'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Categoria Profissional</label>
                      {editingSections.education ? (
                        <Input
                          name="cargo"
                          value={editFormData.cargo || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.cargo || 'Não informado'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">COREN</label>
                      {editingSections.education ? (
                        <Input
                          name="coren"
                          value={editFormData.coren || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.coren || 'Não informado'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CREFITO</label>
                      {editingSections.education ? (
                        <Input
                          name="crefito"
                          value={editFormData.crefito || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.crefito || 'Não informado'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CRM</label>
                      {editingSections.education ? (
                        <Input
                          name="crm"
                          value={editFormData.crm || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.crm || 'Não informado'}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* 🧑‍⚕️ 4. Experiência Profissional */}
          <AccordionItem value="experience" className="border rounded-lg">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-careconnect-blue" />
                  <div className="text-left">
                    <h3 className="font-semibold">Experiência Profissional</h3>
                    <p className="text-sm text-gray-600">Experiência, disponibilidade, dormir no local</p>
                  </div>
                  {checkSectionCompletion('experience') && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0">
                  <div className="flex justify-end mb-4">
                    {!editingSections.experience ? (
                      <Button
                        onClick={() => handleSectionEdit('experience')}
                        size="sm"
                        className="bg-careconnect-blue hover:bg-careconnect-blue/90"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar Experiência
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleSectionSave('experience')}
                          disabled={saving}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {saving ? "Salvando..." : "Salvar"}
                        </Button>
                        <Button
                          onClick={() => handleSectionCancel('experience')}
                          variant="outline"
                          size="sm"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Possui Experiência</label>
                      {editingSections.experience ? (
                        <select
                          name="possui_experiencia"
                          value={editFormData.possui_experiencia || ''}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                          <option value="Sim">Sim</option>
                          <option value="Não">Não</option>
                        </select>
                      ) : (
                        <p className="text-gray-900">{candidatoData?.possui_experiencia}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Disponibilidade de Horários</label>
                      {editingSections.experience ? (
                        <Input
                          name="disponibilidade_horarios"
                          value={editFormData.disponibilidade_horarios || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.disponibilidade_horarios || 'Não informado'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Disponível para Dormir no Local</label>
                      {editingSections.experience ? (
                        <select
                          name="disponivel_dormir_local"
                          value={editFormData.disponivel_dormir_local || ''}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                          <option value="Sim">Sim</option>
                          <option value="Não">Não</option>
                        </select>
                      ) : (
                        <p className="text-gray-900">{candidatoData?.disponivel_dormir_local}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Descrição da Experiência</label>
                      {editingSections.experience ? (
                        <Textarea
                          name="descricao_experiencia"
                          value={editFormData.descricao_experiencia || ''}
                          onChange={handleInputChange}
                          rows={4}
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.descricao_experiencia || 'Não informado'}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* 📇 5. Referências */}
          <AccordionItem value="references" className="border rounded-lg">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-careconnect-blue" />
                  <div className="text-left">
                    <h3 className="font-semibold">Referências</h3>
                    <p className="text-sm text-gray-600">Referência 1, 2, 3</p>
                  </div>
                  {checkSectionCompletion('references') && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0">
                  <div className="flex justify-end mb-4">
                    {!editingSections.references ? (
                      <Button
                        onClick={() => handleSectionEdit('references')}
                        size="sm"
                        className="bg-careconnect-blue hover:bg-careconnect-blue/90"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar Referências
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleSectionSave('references')}
                          disabled={saving}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {saving ? "Salvando..." : "Salvar"}
                        </Button>
                        <Button
                          onClick={() => handleSectionCancel('references')}
                          variant="outline"
                          size="sm"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Referência 1</label>
                      {editingSections.references ? (
                        <Textarea
                          name="referencia_1"
                          value={editFormData.referencia_1 || ''}
                          onChange={handleInputChange}
                          rows={2}
                          placeholder="Nome, telefone e relação"
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.referencia_1 || 'Não informado'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Referência 2</label>
                      {editingSections.references ? (
                        <Textarea
                          name="referencia_2"
                          value={editFormData.referencia_2 || ''}
                          onChange={handleInputChange}
                          rows={2}
                          placeholder="Nome, telefone e relação"
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.referencia_2 || 'Não informado'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Referência 3</label>
                      {editingSections.references ? (
                        <Textarea
                          name="referencia_3"
                          value={editFormData.referencia_3 || ''}
                          onChange={handleInputChange}
                          rows={2}
                          placeholder="Nome, telefone e relação"
                        />
                      ) : (
                        <p className="text-gray-900">{candidatoData?.referencia_3 || 'Não informado'}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  );
};

// Alterar de:
// export default PainelCuidador;
// Para:
export default CadastrarCuidador;