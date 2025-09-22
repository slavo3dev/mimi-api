import { Request, Response } from 'express';
import { VideoModel } from '../models/videoModel';

export class VideoController {
  static getAll = (_req: Request, res: Response) => {
    res.json(VideoModel.getAllVideos());
  };

  static getVideo = (req: Request, res: Response) => {
    const video = VideoModel.getVideo(req.params.videoId);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json(video);
  };

  static addNote = (req: Request, res: Response) => {
    const { videoId } = req.params;
    const { text, time } = req.body;
    if (!text || time === undefined) return res.status(400).json({ error: 'text and time are required' });

    const note = VideoModel.addNote(videoId, text, time);
    res.json(note);
  };

  static updateNote = (req: Request, res: Response) => {
    const { videoId, noteId } = req.params;
    const { text, time } = req.body;

    const note = VideoModel.updateNote(videoId, noteId, text, time);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  };

  static deleteNote = (req: Request, res: Response) => {
    const { videoId, noteId } = req.params;
    const deleted = VideoModel.deleteNote(videoId, noteId);
    if (!deleted) return res.status(404).json({ error: 'Note not found' });
    res.json({ success: true });
  };

  static deleteVideo = (req: Request, res: Response) => {
    const { videoId } = req.params;
    const deleted = VideoModel.deleteVideo(videoId);
    if (!deleted) return res.status(404).json({ error: 'Video not found' });
    res.json({ success: true });
  };
}
