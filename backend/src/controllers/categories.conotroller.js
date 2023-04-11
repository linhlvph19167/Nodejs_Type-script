import Category from '../models/categories.model';
import { categorySchema } from '../validates/categories.validate';

export const createCategory = async (req, res) => {
	try {
		/* validate */
		const { error } = categorySchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		const category = await Category.create(req.body);
		return res.status(201).json(category);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
