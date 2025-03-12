import { Router } from 'express';
import { getUsers, createUser, updateUserByEmail, deleteUserByEmail } from '../controllers/controller.js';
const router = Router();
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:email', updateUserByEmail);
router.delete('/:email', deleteUserByEmail);
export default router;
//# sourceMappingURL=route.js.map