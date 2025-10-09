import { supabase } from "../lib/supabaseClient";

export class SourcesModel {
  static table = 'sources';

  static async getAll() {
    const { data, error } = await supabase.from('sources').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  static async getById(id: number) {
    const { data, error } = await supabase.from('sources').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async create(sourceData: {
    text?: string;
    source?: string;
    category?: string;
    like?: number;
    exelent?: number;
    false?: number;
    email?: string;
    likes?: string[];
  }) {
    const { data, error } = await supabase.from('sources').insert([sourceData]).select();
    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id: number, updates: Record<string, any>) {
    const { data, error } = await supabase.from('sources').update(updates).eq('id', id).select();
    if (error) throw new Error(error.message);
    return data;
  }

  static async delete(id: number) {
    const { error } = await supabase.from('sources').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { message: 'Deleted successfully' };
  }
}
