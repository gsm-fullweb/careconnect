/**
 * API Route: /api/lp-render
 * 
 * Server-Side Render (SSR) apenas do <head> para bots sociais.
 * Usado para garantir que WhatsApp, Facebook, LinkedIn e Twitter 
 * mostrem o preview correto ao compartilhar links das Landing Pages.
 * 
 * NOTA: Googlebot/Bingbot NÃO são roteados para cá, pois eles executam JS
 * e precisam do conteúdo completo do React para indexação.
 */

const SITE_URL = "https://www.careconnect.com.br";

// Dicionário das LPs
const LP_METADATA = {
  "/cuidador-idosos-mogi-das-cruzes": {
    title: "Cuidador de Idosos em Mogi das Cruzes | CareConnect Agência de Home Care",
    description: "Encontre a melhor agência de cuidador de idosos em Mogi das Cruzes. Home care, plantões e acompanhantes para Hospital Ipiranga, Santa Casa e clínicas locais. Solicite já!"
  },
  "/cuidador-mogi-das-cruzes": {
    title: "Cuidador em Mogi das Cruzes | Agência CareConnect Profissional",
    description: "Busca por cuidador em Mogi das Cruzes? Cuidadores de idosos qualificados, plantões, home care e assistência em hospitais. Solicite atendimento direto pelo WhatsApp."
  },
  "/duvidas-frequentes-cuidador-de-idosos": {
    title: "As pessoas também perguntam sobre Cuidadores de Idosos | CareConnect",
    description: "Principais dúvidas sobre cuidadores de idosos: valores, como contratar, diárias e muito mais. Fale com a CareConnect no WhatsApp."
  },
  "/qual-o-valor-da-diaria-do-cuidador-de-idoso": {
    title: "Qual o valor da diária do cuidador de idoso? | Tabela Oficial",
    description: "Saiba exatamente qual o valor da diária de um cuidador de idoso. Preços atualizados para plantões de 12 e 24 horas. Fale conosco!"
  },
  "/quanto-e-12-horas-de-uma-cuidadora": {
    title: "Quanto é 12 horas de uma cuidadora? | CareConnect",
    description: "Descubra quanto custa 12 horas de uma cuidadora de idosos. Tabela de preços para plantões diurnos e noturnos. Tire suas dúvidas pelo WhatsApp."
  },
  "/como-contratar-cuidador-sem-vinculo-empregaticio": {
    title: "Como contratar um cuidador sem vínculo empregatício? | Guia Seguro",
    description: "Aprenda como contratar um cuidador de idosos sem criar vínculo empregatício e evitar passivos trabalhistas com segurança jurídica. Saiba mais!"
  },
  "/qual-valor-cobrar-para-cuidar-de-um-idoso": {
    title: "Qual valor cobrar para cuidar de um idoso? | Para Cuidadores",
    description: "Tabela de referência para cuidadores: descubra qual valor cobrar para cuidar de um idoso em plantões e diárias. Entre em contato com a nossa agência."
  },
  "/home-care-mogi-das-cruzes-trabalhe-conosco": {
    title: "Home Care Mogi das Cruzes Trabalhe Conosco | CareConnect",
    description: "Vagas para cuidadores em Home Care Mogi das Cruzes. Cadastre-se na CareConnect e encontre oportunidades."
  },
  "/cuidare-mogi-das-cruzes": {
    title: "Cuidare Mogi das Cruzes - Compare os Melhores Cuidadores",
    description: "Procurando pela Cuidare em Mogi das Cruzes? Compare e encontre os melhores profissionais verificados. Fale agora no WhatsApp!"
  },
  "/acuidar-mogi-das-cruzes-cuidadores-de-idosos": {
    title: "Acuidar Mogi das Cruzes Cuidadores de Idosos | CareConnect",
    description: "Alternativa à Acuidar Mogi das Cruzes. Cuidadores de idosos, adultos e crianças. Plantões e home care. Fale via WhatsApp."
  },
  "/casa-de-repouso-mogi-das-cruzes-trabalhe-conosco": {
    title: "Casa de Repouso Mogi das Cruzes Trabalhe Conosco | Vagas",
    description: "Vagas para casa de repouso em Mogi das Cruzes. Trabalhe conosco como cuidador de idosos. Entre em contato pelo WhatsApp."
  },
  "/home-angels-mogi-das-cruzes": {
    title: "Home Angels Mogi das Cruzes - Compare com a CareConnect",
    description: "Procurando pela Home Angels Mogi das Cruzes? Conheça os diferenciais da CareConnect e agende um orçamento gratuito no WhatsApp."
  },
  "/avaliacoes-sobre-cuidare-mogi-das-cruzes": {
    title: "Avaliações sobre Cuidare Mogi das Cruzes | Compare Opções",
    description: "Buscando avaliações sobre Cuidare Mogi das Cruzes? Veja por que famílias também escolhem a CareConnect. Solicite orçamento."
  },
  "/vagas-de-cuidadora-de-idosos-particular": {
    title: "Vagas de Cuidadora de Idosos Particular | Trabalhe Conosco",
    description: "Confira vagas de cuidadora de idosos particular abertas em Mogi das Cruzes. Fale conosco pelo WhatsApp para mais informações."
  }
};

const TEMPLATE = (title, description, path, image) => `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeXml(title)}</title>
    <meta name="description" content="${escapeXml(description)}" />
    
    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeXml(title)}" />
    <meta property="og:description" content="${escapeXml(description)}" />
    <meta property="og:url" content="${SITE_URL}${path}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="CareConnect" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeXml(title)}" />
    <meta name="twitter:description" content="${escapeXml(description)}" />
    <meta name="twitter:image" content="${image}" />

    <!-- Fallback Redirect JS to ensure bots loading SPA still works if needed -->
    <script>window.location.replace("${SITE_URL}${path}?bot=false");</script>
  </head>
  <body>
    <h1>${escapeXml(title)}</h1>
    <p>${escapeXml(description)}</p>
  </body>
</html>`;

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export default async function handler(request, response) {
  try {
    const path = request.query.path ? \`/\${request.query.path}\` : "/";

    const meta = LP_METADATA[path];

    if (!meta) {
      // Se não achar, devolve a rota normal como fallback (ou 404 para o bot)
      response.status(404).send("Page not found");
      return;
    }

    const pageHtml = TEMPLATE(
      meta.title,
      meta.description,
      path,
      `${SITE_URL}/og-image.png`
    );

    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400");
    response.status(200).send(pageHtml);
  } catch (error) {
    console.error("LP render error:", error);
    response.status(500).send("Internal Server Error");
  }
}
