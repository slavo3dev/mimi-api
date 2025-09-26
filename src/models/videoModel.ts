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
  // 🔹 Get all videos with notes for a user
  static async getAllVideos(userId?: string): Promise<MimiVideoData[]> {
    let query = supabase
      .from("videos")
      .select("*, notes(*)");

    if (userId) {
      // if userId is passed → return only user's videos
      query = query.eq("user_id", userId);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Error fetching videos: ${error.message}`);
    return data ?? [];
  }

  // 🔹 Get a single video with notes (for authenticated user)
  static async getVideo(videoId: string, userId: string): Promise<MimiVideoData | null> {
    const { data, error } = await supabase
      .from("videos")
      .select("*, notes(*)")
      .eq("id", videoId)
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // not found
      throw new Error(`Error fetching video: ${error.message}`);
    }
    return data ?? null;
  }

  // 🔹 Add a new note (creates video if missing)
  static async addNote(
    videoId: string,
    text: string,
    time: number,
    userId: string
  ): Promise<MimiNote> {
    // Ensure video exists (or create it)
    const { data: video, error: videoError } = await supabase
      .from("videos")
      .select("id")
      .eq("id", videoId)
      .eq("user_id", userId)
      .single();

    if (videoError && videoError.code === "PGRST116") {
      const { error: insertError } = await supabase
        .from("videos")
        .insert({ id: videoId, title: "", user_id: userId });

      if (insertError) throw new Error(`Error creating video: ${insertError.message}`);
    } else if (videoError) {
      throw new Error(`Error checking video: ${videoError.message}`);
    }

    // Insert note
    const { data: note, error } = await supabase
      .from("notes")
      .insert({ video_id: videoId, text, time, user_id: userId })
      .select()
      .single();

    if (error) throw new Error(`Error inserting note: ${error.message}`);
    return note!;
  }

  // 🔹 Update a note (only if owned by user)
  static async updateNote(
    videoId: string,
    noteId: string,
    text: string,
    time: number,
    userId: string
  ): Promise<MimiNote | null> {
    const { data, error } = await supabase
      .from("notes")
      .update({ text, time })
      .eq("id", noteId)
      .eq("video_id", videoId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`Error updating note: ${error.message}`);
    }
    return data ?? null;
  }

  // 🔹 Delete a note
  static async deleteNote(videoId: string, noteId: string, userId: string): Promise<boolean> {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", noteId)
      .eq("video_id", videoId)
      .eq("user_id", userId);

    if (error) throw new Error(`Error deleting note: ${error.message}`);
    return true;
  }

  // 🔹 Delete a video (and cascade its notes if configured in DB)
  static async deleteVideo(videoId: string, userId: string): Promise<boolean> {
    const { error } = await supabase
      .from("videos")
      .delete()
      .eq("id", videoId)
      .eq("user_id", userId);

    if (error) throw new Error(`Error deleting video: ${error.message}`);
    return true;
  }
}
