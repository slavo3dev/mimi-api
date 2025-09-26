import { Request, Response } from "express";
import { VideoModel } from "../models/videoModel";

export class VideoController {
  // Get all videos for the authenticated user
  static getAll = async (req: Request, res: Response) => {
    try {
      //if (!req.user) return res.status(401).json({ error: "Unauthorized" });
      const videos = await VideoModel.getAllVideos();
      res.json(videos);
    } catch (err) {
      console.error("Error fetching videos:", err);
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  };

  // Get one video with notes
  static getVideo = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(401).json({ error: "Unauthorized" });
      const { videoId } = req.params;

      const video = await VideoModel.getVideo(videoId, req.user.id);
      if (!video) return res.status(404).json({ error: "Video not found" });

      res.json(video);
    } catch (err) {
      console.error("Error fetching video:", err);
      res.status(500).json({ error: "Failed to fetch video" });
    }
  };

  // Add a note (creates video if it doesn’t exist yet)
  static addNote = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(401).json({ error: "Unauthorized" });
      const { videoId } = req.params;
      const { text, time } = req.body;

      if (!text || time === undefined) {
        return res.status(400).json({ error: "text and time are required" });
      }

      const note = await VideoModel.addNote(videoId, text, time, req.user.id);
      res.status(201).json(note);
    } catch (err) {
      console.error("Error adding note:", err);
      res.status(500).json({ error: "Failed to add note" });
    }
  };

  // Update a note
  static updateNote = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(401).json({ error: "Unauthorized" });
      const { videoId, noteId } = req.params;
      const { text, time } = req.body;

      if (!text || time === undefined) {
        return res.status(400).json({ error: "text and time are required" });
      }

      const note = await VideoModel.updateNote(videoId, noteId, text, time, req.user.id);
      if (!note) return res.status(404).json({ error: "Note not found" });

      res.json(note);
    } catch (err) {
      console.error("Error updating note:", err);
      res.status(500).json({ error: "Failed to update note" });
    }
  };

  // Delete a note
  static deleteNote = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(401).json({ error: "Unauthorized" });
      const { videoId, noteId } = req.params;

      const deleted = await VideoModel.deleteNote(videoId, noteId, req.user.id);
      if (!deleted) return res.status(404).json({ error: "Note not found" });

      res.json({ success: true });
    } catch (err) {
      console.error("Error deleting note:", err);
      res.status(500).json({ error: "Failed to delete note" });
    }
  };

  // Delete a video
  static deleteVideo = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(401).json({ error: "Unauthorized" });
      const { videoId } = req.params;

      const deleted = await VideoModel.deleteVideo(videoId, req.user.id);
      if (!deleted) return res.status(404).json({ error: "Video not found" });

      res.json({ success: true });
    } catch (err) {
      console.error("Error deleting video:", err);
      res.status(500).json({ error: "Failed to delete video" });
    }
  };
}
