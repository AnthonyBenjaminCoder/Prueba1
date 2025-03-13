import { Router } from 'express';
import { getPLaces, createPlace, updatePlaceName, deletePlaceName } from '../controllers/placeController.js';
const router = Router();
router.get('/', getPLaces);
router.post('/', createPlace);
router.put('/:email', updatePlaceName);
router.delete('/:email', deletePlaceName);
export default router;
//# sourceMappingURL=placeRoutes.js.map