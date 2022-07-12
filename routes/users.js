import {Router} from 'express';
import {queryUser, encryptUserPassword, decryptUserPassword} from '../controller/user.js';
import validToken from '../middleware/validToken.js';

const router = Router();

router.use(validToken);

router.post('/users', queryUser);
router.post('/encrypt', encryptUserPassword);
router.post('/decrypt', decryptUserPassword);


export default router;