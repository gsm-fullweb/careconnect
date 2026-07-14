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

  // Antes o erro era silenciosamente ignorado: se a RLS bloqueasse a leitura do
  // próprio profile, o usuário admin era tratado como "não admin" e o painel
  // ficava batendo em loop no login sem qualquer pista do motivo. Agora o
  // problema fica visível no console para diagnóstico.
  if (error) {
    console.error("[authRole] Falha ao ler o profile do usuário:", error.message);
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
