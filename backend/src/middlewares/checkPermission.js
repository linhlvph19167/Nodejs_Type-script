import User from '../models/users.model';
import jwt from 'jsonwebtoken';

export const checkPermission = async (req, res, next) => {
	try {
		/* kiểm tra user có đăng nhập không */
		if (!req.headers.authorization) {
			return res.status(400).json('bạn không có quyền truy cập chức năng này');
		}
		/* lấy jwt token từ header */
		const token = req.headers.authorization.split(' ')[1];
		/* xác thực token */
		jwt.verify(token, '123456789', async (err, payload) => {
			if (err) {
				if (err.name === 'TokenExpiredError') {
					return res.status(400).json({
						message: err.message,
					});
				}
				if (err.name === 'JsonWebTokenError') {
					return res.status(400).json({
						error: err.message,
					});
				}
			}
			/* lấy thông tin từ database */
			const user = await User.findById(payload._id);
			/* kiểm tra user có đủ quyền thực hiện không */
			if (user.role != 'admin') {
				return res
					.status(400)
					.json('bạn không có quyền để thực hiện chức năng này');
			}
			/* gán thông tin user vào req */
			req.user = user;
			next();
		});
	} catch (error) {
		return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
	}
};
