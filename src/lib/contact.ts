// ============================================================================
// CareConnect — Informações de contato institucionais (fonte única da verdade)
// ----------------------------------------------------------------------------
// Centraliza telefone/WhatsApp/e-mail para que todas as páginas usem o MESMO
// número, formato de link e rótulo. Antes esses valores estavam espalhados e
// inconsistentes (ora `wa.me`, ora `api.whatsapp.com`, ora `target=_self`).
// ============================================================================

/** Número no formato internacional só com dígitos (usado nos links). */
export const WHATSAPP_PHONE = "551148633976";

/** Número formatado para exibição ao usuário. */
export const CONTACT_PHONE_DISPLAY = "(11) 4863-3976";

/** E-mail institucional de contato. */
export const CONTACT_EMAIL = "contato@careconnect.com.br";

/** Cidade/UF base de atendimento. */
export const CONTACT_CITY = "Mogi das Cruzes - SP";

/** Rótulo padrão do CTA "encontrar cuidador" em todo o site. */
export const FIND_CAREGIVER_LABEL = "Encontre um Cuidador";

/** Mensagem padrão pré-preenchida para quem busca um cuidador. */
export const FIND_CAREGIVER_MESSAGE =
  "Olá! Vim pelo site da CareConnect e gostaria de encontrar um cuidador.";

/**
 * Monta a URL canônica do WhatsApp da CareConnect.
 * Formato único (`wa.me`) para todo o site.
 * @param message texto opcional já pré-preenchido na conversa.
 */
export const whatsappUrl = (message?: string): string => {
  const base = `https://wa.me/${WHATSAPP_PHONE}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/** Link canônico do fluxo "Encontre um Cuidador" (com mensagem padrão). */
export const FIND_CAREGIVER_URL = whatsappUrl(FIND_CAREGIVER_MESSAGE);

/** Link telefônico (`tel:`) institucional. */
export const TEL_HREF = `tel:+${WHATSAPP_PHONE}`;

/** Link de e-mail (`mailto:`) institucional. */
export const MAILTO_HREF = `mailto:${CONTACT_EMAIL}`;
