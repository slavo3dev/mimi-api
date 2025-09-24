import { supabase } from "../lib/supabaseClient";

export type MimiNote = {
  id: string;
  video_id: string;
  text: string;
  time: number;
  created_at: string;
  user_id: string;
};

export type MimiVideoData = {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
  notes?: MimiNote[];
};

export class VideoModel {
  // ✅ Get all videos for a user
  static async getAllVideos(userId: string): Promise<MimiVideoData[]> {
    const { data, error } = await supabase
      .from("videos")
      .select("*, notes(*)")
      .eq("user_id", userId);

    if (error) throw error;
    return data || [];
  }

  // ✅ Get a single video with notes (owned by user)
  static async getVideo(videoId: string, userId: string): Promise<MimiVideoData | null> {
    const { data, error } = await supabase
      .from("videos")
      .select("*, notes(*)")
      .eq("id", videoId)
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") throw error; // "not found"
    return data || null;
  }

  // ✅ Add a note to a video (creates video if not exists)
  static async addNote(videoId: string, text: string, time: number, userId: string): Promise<MimiNote> {
    // Ensure video exists
    const { data: video, error: videoError } = await supabase
      .from("videos")
      .select("id")
      .eq("id", videoId)
      .eq("user_id", userId)
      .single();

    if (videoError && videoError.code === "PGRST116") {
      // If video not found, create it
      const { error: insertError } = await supabase
        .from("videos")
        .insert({ id: videoId, title: "", user_id: userId });

      if (insertError) throw insertError;
    }

    // Insert note
    const { data: note, error } = await supabase
      .from("notes")
      .insert({ video_id: videoId, text, time, user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return note;
  }

  // ✅ Update a note (only if user owns it)
  static async updateNote(videoId: string, noteId: string, text: string, time: number, userId: string): Promise<MimiNote | null> {
    const { data, error } = await supabase
      .from("notes")
      .update({ text, time })
      .eq("id", noteId)
      .eq("video_id", videoId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data || null;
  }

  // ✅ Delete a note (only if user owns it)
  static async deleteNote(videoId: string, noteId: string, userId: string): Promise<boolean> {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", noteId)
      .eq("video_id", videoId)
      .eq("user_id", userId);

    if (error) throw error;
    return true;
  }

  // ✅ Delete a video (and cascade its notes if configured)
  static async deleteVideo(videoId: string, userId: string): Promise<boolean> {
    const { error } = await supabase
      .from("videos")
      .delete()
      .eq("id", videoId)
      .eq("user_id", userId);

    if (error) throw error;
    return true;
  }
}
