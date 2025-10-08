import { supabase } from "../lib/supabaseClient";

export type PorchEntry = {
  created_at?: string;
  text?: string;
  email?: string;
  source?: string;
  new_id?: string;
  likes?: string[];
}

export class PorchModel {
  private static table = "porch";

  static async getAll(): Promise<PorchEntry[]> {
    const { data, error } = await supabase.from("porch").select("*");
    if (error) throw new Error(error.message);
    return data ?? [];
  }

  static async getById(id: string): Promise<PorchEntry | null> {
    const { data, error } = await supabase
      .from("porch")
      .select("*")
      .eq("new_id", id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async create(entry: Omit<PorchEntry, "new_id" | "created_at">): Promise<PorchEntry> {
    const { data, error } = await supabase
      .from("porch")
      .insert([entry])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabase.from("porch").delete().eq("new_id", id);
    if (error) throw new Error(error.message);
  }
}
