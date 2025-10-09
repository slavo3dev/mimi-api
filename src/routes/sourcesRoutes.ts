import { Router } from 'express';
import { SourcesController } from '../controllers/SourcesController';

const router = Router();

router.get('/', SourcesController.getAll);
router.get('/:id', SourcesController.getById);
router.post('/', SourcesController.create);
router.put('/:id', SourcesController.update);
router.delete('/:id', SourcesController.delete);

export default router;
