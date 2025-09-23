import { Request, Response } from 'express';
import { VideoModel } from '../models/videoModel';

export class VideoController {
  static getAll = async (_req: Request, res: Response) => {
    try {
      const videos = await VideoModel.getAllVideos();
      res.json(videos);
    } catch (err) {
      console.error('Error fetching videos:', err);
      res.status(500).json({ error: 'Failed to fetch videos' });
    }
  };

  static getVideo = async (req: Request, res: Response) => {
    try {
      const video = await VideoModel.getVideo(req.params.videoId);
      if (!video) return res.status(404).json({ error: 'Video not found' });
      res.json(video);
    } catch (err) {
      console.error('Error fetching video:', err);
      res.status(500).json({ error: 'Failed to fetch video' });
    }
  };

  static addNote = async (req: Request, res: Response) => {
    const { videoId } = req.params;
    const { text, time } = req.body;

    if (!text || time === undefined) {
      return res.status(400).json({ error: 'text and time are required' });
    }

    try {
      const note = await VideoModel.addNote(videoId, text, time);
      res.json(note);
    } catch (err) {
      console.error('Error adding note:', err);
      res.status(500).json({ error: 'Failed to add note' });
    }
  };

  static updateNote = async (req: Request, res: Response) => {
    const { noteId } = req.params;
    const { text, time } = req.body;

    if (!text || time === undefined) {
      return res.status(400).json({ error: 'text and time are required' });
    }

    try {
      const note = await VideoModel.updateNote(noteId, text, time);
      if (!note) return res.status(404).json({ error: 'Note not found' });
      res.json(note);
    } catch (err) {
      console.error('Error updating note:', err);
      res.status(500).json({ error: 'Failed to update note' });
    }
  };

  static deleteNote = async (req: Request, res: Response) => {
    const { noteId } = req.params;

    try {
      const deleted = await VideoModel.deleteNote(noteId);
      if (!deleted) return res.status(404).json({ error: 'Note not found' });
      res.json({ success: true });
    } catch (err) {
      console.error('Error deleting note:', err);
      res.status(500).json({ error: 'Failed to delete note' });
    }
  };

  static deleteVideo = async (req: Request, res: Response) => {
    const { videoId } = req.params;

    try {
      const deleted = await VideoModel.deleteVideo(videoId);
      if (!deleted) return res.status(404).json({ error: 'Video not found' });
      res.json({ success: true });
    } catch (err) {
      console.error('Error deleting video:', err);
      res.status(500).json({ error: 'Failed to delete video' });
    }
  };
}
