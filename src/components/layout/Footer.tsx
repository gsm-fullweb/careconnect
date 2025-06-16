
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-careconnect-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <img 
                src="https://dyxkbbojlyppizsgjjxx.supabase.co/storage/v1/object/public/images//logo-careconnect.png" 
                alt="CareConnect Logo" 
                className="w-32 h-10 md:w-40 md:h-12 object-contain"
              />
            </Link>
            <p className="mt-4 text-gray-300">
            1ª Plataforma no Brasil Pioneira em matching inteligente de cuidadores
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
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
                <a href="http://blog.careconnect.com.br/" className="text-gray-300 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Home Care
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Specialized Care
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Respite Care
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  24/7 Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contatos</h4>
            <address className="not-italic">
              <p className="mb-2">Mogi das Cruzes - SP</p>
              <p className="mb-2">contato@careconnect.com.br</p>
              <p className="mb-2">
                <a href="tel:+11234567890" className="text-gray-300 hover:text-white">
                  ((11) 4863-3976
                </a>
              </p>
              <p>
                <a href="mailto:info@careconnect.com" className="text-gray-300 hover:text-white">
                contato@careconnect.com.br
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} CareConnect. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
