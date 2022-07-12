import {Router} from 'express';
import { sendEmail } from '../controller/email.js';
import validToken from '../middleware/validToken.js';

const router = Router();

router.use(validToken);

router.post('/send', sendEmail);

export default router;