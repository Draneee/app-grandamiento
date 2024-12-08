import { supabase } from "./supabase/client";

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const fecherSupabase30Days = async (id: string) => {
  const { data } = await supabase
    .from("profiles")
    .select("30_days")
    .eq("id", id)
    .single();
  return data;
};
