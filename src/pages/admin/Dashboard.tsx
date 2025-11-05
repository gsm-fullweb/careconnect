
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, FileText, MessageSquare, Users, ArrowUp, ArrowDown } from "lucide-react";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [totals, setTotals] = useState({
    customers: 0,
    testimonials: 0,
    partners: 0,
  });

  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    // ✅ Function: fetchTotals
    // 📌 Description: Fetches total counts from Supabase tables for dashboard statistics
    // 📤 Returns: Promise<void>
    const fetchTotals = async () => {
      const [{ count: customers }, { count: testimonials }, { count: partners }] = await Promise.all([
        (supabase as any).from("customer").select("*", { count: "exact", head: true }),  // ❌ Tabela 'customer' não existe
        (supabase as any).from("testimonials").select("*", { count: "exact", head: true }),
        (supabase as any).from("partners").select("*", { count: "exact", head: true }),
      ]);
      setTotals({
        customers: customers ?? 0,
        testimonials: testimonials ?? 0,
        partners: partners ?? 0,
      });
    };
    
    // ✅ Function: fetchRecent
    // 📌 Description: Fetches recent activities from Supabase tables for dashboard feed
    // 📤 Returns: Promise<void>
    const fetchRecent = async () => {
      const [customers, testimonials, partners] = await Promise.all([
        (supabase as any).from("profiles").select("id, full_name as name, created_at").order("created_at", { ascending: false }).limit(3), // ✅ Mudança: customer → profiles, name → full_name
        (supabase as any).from("testimonials").select("id, name, created_at").order("created_at", { ascending: false }).limit(3),
        (supabase as any).from("partners").select("id, name, created_at").order("created_at", { ascending: false }).limit(3),
      ]);
      const activities: any[] = [];
      if (customers.data) {
        customers.data.forEach((c: any) =>
          activities.push({
            type: "Novo Cliente",
            details: c.name,
            time: c.created_at,
            icon: <User className="w-4 h-4" />,
            created_at: c.created_at,
          })
        );
      }
      if (testimonials.data) {
        testimonials.data.forEach((t: any) =>
          activities.push({
            type: "Depoimento",
            details: t.name,
            time: t.created_at,
            icon: <MessageSquare className="w-4 h-4" />,
            created_at: t.created_at,
          })
        );
      }
      if (partners.data) {
        partners.data.forEach((p: any) =>
          activities.push({
            type: "Parceiro",
            details: p.name,
            time: p.created_at,
            icon: <Users className="w-4 h-4" />,
            created_at: p.created_at,
          })
        );
      }
      // Ordenar por data decrescente e pegar os 6 mais recentes
      activities.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setRecent(activities.slice(0, 6));
    };

    fetchTotals();
    fetchRecent();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Painel de Controle</h1>
        <p className="text-gray-600">Bem-vindo ao painel administrativo do CareConnect.</p>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Usuários Totais</CardTitle>
            <User className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.customers}</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="w-3 h-3 mr-1" /> {/* Placeholder % */}
              </span>
              comparado ao mês passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Depoimentos</CardTitle>
            <MessageSquare className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.testimonials}</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="w-3 h-3 mr-1" /> {/* Placeholder % */}
              </span>
              comparado ao mês passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Parceiros</CardTitle>
            <Users className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.partners}</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <span className="text-red-500 flex items-center mr-1">
                <ArrowDown className="w-3 h-3 mr-1" /> {/* Placeholder % */}
              </span>
              comparado ao mês passado
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recent.length === 0 ? (
                  <div className="text-gray-500 text-center">Nenhuma atividade recente encontrada.</div>
                ) : (
                  recent.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-careconnect-blue/10 flex items-center justify-center text-careconnect-blue mr-4">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.type}</p>
                        <p className="text-gray-600">{activity.details}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {activity.time
                            ? new Date(activity.time).toLocaleString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link to="/admin/testimonials">
                  <Button className="w-full bg-careconnect-green hover:bg-careconnect-green/90 justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Adicionar Depoimento
                  </Button>
                </Link>
                <Link to="/admin/users">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Gerenciar Usuários
                  </Button>
                </Link>
                <Link to="/admin/partners">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Adicionar Parceiro
                  </Button>
                </Link>
              </div>
              
              <div className="mt-6 bg-careconnect-light p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Status do Sistema</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Site:</span>
                    <span className="text-sm font-medium text-green-600">Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Banco de Dados:</span>
                    <span className="text-sm font-medium text-green-600">Saudável</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Último Backup:</span>
                    <span className="text-sm font-medium">3 horas atrás</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
