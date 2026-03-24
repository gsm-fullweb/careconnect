import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AIRequest {
  text: string;
  action: "grammar" | "seo" | "links" | "generate";
}

Deno.serve(async (req) => {
  // Configurações e proteção de CORS (Cross-Origin Resource Sharing)
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, action } = (await req.json()) as AIRequest;

    if (!text) {
      return new Response(
        JSON.stringify({ error: "Texto original é obrigatório." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verifica se a chave da OpenAI está configurada
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          error: "A chave da OpenAI não foi configurada. Acesse o painel do Supabase -> Edge Functions -> Secrets e adicione a variável OPENAI_API_KEY." 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Cria os prompts específicos baseados na ação selecionada
    let systemPrompt = "Você é um excelente assessor editorial e SEO especializado em saúde (CareConnect). Você DEVE retornar EXCLUSIVAMENTE código HTML válido (usando <p>, <h2>, <ul>, <strong>). NUNCA USE MARKDOWN (como ## ou **). Não inclua blocos de código como ```html. Retorne apenas o HTML puro. Mantenha os pulos de linha.";
    let userPrompt = text;

    if (action === "grammar") {
      userPrompt = `Realize a correção ortográfica, de concordância e de clareza do texto HTML a seguir. Mantenha estruturado em HTML. Texto original:\n\n${text}`;
    } else if (action === "seo") {
      systemPrompt += " No seu trabalho de SEO, garanta que existam tags <h2> naturais com palavras-chave relevantes, e envolva termos essenciais de busca em <strong>.";
      userPrompt = `Melhore o SEO (Copywriting e Search Engine Optimization) do seguinte texto. Foque em Mogi das Cruzes e no nicho de Cuidadores de Idosos. Você DEVE retornar apenas HTML. Texto:\n\n${text}`;
    } else if (action === "links") {
      userPrompt = `No seguinte texto, encontre espaços naturais (ou crie pequenas inserções lógicas de 1 ou 2 palavras relacionadas) e sugira links. Formate os links com tags HTML: <a href="URL_AQUI">âncora da vez</a>. Substitua URL_AQUI por "https://careconnect.com.br/planos" se recomendar checar planos ou "https://careconnect.com.br/contact" se for para falar com consultor. Adicione o texto com os links injetados e, no final, cite 1 referência de fonte confiável externa (organizações de saúde) caso faça sentido para o contexto. Retorne APENAS HTML puríssimo. Texto:\n\n${text}`;
    } else if (action === "generate") {
      systemPrompt = `Você é um Redator Chefe e Especialista em SEO da CareConnect, a maior agência de Cuidadores de Idosos do país. 
Sua missão é criar reportagens PROFUNDAS, HUMANAS e EXTENSAS (mínimo de 1000 palavras).
Você deve SEMPRE incluir no texto a "Mila, a inteligência artificial do CareConnect", que ajuda as famílias a encontrarem cuidadores via WhatsApp.
Sempre que possível, cite o contexto local de Mogi das Cruzes e região do Alto Tietê como centro de excelência.
Use uma estrutura rica:
1. Introdução empática.
2. Pelo menos 5 a 7 subtítulos <h2> abordando diferentes ângulos do problema.
3. Listas com bullets <ul> e <li> para dicas práticas.
4. Uso estratégico de <strong> para termos chave.
5. Uma seção final com uma lista de "Referências e Fontes Sugeridas" no estilo científico/jornalístico.
6. Tom de voz: Autoritário, mas extremamente acolhedor.

REGRAS CRÍTICAS:
- Retorne APENAS HTML puríssimo.
- NUNCA use Markdown (### ou **).
- NUNCA use envoltorios como \`\`\`html.
- NÃO use <h1> (o título principal é gerado pelo sistema).`;
      
      userPrompt = `Escreva um artigo de blog completo, de alta autoridade e com mais de 1000 palavras sobre o tema: "${text}". O texto deve ser tão detalhado e rico quanto uma reportagem de capa do G1, focado em ajudar famílias que estão passando por este desafio agora. Lembre-se de mencionar a Mila (IA do CareConnect) como solução facilitadora.`;
    }

    // Chama a API da OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Modelo padrão recomendado
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`OpenAI Erro: ${errorData}`);
    }

    const result = await response.json();
    const improvedText = result.choices[0].message.content;

    return new Response(
      JSON.stringify({ improvedText }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Erro no blog-ai-assistant:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
