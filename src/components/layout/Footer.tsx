
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-careconnect-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <img 
                src="/images/logo-careconnect.png" 
                alt="CareConnect - Cuidadores de Idosos em Mogi das Cruzes" 
                loading="lazy"
                className="w-32 h-10 md:w-40 md:h-12 object-contain"
                width="160"
                height="48"
              />
            </Link>
            <p className="mt-4 text-gray-300">
            1ª Plataforma no Brasil Pioneira em matching inteligente de cuidadores de idosos em Mogi das Cruzes e região do Alto Tietê.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Cuidador Domiciliar
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Cuidados Especializados
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Cuidados Paliativos
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Suporte 24h
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Acompanhante Hospitalar
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contatos</h4>
            <address className="not-italic">
              <p className="mb-2">Mogi das Cruzes - SP</p>
              <p className="mb-2">
                <a href="mailto:contato@careconnect.com.br" className="text-gray-300 hover:text-white">
                  contato@careconnect.com.br
                </a>
              </p>
              <p className="mb-2">
                <a href="tel:+551148633976" className="text-gray-300 hover:text-white">
                  (11) 4863-3976
                </a>
              </p>
              <p>
                <a 
                  href="https://wa.me/551148633976" 
                  className="text-gray-300 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: (11) 4863-3976
                </a>
              </p>
            </address>

            <div className="mt-4">
              <h5 className="text-sm font-semibold mb-2">Áreas Atendidas</h5>
              <p className="text-sm text-gray-400">
                Mogi das Cruzes, Suzano, Arujá, Guararema, Biritiba Mirim, Poá, Ferraz de Vasconcelos e região.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} CareConnect - Cuidadores de Idosos em Mogi das Cruzes. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/contact" className="text-gray-400 hover:text-white">
              Política de Privacidade
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-white">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
