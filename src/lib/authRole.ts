import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const normalizeEmail = (email?: string | null) => email?.trim().toLowerCase() ?? "";

const isCaregiverRole = (role?: string | null) => {
  const normalizedRole = role?.trim().toLowerCase();
  return normalizedRole === "cuidador" || normalizedRole === "caregiver";
};

const isAdminRole = (role?: string | null) => {
  const normalizedRole = role?.trim().toLowerCase();
  return normalizedRole === "admin" || normalizedRole === "administrator";
};

export const getUserProfile = async (user: User | null) => {
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("user_role,type")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("[authRole] Falha ao ler o profile do usuário:", error.message);
    // Fallback: tenta usar o user_metadata do token JWT como fonte alternativa
    // de papel. Isso evita logout espúrio quando a tabela profiles é inacessível
    // por problemas de RLS ou rede.
    const meta = user.user_metadata ?? {};
    const roleFromMeta = meta.user_role ?? meta.role ?? meta.type ?? null;
    if (roleFromMeta) {
      console.warn("[authRole] Usando user_metadata como fallback de papel:", roleFromMeta);
      return { user_role: roleFromMeta as string, type: roleFromMeta as string };
    }
    return null;
  }

  return data;
};

export const hasCaregiverCandidate = async (email?: string | null) => {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return false;

  const { data } = await supabase
    .from("candidatos_cuidadores_rows")
    .select("id")
    .ilike("email", normalizedEmail)
    .maybeSingle();

  return !!data;
};

export const isAdminUser = async (user: User | null) => {
  const profile = await getUserProfile(user);
  return isAdminRole(profile?.user_role) || isAdminRole(profile?.type);
};

export const isCaregiverUser = async (user: User | null) => {
  if (!user) return false;

  const profile = await getUserProfile(user);
  if (isCaregiverRole(profile?.user_role) || isCaregiverRole(profile?.type)) {
    return true;
  }

  return hasCaregiverCandidate(user.email);
};

export const getDashboardPathForUser = async (user: User | null) => {
  if (!user) return "/login";

  const profile = await getUserProfile(user);

  if (isAdminRole(profile?.user_role) || isAdminRole(profile?.type)) {
    return "/admin";
  }

  if (isCaregiverRole(profile?.user_role) || isCaregiverRole(profile?.type)) {
    return "/painel-cuidador";
  }

  return (await hasCaregiverCandidate(user.email)) ? "/painel-cuidador" : "/client-dashboard";
};

export const getCaregiverCandidateByEmail = async (email?: string | null) => {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return null;

  const { data, error } = await supabase
    .from("candidatos_cuidadores_rows")
    .select("*")
    .ilike("email", normalizedEmail)
    .maybeSingle();

  if (error) throw error;
  return data;
};
