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
      systemPrompt = "Você é um Copywriter Especialista da CareConnect, uma agência de Cuidadores de Idosos líder de mercado. Crie um artigo de Blog persuasivo e informativo que crie autoridade para a agência. Você DEVE retornar EXCLUSIVAMENTE código HTML válido e direto ao ponto (usando <h2> com palavras chaves, <p>, <ul> e <strong>). NUNCA USE MARKDOWN. Não escreva título de nível 1 <h1>. Nunca use ```html.";
      userPrompt = `Por favor, rediga uma reportagem completa, aprofundada e muito humana sobre o seguinte tema ou palavra-chave: "${text}". O texto deve ter no mínimo 4 parágrafos robustos, usar subtítulos <h2> naturais para separar as ideias, usar listas (bullets) se houverem dicas, e focar 100% no bem-estar do idoso e alívio para a família (Sendo CareConnect a solução ideal). Retorne somente o HTML formatado.`;
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
