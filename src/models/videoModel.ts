import { v4 as uuidv4 } from 'uuid';

export type MimiNote = {
  id: string;
  time: number;
  text: string;
  videoId: string;
  createdAt: number;
};

export type MimiVideoData = {
  title: string;
  notes: MimiNote[];
};

export class VideoModel {
  private static videos: Record<string, MimiVideoData> = {};

  static getAllVideos(): Record<string, MimiVideoData> {
    return this.videos;
  }

  static getVideo(videoId: string): MimiVideoData | null {
    return this.videos[videoId] ?? null;
  }

  static addNote(videoId: string, text: string, time: number): MimiNote {
    const note: MimiNote = {
      id: uuidv4(),
      text,
      time,
      videoId,
      createdAt: Date.now(),
    };

    if (!this.videos[videoId]) {
      this.videos[videoId] = { title: '', notes: [] };
    }

    this.videos[videoId].notes.push(note);
    return note;
  }

  static updateNote(videoId: string, noteId: string, text: string, time: number): MimiNote | null {
    const video = this.videos[videoId];
    if (!video) return null;

    const note = video.notes.find((n) => n.id === noteId);
    if (!note) return null;

    note.text = text;
    note.time = time;
    return note;
  }

  static deleteNote(videoId: string, noteId: string): boolean {
    const video = this.videos[videoId];
    if (!video) return false;

    const index = video.notes.findIndex((n) => n.id === noteId);
    if (index === -1) return false;

    video.notes.splice(index, 1);

    // Remove video if no notes left
    if (video.notes.length === 0) {
      delete this.videos[videoId];
    }

    return true;
  }

  static deleteVideo(videoId: string): boolean {
    if (!this.videos[videoId]) return false;
    delete this.videos[videoId];
    return true;
  }
}
