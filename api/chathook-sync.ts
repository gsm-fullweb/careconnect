const normalizePhone = (phone: string | null | undefined) => {
  const digits = phone?.replace(/\D/g, "") ?? "";
  if (!digits) return null;
  return digits.startsWith("55") ? digits : `55${digits}`;
};

const normalizeBaseUrl = (url: string) => url.replace(/\/+$/, "");

const parseJsonResponse = async (response: Response) => {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
};

const requireEnv = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} nao configurado`);
  return value;
};

const getCandidateEndpoints = () => {
  const configured = process.env.CHATHOOK_PROFESSIONALS_ENDPOINT;
  if (configured) return [configured];

  return [
    "/api/profissionais",
    "/api/professionals",
    "/api/agenda/profissionais",
    "/api/schedule/professionals",
  ];
};

const joinUrl = (baseUrl: string, path: string) => {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const baseUrl = normalizeBaseUrl(requireEnv("CHATHOOK_BASE_URL"));
    const apiToken = requireEnv("CHATHOOK_API_TOKEN");
    const accountId = requireEnv("CHATHOOK_ACCOUNT_ID");

    const caregiver = req.body?.caregiver;
    if (!caregiver?.email || !caregiver?.name || !caregiver?.phone) {
      return res.status(400).json({ error: "Dados do cuidador incompletos" });
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
      api_access_token: apiToken,
      "X-Account-ID": String(accountId),
    };

    const professionalPayload = {
      name: caregiver.name,
      nome: caregiver.name,
      email: caregiver.email,
      phone: normalizePhone(caregiver.phone),
      telefone: normalizePhone(caregiver.phone),
      specialty: caregiver.role,
      especialidade: caregiver.role,
      role: caregiver.role,
      cargo: caregiver.role,
      city: caregiver.city,
      cidade: caregiver.city,
      address: caregiver.address,
      endereco: caregiver.address,
      postal_code: caregiver.cep,
      cep: caregiver.cep,
      experience: caregiver.experience,
      experiencia: caregiver.experience,
      availability: caregiver.availability,
      disponibilidade: caregiver.availability,
      disponibilidade_horarios: caregiver.availability,
      status: caregiver.status || "Em analise",
      active: true,
      ativo: true,
      services: caregiver.services || [caregiver.role].filter(Boolean),
      servicos: caregiver.services || [caregiver.role].filter(Boolean),
      external_id: caregiver.id ? String(caregiver.id) : undefined,
      metadata: {
        source: "careconnect",
        careconnect_caregiver_id: caregiver.id ? String(caregiver.id) : null,
      },
    };

    const attempts = [];

    for (const endpoint of getCandidateEndpoints()) {
      const url = joinUrl(baseUrl, endpoint);
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(professionalPayload),
      });

      const data = await parseJsonResponse(response);
      attempts.push({ endpoint, status: response.status, data });

      if (response.ok) {
        return res.status(200).json({
          ok: true,
          endpoint,
          professional: data,
        });
      }

      if (![404, 405].includes(response.status)) {
        return res.status(502).json({
          error: "Chathook recusou o cadastro do profissional",
          endpoint,
          status: response.status,
          detail: data,
        });
      }
    }

    return res.status(502).json({
      error: "Endpoint de profissionais nao encontrado no Chathook",
      hint: "Configure CHATHOOK_PROFESSIONALS_ENDPOINT com o endpoint correto da Documentacao API.",
      attempts,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
}
