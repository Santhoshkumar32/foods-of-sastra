import express from 'express';

import {signIn} from '../controllers/user.js';
import signUp from '../controllers/user.js';

const router =express.Router();

router.post('/signin',signIn);
router.post('/signup',signUp);

export default router;