import { login, register } from '../controllers/Users.controller';

import express from 'express';

const router = express.Router();

router.post('/sign-up', register);
router.post('/sign-in', login);

export default router;
