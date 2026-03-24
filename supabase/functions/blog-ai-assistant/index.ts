import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AIRequest {
  text: string;
  action: "grammar" | "seo" | "links";
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
    let systemPrompt = "Você é um excelente assessor editorial e de SEO especializado na área de assistência em saúde (CareConnect). Você deve APENAS retornar o texto formatado e com marcações Markdown adequadas. Não faça comentários extras na sua resposta. NUNCA saia do escopo do texto fornecido.";
    let userPrompt = text;

    if (action === "grammar") {
      userPrompt = `Realize a correção ortográfica, de concordância e de clareza (gramática) do texto a seguir. Mantenha as quebras de linha existentes e os cabeçalhos. Texto original:\n\n${text}`;
    } else if (action === "seo") {
      systemPrompt += " No seu trabalho de SEO, expanda acrônimos relevantes, destaque com negrito as palavras-chave principais, certifique-se de que existem tópicos (## ou ###) lógicos para facilitar a leitura dinámica.";
      userPrompt = `Melhore o SEO (Search Engine Optimization) do seguinte texto. Preserve o contexto original, mas torne-o mais cativante para as buscas do Google no nicho de Cuidado de Idosos e Assistência Domiciliar. Texto original:\n\n${text}`;
    } else if (action === "links") {
      userPrompt = `No seguinte texto, encontre espaços naturais (ou crie pequenas inserções lógicas de 1 ou 2 palavras relacionadas) e sugira links. Formate os links com o padrão markdown: [âncora da vez](URL_AQUI). Substitua URL_AQUI por "https://careconnect.com.br/planos" se recomendar checar planos ou "https://careconnect.com.br/contact" se for para falar com consultor. Adicione o texto com os links injetados e, no final, cite 1 referência de fonte confiável externa (organizações de saúde) caso faça sentido para o contexto. Texto:\n\n${text}`;
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
