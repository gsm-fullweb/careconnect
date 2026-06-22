
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import ChatbotWidget from "./components/ChatbotWidget";

// Public Pages (lazy — code-splitting por rota)
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Planos = lazy(() => import("./pages/Planos"));
const PreCadastro = lazy(() => import("./pages/PreCadastro"));
const CadastrarCuidador = lazy(() => import("./pages/CadastrarCuidador"));
const Obrigado = lazy(() => import("./pages/Obrigado"));
const LoginPage = lazy(() => import("./pages/Login"));
const ClientDashboard = lazy(() => import("./pages/ClientDashboard"));
const CaregiverDashboard = lazy(() => import("./pages/CaregiverDashboard"));
const EncontrarCuidador = lazy(() => import("./pages/EncontrarCuidador"));
const CuidadorIdososMogiDasCruzes = lazy(() => import("./pages/CuidadorIdososMogiDasCruzes"));

// Admin Pages (lazy)
const Login = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const UsersManagement = lazy(() => import("./pages/admin/UsersManagement"));
const CustomerManagement = lazy(() => import("./pages/admin/CustomerManagement"));
const BlogManagement = lazy(() => import("./pages/admin/BlogManagement"));
const BlogPostEditor = lazy(() => import("./pages/admin/BlogPostEditor"));
const TestimonialsManagement = lazy(() => import("./pages/admin/TestimonialsManagement"));
const PartnersManagement = lazy(() => import("./pages/admin/PartnersManagement"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <Loader2 className="animate-spin text-careconnect-blue h-10 w-10" />
  </div>
);

// ✅ Function: App
// 📌 Description: Main application component that sets up routing and providers
// 📥 Parameters: none
// 📤 Returns: JSX.Element — the main app component with routes
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/plans" element={<Planos />} />
            <Route path="/pre-cadastro" element={<PreCadastro />} />
            <Route path="/cadastrar-cuidador" element={<CadastrarCuidador />} />
            <Route path="/obrigado" element={<Obrigado />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/painel-cuidador" element={<CaregiverDashboard />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/encontrar-cuidador" element={<EncontrarCuidador />} />
            <Route path="/cuidador-idosos-mogi-das-cruzes" element={<CuidadorIdososMogiDasCruzes />} />

            {/* Admin Routes */}
            <Route caseSensitive path="/Admin" element={<Navigate to="/admin" replace />} />
            <Route caseSensitive path="/Admin/login" element={<Navigate to="/admin/login" replace />} />
            <Route caseSensitive path="/Admin/*" element={<Navigate to="/admin" replace />} />
            <Route path="/admin/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route path="" element={<Dashboard />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="customers" element={<CustomerManagement />} />
              <Route path="blog" element={<BlogManagement />} />
              <Route path="blog/edit/:id" element={<BlogPostEditor />} />
              <Route path="testimonials" element={<TestimonialsManagement />} />
              <Route path="partners" element={<PartnersManagement />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          <ChatbotWidget />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
