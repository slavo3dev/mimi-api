import { Router } from "express";
import { VideoController } from "../controllers/VideoController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router()

//router.use(authenticateUser);

router.get('/', VideoController.getAll);
router.get('/:videoId', authenticateUser, VideoController.getVideo);
router.post('/:videoId/notes', authenticateUser, VideoController.addNote);
router.put('/:videoId/notes/:noteId', authenticateUser, VideoController.updateNote);
router.delete('/:videoId/notes/:noteId', authenticateUser, VideoController.deleteNote);
router.delete('/:videoId', authenticateUser, VideoController.deleteVideo);

export default router;