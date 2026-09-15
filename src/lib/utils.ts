import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSecurePassword(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "N/A";
  
  // Extrair a parte YYYY-MM-DD diretamente da string,
  // evitando conversão de fuso horário que causa exibição do dia anterior
  const dateMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (dateMatch) {
    const [, year, month, day] = dateMatch;
    return `${day}/${month}/${year}`;
  }
  
  // Fallback para formatos não reconhecidos
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Data inválida";
  
  return date.toLocaleDateString("pt-BR");
}

export function normalizeCity(city: string | null | undefined): string {
  if (!city) return "";
  return city
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const CARGO_OPTIONS = [
  { key: "cuidador", label: "Cuidador(a) de Idosos" },
  { key: "tecnico_enfermagem", label: "Técnico(a) de Enfermagem" },
  { key: "enfermeiro", label: "Enfermeiro(a)" },
  { key: "fisioterapeuta", label: "Fisioterapeuta" },
  { key: "terapeuta_ocupacional", label: "Terapeuta Ocupacional" },
  { key: "medico", label: "Médico(a)" },
] as const;

function normalizeCargoText(cargo: string | null | undefined): string {
  return (cargo || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\(a\)/g, "")
    .replace(/[^a-z0-9]+/g, " ");
}

export function getCanonicalCargoKey(cargo: string | null | undefined): string {
  const normalized = normalizeCargoText(cargo);

  if (!normalized) return "";
  if (normalized === "tecnico" || normalized === "tecnico enfermagem") return "tecnico_enfermagem";
  if (normalized === "terapeuta") return "terapeuta_ocupacional";
  if (normalized.includes("tecnico") && normalized.includes("enfermagem")) return "tecnico_enfermagem";
  if (normalized.includes("enfermeiro") || normalized.includes("enfermagem")) return "enfermeiro";
  if (normalized.includes("fisioterapeuta") || normalized.includes("fisioterapia")) return "fisioterapeuta";
  if (normalized.includes("terapeuta") || normalized.includes("ocupacional")) return "terapeuta_ocupacional";
  if (normalized.includes("medico") || normalized.includes("medica")) return "medico";
  if (normalized.includes("cuidador") || normalized.includes("idoso")) return "cuidador";

  return normalized.replace(/\s+/g, "_");
}

export function formatCargoLabel(cargo: string | null | undefined): string {
  const key = getCanonicalCargoKey(cargo);
  const option = CARGO_OPTIONS.find((item) => item.key === key);

  if (option) return option.label;
  return cargo?.trim() || "Cuidador(a) de Idosos";
}

export const PUBLIC_CAREGIVER_FIELDS =
  "id,nome,cidade,cargo,experiencia,disponibilidade_horarios,descricao_experiencia,telefone";

export function getWhatsAppHref(phone: string | null | undefined, message?: string): string | null {
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.length < 10) return null;

  const phoneWithCountry = digits.startsWith("55") ? digits : `55${digits}`;
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : "";

  return `https://wa.me/${phoneWithCountry}${encodedMessage}`;
}

export function formatPhoneDisplay(phone: string | null | undefined): string {
  const digits = (phone || "").replace(/\D/g, "");
  const localDigits = digits.startsWith("55") && digits.length > 11 ? digits.slice(2) : digits;

  if (localDigits.length === 11) {
    return `(${localDigits.slice(0, 2)}) ${localDigits.slice(2, 7)}-${localDigits.slice(7)}`;
  }

  if (localDigits.length === 10) {
    return `(${localDigits.slice(0, 2)}) ${localDigits.slice(2, 6)}-${localDigits.slice(6)}`;
  }

  return phone || "WhatsApp nao informado";
}

export function formatMaskedName(fullName: string | null | undefined): string {
  if (!fullName) return "Cuidador Parceiro";

  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "Cuidador Parceiro";
  if (parts.length === 1) return parts[0];

  const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
  return `${parts[0]} ${lastInitial}.`;
}
