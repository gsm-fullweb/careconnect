import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Menu, X, Home, Users, FileText, MessageSquare, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ErrorBoundary } from "../ErrorBoundary";

const navItems = [
  { to: "/admin", label: "Painel", icon: Home },
  { to: "/admin/users", label: "Cuidadores", icon: Users },
  { to: "/admin/customers", label: "Clientes", icon: Users },
  { to: "/admin/blog", label: "Posts do Blog", icon: FileText },
  { to: "/admin/testimonials", label: "Depoimentos", icon: MessageSquare },
  { to: "/admin/partners", label: "Parceiros", icon: Users },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();

  const isActiveRoute = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();

      toast({
        title: "Logout realizado com sucesso",
        description: "Voce foi desconectado do painel administrativo.",
      });

      navigate("/login", { replace: true });
    } catch {
      toast({
        title: "Falha no logout",
        description: "Houve um problema ao fazer logout. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="admin-shell min-h-screen bg-gray-100">
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md text-careconnect-dark"
          aria-label={sidebarOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-56 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="h-12 flex items-center justify-center border-b border-gray-200 px-3">
            <Link to="/admin" className="flex items-center">
              <span className="text-lg font-semibold text-careconnect-blue">
                Care<span className="text-careconnect-green">Connect</span>
              </span>
              <span className="ml-2 text-xs text-gray-500">Admin</span>
            </Link>
          </div>

          <nav className="flex-grow py-3 px-3 space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center py-2 px-3 rounded-md text-sm transition-colors ${
                  isActiveRoute(to)
                    ? "bg-careconnect-blue text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
              >
                <Icon size={16} className="mr-2" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm text-gray-800">Usuario Admin</p>
                <p className="text-xs text-gray-500 truncate">{user?.email || "admin@careconnect.com"}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full flex items-center justify-center"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </aside>

      <main
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? "lg:ml-56" : ""
        }`}
      >
        <div className="min-h-screen bg-gray-100 p-3 md:p-4">
          <ErrorBoundary fallback={<div>Erro ao carregar gestao. Tente recarregar a pagina.</div>}>
            <Outlet />
          </ErrorBoundary>
        </div>
      </main>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;
