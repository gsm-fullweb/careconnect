import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Clock, CheckCircle2, ChevronLeft, CalendarHeart, Heart } from "lucide-react";

export default function DulceRafaela() {
  const navigate = useNavigate();

  const caregiver = {
    name: "Dulce Rafaela Nascimento Reis",
    city: "Mogi Das Cruzes",
    state: "SP",
    experience: "1 a 2 anos",
    availability: "Todos os dias, disponibilidade total de horário.",
    care_category: "Cuidador(a) de Idosos",
    courses: "Cuidadora de idosos, cursos socorrista APH",
    slug: "dulce-rafaela",
    experience_description: "Experiência com idosos acamados, trocas de fraldas, medicação e experiência com idosos em estados paliativos."
  };

  const title = `${caregiver.name} — Cuidadora de Idosos em ${caregiver.city} | CareConnect`;
  const description = `Conheça ${caregiver.name}, cuidadora profissional de ${caregiver.city}. Veja sua experiência, especialidades e disponibilidade. Solicite atendimento pelo CareConnect.`;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="profile" />
        <link rel="canonical" href={`https://careconnect.com.br/cuidadora/${caregiver.slug}`} />
      </Helmet>

      {/* Header Profile */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Button variant="ghost" className="mb-6 -ml-4 text-gray-500" onClick={() => navigate(-1)}>
            <ChevronLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar */}
            <div className="shrink-0 relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center">
                <Heart className="w-16 h-16 text-primary/20" />
              </div>
              <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-sm" title="Disponível"></div>
            </div>

            {/* Info Resumo */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{caregiver.name}</h1>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600 mb-4">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  {caregiver.city} - {caregiver.state}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-primary" />
                  {caregiver.experience}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">Cuidadora de Idosos</Badge>
              </div>
            </div>

            {/* CTA Box CTA */}
            <div className="shrink-0 w-full md:w-auto bg-white p-6 rounded-2xl shadow-sm border md:min-w-[280px]">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Status</p>
                <p className="text-lg font-semibold text-green-600 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Disponível para cuidar
                </p>
              </div>
              
              <Button size="lg" className="w-full text-base font-semibold shadow-md" asChild>
                <Link to={`/encontrar-cuidador?interessa=${caregiver.slug}`}>Solicitar esta cuidadora</Link>
              </Button>
              <p className="text-xs text-center text-gray-400 mt-3">Agendamento rápido e seguro</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Detalhado */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-2xl shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary" /> Apresentação Profissional
              </h2>
              <div className="prose text-gray-600">
                <p>
                  Olá! Meu nome é {caregiver.name}, sou cuidadora dedicada e possuo experiência em cuidar de idosos e pessoas necessitando de assistência.
                  Atendo na região de {caregiver.city}.
                </p>
                <p className="mt-4">
                  Comprometo-me a fornecer um ambiente seguro, respeitoso e acolhedor. Minha prioridade é garantir o bem-estar físico e emocional da pessoa assistida, respeitando suas rotinas e preferências.
                </p>
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" /> Experiência e Qualificações
              </h2>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full h-fit"><Briefcase className="w-5 h-5 text-primary" /></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tempo de Experiência</h4>
                    <p className="text-gray-600">{caregiver.experience}</p>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      {caregiver.experience_description}
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full h-fit"><CalendarHeart className="w-5 h-5 text-primary" /></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Cursos e Especializações</h4>
                    <p className="text-gray-600 leading-relaxed">{caregiver.courses}</p>
                  </div>
                </li>
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-3">Informações Adicionais</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Disponibilidade</span>
                  <span className="font-medium text-right max-w-[120px]" title={caregiver.availability}>{caregiver.availability}</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-primary/5 border border-primary/10 p-6 rounded-2xl">
              <h3 className="font-semibold text-primary mb-2">Por que contratar via CareConnect?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Perfil verificado</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Suporte humanizado</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Substituição rápida</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
