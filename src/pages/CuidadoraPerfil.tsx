import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, GraduationCap, Clock, CheckCircle2, ChevronLeft, CalendarHeart, Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface CaregiverData {
  id: string;
  name: string;
  city: string | null;
  state: string | null;
  experience: string | null;
  education: string | null;
  availability: string | null;
  care_category: string | null;
  courses: string | null;
  sleep_at_client: boolean | null;
  has_children: boolean | null;
  smoker: boolean | null;
  status: string | null;
  user_id: string | null;
  avatar_url?: string | null;
}

export default function CuidadoraPerfil() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [caregiver, setCaregiver] = useState<CaregiverData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCaregiver() {
      if (!slug) return;
      try {
        setLoading(true);

        // MOCK PARA VISUALIZAÇÃO - Se o slug for "maria-silva-exemplo" ou falhar
        if (slug === 'maria-silva-exemplo') {
          setCaregiver({
            id: "mock-123",
            name: "Maria Silva",
            city: "Mogi das Cruzes",
            state: "SP",
            experience: "10 anos",
            education: "Técnica em Enfermagem",
            availability: "Segunda a Sexta (Diurno)",
            care_category: "Alta Complexidade",
            courses: "Primeiros Socorros, Alzheimer e Parkinson",
            sleep_at_client: false,
            has_children: true,
            smoker: false,
            status: "active",
            user_id: "user-123",
            avatar_url: "https://i.pravatar.cc/300?img=47"
          });
          setLoading(false);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from("caregivers")
          .select("*, profiles:user_id (avatar_url)")
          .eq("slug", slug)
          .eq("status", "active")
          .maybeSingle();

        if (fetchError || !data) {
          // Se falhar (ex: coluna slug não existe ainda), mostramos o erro normal
          console.error("Erro ao buscar cuidadora:", fetchError);
          setError(true);
        } else {
          const profilesData = Array.isArray(data.profiles) ? data.profiles[0] : data.profiles;
          
          setCaregiver({
            ...data,
            avatar_url: profilesData ? (profilesData as any).avatar_url : null,
          });
        }
      } catch (err) {
        console.error("Erro inesperado:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCaregiver();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
        <div className="flex gap-6 items-start">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="space-y-4 flex-1">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (error || !caregiver) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Cuidadora não encontrada</h1>
        <p className="text-gray-600 mb-8">O perfil que você está procurando não existe ou não está mais disponível.</p>
        <Button onClick={() => navigate("/encontrar-cuidador")}>
          Ver outras cuidadoras disponíveis
        </Button>
      </div>
    );
  }

  const title = `${caregiver.name} — Cuidadora de Idosos${caregiver.city ? ` em ${caregiver.city}` : ''} | CareConnect`;
  const description = `Conheça ${caregiver.name}, cuidadora profissional${caregiver.city ? ` de ${caregiver.city}` : ''}. Veja sua experiência, especialidades e disponibilidade. Solicite atendimento pelo CareConnect.`;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="profile" />
        {caregiver.avatar_url && <meta property="og:image" content={caregiver.avatar_url} />}
        <link rel="canonical" href={`https://careconnect.com.br/cuidadora/${slug}`} />
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
                {caregiver.avatar_url ? (
                  <img src={caregiver.avatar_url} alt={`Foto de ${caregiver.name}`} className="w-full h-full object-cover" />
                ) : (
                  <Heart className="w-16 h-16 text-primary/20" />
                )}
              </div>
              <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-sm" title="Disponível"></div>
            </div>

            {/* Info Resumo */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{caregiver.name}</h1>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600 mb-4">
                {caregiver.city && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    {caregiver.city}{caregiver.state ? ` - ${caregiver.state}` : ''}
                  </span>
                )}
                {caregiver.experience && (
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-primary" />
                    {caregiver.experience}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">Cuidadora de Idosos</Badge>
                {caregiver.care_category && <Badge variant="outline">{caregiver.care_category}</Badge>}
                {caregiver.courses && caregiver.courses.split(',').slice(0,2).map(c => <Badge key={c} variant="outline" className="truncate max-w-[150px]">{c.trim()}</Badge>)}
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
                <Link to={`/encontrar-cuidador?interessa=${slug}`}>Solicitar esta cuidadora</Link>
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
                  {caregiver.city ? ` Atendo na região de ${caregiver.city}.` : ""}
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
              
              <ul className="space-y-4">
                {caregiver.experience && (
                  <li className="flex gap-4">
                    <div className="mt-1 bg-primary/10 p-2 rounded-full h-fit"><Briefcase className="w-5 h-5 text-primary" /></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Tempo de Experiência</h4>
                      <p className="text-gray-600">{caregiver.experience}</p>
                    </div>
                  </li>
                )}
                
                {caregiver.education && (
                  <li className="flex gap-4">
                    <div className="mt-1 bg-primary/10 p-2 rounded-full h-fit"><GraduationCap className="w-5 h-5 text-primary" /></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Formação / Escolaridade</h4>
                      <p className="text-gray-600">{caregiver.education}</p>
                    </div>
                  </li>
                )}
                
                {caregiver.courses && (
                  <li className="flex gap-4">
                    <div className="mt-1 bg-primary/10 p-2 rounded-full h-fit"><CalendarHeart className="w-5 h-5 text-primary" /></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Cursos e Especializações</h4>
                      <p className="text-gray-600">{caregiver.courses}</p>
                    </div>
                  </li>
                )}
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
                  <span className="font-medium text-right max-w-[120px] truncate" title={caregiver.availability || "A combinar"}>{caregiver.availability || "A combinar"}</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500">Dorme no local?</span>
                  <span className="font-medium">{caregiver.sleep_at_client ? "Sim" : "Não"}</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500">Fumante?</span>
                  <span className="font-medium">{caregiver.smoker ? "Sim" : "Não"}</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500">Possui filhos?</span>
                  <span className="font-medium">{caregiver.has_children ? "Sim" : "Não"}</span>
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
