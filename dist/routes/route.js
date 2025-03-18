import { Router } from 'express';
import { getUsers, createUser, updateUserByEmail, deleteUserByEmail, userRegister, userLogin, validateOtp } from '../controllers/controller.js';
const router = Router();
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:email', updateUserByEmail);
router.delete('/:email', deleteUserByEmail);
router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/validate-otp', validateOtp);
export default router;
//# sourceMappingURL=route.js.map