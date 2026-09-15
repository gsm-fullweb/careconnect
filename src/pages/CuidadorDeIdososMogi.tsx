import React from "react";
import CityLandingPage from "@/components/seo-local/CityLandingPage";
import { Users, BedDouble, Activity, CalendarCheck, Heart } from "lucide-react";

const CuidadorDeIdososMogi = () => {
  const faqData = [
    {
      question: "Como encontrar um cuidador de idosos em Mogi das Cruzes?",
      answer: "Você não precisa baixar aplicativos nem criar longos cadastros. Basta chamar a nossa assistente virtual Mila pelo WhatsApp (11) 4863-3976. Ela vai entender a necessidade do seu familiar e localizar rapidamente profissionais qualificados que atuam na região."
    },
    {
      question: "Quanto custa um cuidador de idosos em Mogi das Cruzes?",
      answer: "Os valores dependem muito da complexidade, se é um cuidado básico para companhia ou se há necessidades mais intensas como banho no leito e cuidados pós-hospitalares. O ideal é conversar com a Mila para detalhar sua necessidade e encontrar cuidadores compatíveis com o seu orçamento."
    },
    {
      question: "Posso encontrar cuidador para período noturno?",
      answer: "Sim! Pela CareConnect você encontra cuidadores disponíveis para diárias completas, apenas para o período noturno (12h) ou horários flexíveis para auxiliar em momentos de maior sobrecarga para a família."
    },
    {
      question: "A CareConnect contrata o cuidador?",
      answer: "A CareConnect atua como uma plataforma de tecnologia que conecta as famílias aos profissionais. Nós não somos os empregadores dos cuidadores. Facilitamos o encontro seguro, a seleção baseada no perfil e a organização, mas o vínculo ocorre diretamente entre a família e o profissional."
    },
    {
      question: "Como funciona a busca pela Mila?",
      answer: "É simples e rápido. Você envia uma mensagem no WhatsApp. A Mila faz algumas perguntas breves (cidade, nível de dependência do idoso, horários). Com base nisso, o sistema cruza dados com os cuidadores cadastrados próximos e apresenta os perfis mais compatíveis."
    },
    {
      question: "Posso conversar com o cuidador antes de contratar?",
      answer: "Com certeza! É fundamental que você tenha confiança no profissional. Após o nosso sistema sugerir cuidadores compatíveis, você pode agendar uma conversa prévia para alinhar as expectativas e garantir que o profissional é o certo para a sua família."
    },
    {
      question: "O atendimento da CareConnect para encontrar cuidador é gratuito?",
      answer: "Sim! Conversar com a Mila, receber sugestões de perfis compatíveis e utilizar a plataforma para buscar o profissional ideal é gratuito para a família."
    }
  ];

  const needsCards = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Companhia e Supervisão",
      description: "Para idosos que ficam sozinhos durante o dia e precisam de atenção, prevenção de quedas e alguém para conversar."
    },
    {
      icon: <BedDouble className="w-6 h-6" />,
      title: "Cuidador Noturno",
      description: "Para garantir um sono tranquilo e seguro para o idoso, permitindo que a família também possa descansar."
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Apoio Pós-hospitalar",
      description: "Ajuda temporária essencial na recuperação após uma cirurgia ou internação, acompanhando medicamentos e higiene."
    },
    {
      icon: <CalendarCheck className="w-6 h-6" />,
      title: "Apoio na Rotina e Consultas",
      description: "Auxílio para familiares que precisam dividir a rotina de cuidados, acompanhando o idoso em consultas e exames médicos."
    }
  ];

  const localContextBody = (
    <>
      Nossa plataforma tem como objetivo aproximar famílias de cuidadores profissionais cadastrados que já atuam em <strong>Mogi das Cruzes e região</strong>. 
      <br /><br />
      Sabemos que a proximidade é importante para evitar grandes deslocamentos, garantir pontualidade e tornar o relacionamento mais próximo. A busca da Mila prioriza profissionais compatíveis que estejam disponíveis geograficamente próximos à sua necessidade.
    </>
  );

  return (
    <CityLandingPage
      // Meta & SEO
      seoTitle="Cuidador de Idosos em Mogi das Cruzes | Atendimento Rápido"
      seoDescription="Precisa de cuidador de idosos em Mogi das Cruzes? Fale com a Mila pelo WhatsApp e encontre o profissional ideal para sua família de forma simples e humana."
      canonicalUrl="/cuidador-de-idosos/mogi-das-cruzes"
      
      // Hero
      heroTopBadge="Atendimento em Mogi das Cruzes e Região"
      heroTitle={
        <>Encontre o Cuidador Ideal em <span className="text-purple-600">Mogi das Cruzes</span></>
      }
      heroSubtitle="Encontre profissionais próximos para ajudar no cuidado de quem você ama, de forma simples e humanizada. Sem formulários difíceis: tudo pelo WhatsApp."
      heroImageSrc="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1000&auto=format&fit=crop"
      heroImageAlt="Cuidadora conversando e sorrindo com um senhor idoso"
      heroFloatingBadge={{
        icon: <Heart className="w-6 h-6" />,
        title: "Apoio Humanizado",
        description: "Mais cuidado, menos sobrecarga"
      }}

      // Necessidades (Dores Locais)
      needsSectionTitle="Nós entendemos a sua necessidade atual"
      needsSectionSubtitle="Muitas famílias ficam sobrecargadas tentando conciliar rotina, trabalho e o cuidado com os pais ou avós. Não é fácil fazer tudo sozinho."
      needsCards={needsCards}

      // Contexto Local
      localContextTitle="Apoio para famílias em Mogi"
      localContextBody={localContextBody}

      // FAQs
      faqData={faqData}
    />
  );
};

export default CuidadorDeIdososMogi;
