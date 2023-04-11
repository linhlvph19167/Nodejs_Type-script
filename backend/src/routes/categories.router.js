import { createCategory } from '../controllers/categories.conotroller';
import express from 'express';

const router = express.Router();

router.post('/categories', createCategory);

export default router;
