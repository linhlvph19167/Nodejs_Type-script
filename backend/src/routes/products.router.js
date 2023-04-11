import {
	createProduct,
	deleteProduct,
	getProduct,
	getProducts,
	updateProduct,
} from '../controllers/products.controller';

import { checkPermission } from '../middlewares/checkPermission';
import express from 'express';

const router = express.Router();

router.post('/products', checkPermission, createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.put('/products/:id', checkPermission, updateProduct);
router.delete('/products/:id', checkPermission, deleteProduct);

export default router;
