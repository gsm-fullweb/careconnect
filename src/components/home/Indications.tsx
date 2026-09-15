const indications = [
  {
    name: "Google Smart Display Program",
    website_url: "https://www.sunsetwood.org/google-smart-display-program?utm_source=chatgpt.com",
    description: "Programa que fornece displays inteligentes do Google para idosos.",
    type: "Tecnologia e Inclusão Digital",
  },
  {
    name: "Foundation for Health in Aging",
    website_url: "https://foundationhoc.org/",
    description: "Organização focada na saúde e bem-estar dos idosos.",
    type: "Saúde e Bem-Estar",
  },
  {
    name: "Portal Gov.br - Direitos e Serviços",
    website_url: "https://www.gov.br/pt-br/direitos-e-servicos",
    description: "Programas e benefícios sociais para idosos, como BPC e isenções de impostos.",
    type: "Direitos e Benefícios",
  },
  {
    name: "Portal da Longevidade",
    website_url: "https://www.longevidade.com.br/",
    description: "Informações sobre qualidade de vida e envelhecimento saudável.",
    type: "Saúde e Bem-Estar",
  },
  {
    name: "Saúde da Pessoa Idosa (Ministério da Saúde / Fiocruz)",
    website_url: "https://www.fiocruzbrasilia.fiocruz.br/saude-da-pessoa-idosa/",
    description: "Diretrizes e informações sobre cuidados específicos de saúde para idosos.",
    type: "Saúde e Bem-Estar",
  },
  {
    name: "Goldies",
    website_url: "https://goldies.com.br/",
    description: "Focado em auxiliar na saúde de idosos, com recursos e produtos.",
    type: "Saúde e Bem-Estar",
  },
];

const Indications = () => {
  return (
    <section className="section bg-white border-t border-gray-200">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-careconnect-dark mb-2">
            Indicações e Sites Úteis
          </h2>
          <p className="text-gray-600">
            Uma seleção de recursos e sites para promover a saúde, bem-estar e direitos dos idosos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {indications.map((indication) => (
            <div 
              key={indication.name} 
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="text-left flex-grow">
                <h3 className="font-semibold text-lg text-careconnect-dark mb-2">
                  {indication.name}
                </h3>
                
                <p className="text-sm text-gray-500 mb-3">
                  {indication.type}
                </p>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {indication.description}
                </p>
              </div>
              
              {indication.website_url && (
                <a 
                  href={indication.website_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-careconnect-blue hover:text-careconnect-blue/80 transition-colors mt-auto pt-4"
                >
                  Visitar site
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Indications;
