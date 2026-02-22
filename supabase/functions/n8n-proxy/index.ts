import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const N8N_WEBHOOK_URL = "https://n8n-n8n.n1n956.easypanel.host/webhook/mila-site";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
    // Responder ao preflight OPTIONS
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

        // Encaminhar para o n8n (server-to-server — sem CORS)
        const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        // Ler resposta do n8n
        const contentType = n8nResponse.headers.get("content-type") || "";
        let responseData: unknown;

        if (contentType.includes("application/json")) {
            responseData = await n8nResponse.json();
        } else {
            const text = await n8nResponse.text();
            responseData = { output: text };
        }

        return new Response(JSON.stringify(responseData), {
            status: n8nResponse.ok ? 200 : n8nResponse.status,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Erro no proxy n8n:", error);
        return new Response(
            JSON.stringify({ error: "Falha ao conectar com o agente. Tente novamente." }),
            {
                status: 502,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});
