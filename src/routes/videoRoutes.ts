import { Router } from "express";
import { VideoController } from "../controllers/VideoController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router()

router.use(authenticateUser);

router.get('/', VideoController.getAll);
router.get('/:videoId', VideoController.getVideo);
router.post('/:videoId/notes', VideoController.addNote);
router.put('/:videoId/notes/:noteId', VideoController.updateNote);
router.delete('/:videoId/notes/:noteId', VideoController.deleteNote);
router.delete('/:videoId', VideoController.deleteVideo);

export default router;