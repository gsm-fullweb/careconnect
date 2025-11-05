import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-[#6b26d9] shadow-sm sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center h-20 px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-3">
            {/* Logo CareConnect */}
            <img 
              src="https://dyxkbbojlyppizsgjjxx.supabase.co/storage/v1/object/public/images//logo-careconnect.png" 
              alt="CareConnect Logo" 
             className="w-32 h-10 md:w-40 md:h-12 object-contain"
              onError={(e) => {
                console.log('Erro ao carregar logo:', e);
                e.currentTarget.style.display = 'none';
              }}
            />
           
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-6 xl:space-x-8">
          <Link to="/" className="text-white hover:text-gray-200 font-medium transition-colors">
            Início
          </Link>
          <Link to="/about" className="text-white hover:text-gray-200 font-medium transition-colors">
            Sobre Nós
          </Link>
          <Link to="/services" className="text-white hover:text-gray-200 font-medium transition-colors">
            Serviços
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-200 font-medium transition-colors">
            Contato
          </Link>
          <a href="https://blog.careconnect.com.br/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 font-medium transition-colors">
            Blog
          </a>
        
        </nav>

        <div className="hidden lg:flex items-center space-x-3">
          
          <Button asChild size="sm" className="bg-white text-[#6B46C1] hover:bg-gray-100 border border-[#6B46C1]">
            <Link to="/plans">Encontre um Cuidador</Link>
          </Button>
          <Button asChild size="sm" className="bg-[#6B46C1] hover:bg-[#5A3A9F] text-white border border-white">
            <Link to="/pre-cadastro">Cadastrar como Cuidador</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-white hover:bg-[#5A3A9F]">
            <Link to="/admin/login">Login</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#6B46C1] border-t border-gray-700">
          <div className="container-custom py-4 flex flex-col space-y-4 px-4">
            <Link 
              to="/" 
              className="text-white hover:text-gray-200 font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-gray-200 font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link 
              to="/services" 
              className="text-white hover:text-gray-200 font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Serviços
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-gray-200 font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contato
            </Link>
            <Link 
              to="/blog" 
              className="text-white hover:text-gray-200 font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <div className="pt-4 border-t border-gray-600 space-y-3">
              <Button asChild variant="ghost" className="text-white hover:bg-[#5A3A9F] w-full justify-start">
                <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button asChild className="bg-white text-[#6B46C1] hover:bg-gray-100 border border-[#6B46C1] w-full">
                <Link to="/plans" onClick={() => setMobileMenuOpen(false)}>
                  Assinatura
                </Link>
              </Button>
              <Button asChild className="bg-[#6B46C1] hover:bg-[#5A3A9F] text-white border border-white w-full">
                <Link to="/pre-cadastro" onClick={() => setMobileMenuOpen(false)}>
                  Cadastrar como Cuidador
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
<Link to="/" className="flex items-center">
  <img 
    src="https://dyxkbbojlyppizsgjjxx.supabase.co/storage/v1/object/public/images//logo-careconnect.png" 
    alt="CareConnect Logo" 
    className="w-8 h-8 md:w-10 md:h-10 object-contain"
  />
</Link>
