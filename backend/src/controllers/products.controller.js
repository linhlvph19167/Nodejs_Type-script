import Category from '../models/categories.model';
import Product from '../models/products.models';
import { productSchema } from '../validates/products.validate';

export const createProduct = async (req, res) => {
	try {
		/* validate */
		const { error } = productSchema.validate(req.body, { abortEarly: false });
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		/* create */
		const product = await Product.create(req.body);

		await Category.findByIdAndUpdate(product.categoryId, {
			$addToSet: { products: product._id },
		});

		return res.status(201).json(product);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find().populate('categoryId');
		return res.status(200).json(products);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id).populate(
			'categoryId'
		);
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		return res.status(200).json(product);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

/* update */
export const updateProduct = async (req, res) => {
	try {
		const id = req.params.id;
		const body = req.body;
		/* validate */
		const { error } = productSchema.validate(req.body, { abortEarly: false });
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		/* update */
		const product = await Product.findOneAndUpdate({ _id: id }, body);
		if (!product) {
			return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
		}
		return res
			.status(200)
			.json({ message: 'Cập nhật sản phẩm thành công', product });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

/* delete */
export const deleteProduct = async (req, res) => {
	try {
		const id = req.params.id;
		const product = await Product.findByIdAndDelete({ _id: id });
		if (!product) {
			return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
		}
		return res.status(200).json({ message: 'Xóa sản phẩm thành công' });
	} catch (error) {
		return res.status(500).json({ message: 'Invalid' });
	}
};
