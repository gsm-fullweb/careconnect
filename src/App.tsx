
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Planos from "./pages/Planos";
import PreCadastro from "./pages/PreCadastro";
import CadastrarCuidador from "./pages/CadastrarCuidador";
import Obrigado from "./pages/Obrigado";
import ClientDashboard from "./pages/ClientDashboard";
import CaregiverDashboard from "./pages/CaregiverDashboard";

// Admin Pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./components/admin/AdminLayout";
import UsersManagement from "./pages/admin/UsersManagement";
import CustomerManagement from "./pages/admin/CustomerManagement";
import BlogManagement from "./pages/admin/BlogManagement";
import BlogPostEditor from "./pages/admin/BlogPostEditor";
import TestimonialsManagement from "./pages/admin/TestimonialsManagement";
import PartnersManagement from "./pages/admin/PartnersManagement";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

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
            <Route path="/painel-cuidador" element={<CaregiverDashboard />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/caregiver-dashboard" element={<CaregiverDashboard />} />
            
            {/* Admin Routes */}
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
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
