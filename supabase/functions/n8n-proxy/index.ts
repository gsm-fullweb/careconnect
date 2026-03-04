import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const N8N_WEBHOOK_URL = "https://n8n-n8n.n1n956.easypanel.host/webhook/site";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    try {
        const body = await req.json();

        // Timeout de 30s para o n8n
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);

        let n8nResponse: Response;
        try {
            n8nResponse = await fetch(N8N_WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                signal: controller.signal,
            });
        } finally {
            clearTimeout(timeout);
        }

        // Ler resposta do n8n (pode ser JSON ou texto)
        const contentType = n8nResponse.headers.get("content-type") || "";
        let responseData: unknown;

        if (contentType.includes("application/json")) {
            responseData = await n8nResponse.json();
        } else {
            const text = await n8nResponse.text();
            // Log para debug
            console.log("n8n status:", n8nResponse.status, "body:", text.slice(0, 200));
            // Se n8n retornou erro, tenta extrair mensagem
            if (!n8nResponse.ok) {
                return new Response(
                    JSON.stringify({
                        error: `n8n retornou ${n8nResponse.status}`,
                        detail: text.slice(0, 300),
                    }),
                    {
                        status: 502,
                        headers: { ...corsHeaders, "Content-Type": "application/json" },
                    }
                );
            }
            responseData = { output: text };
        }

        return new Response(JSON.stringify(responseData), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Erro no proxy n8n:", message);

        // Erro de timeout
        if (message.includes("abort") || message.includes("timed out")) {
            return new Response(
                JSON.stringify({ error: "Tempo limite excedido. O agente demorou muito para responder." }),
                { status: 504, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({ error: "Falha ao conectar com o agente. Verifique se o workflow n8n está ativo." }),
            { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
});
