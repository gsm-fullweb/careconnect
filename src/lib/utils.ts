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
  
  // Se for apenas data (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }
  
  // Se for uma data ISO completa, usar a data local para exibição amigável
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
