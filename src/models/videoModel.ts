import { supabase } from '../lib/supabaseClient';

export class VideoModel {
  static async getAllVideos() {
    const { data, error } = await supabase
      .from('videos')
      .select('id, title, created_at, notes (id, text, time, created_at)');
    if (error) throw error;
    return data;
  }

  static async getVideo(videoId: string) {
    const { data, error } = await supabase
      .from('videos')
      .select('id, title, created_at, notes (id, text, time, created_at)')
      .eq('id', videoId)
      .single();
    if (error) return null;
    return data;
  }

  static async addNote(videoId: string, text: string, time: number) {
    // If video doesn’t exist, create it
    let { data: video } = await supabase
      .from('videos')
      .select('id')
      .eq('id', videoId)
      .single();

    if (!video) {
      const { data: newVideo, error: videoError } = await supabase
        .from('videos')
        .insert([{ id: videoId, title: '' }])
        .select()
        .single();
      if (videoError) throw videoError;
      video = newVideo;
    }

    // Insert note
    const { data: note, error } = await supabase
      .from('notes')
      .insert([{ video_id: video?.id, text, time }])
      .select()
      .single();

    if (error) throw error;
    return note;
  }

  static async updateNote(noteId: string, text: string, time: number) {
    const { data, error } = await supabase
      .from('notes')
      .update({ text, time })
      .eq('id', noteId)
      .select()
      .single();

    if (error) return null;
    return data;
  }

  static async deleteNote(noteId: string) {
    const { error } = await supabase.from('notes').delete().eq('id', noteId);
    return !error;
  }

  static async deleteVideo(videoId: string) {
    const { error } = await supabase.from('videos').delete().eq('id', videoId);
    return !error;
  }
}
