import { userLogin, userValidate } from '../validates/users.validate';

import User from '../models/users.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/* registers */
export const register = async (req, res) => {
	try {
		const body = req.body;
		/* validate */
		const { error } = userValidate.validate(body, {
			abortEarly: false,
		});
		if (error) {
			const errors = error.details.map((details) => details.message);
			return res.status(400).json({ errors });
		}
		/* find dulicate email */
		const userExists = await User.findOne({ email: body.email });
		if (userExists) {
			return res.status(400).json({
				message: 'User already exists',
			});
		}
		/* hash password */
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(body.password, salt);
		/* create user */
		const userInfo = await User.create({
			username: body.username,
			email: body.email,
			password: hashPassword,
		});
		/* create token */
		const token = jwt.sign({ _id: userInfo._id }, '123456789', {
			expiresIn: '1d',
		});
		const { password, ...other } = userInfo._doc;
		return res
			.status(200)
			.json({ message: 'Đăng ký thành công', accessToken: token, data: other });
	} catch (error) {
		return res.status(500).json({ message: 'Invalid' });
	}
};

/* login */
export const login = async (req, res) => {
	try {
		const body = req.body;
		/* validate user */
		const { error } = userLogin.validate(body);
		if (error) {
			const errors = error.details.map((item) => item.message);
			return res.status(400).json({ errors });
		}
		/* find user on datebase */
		const userInfo = await User.findOne({ email: body.email });
		if (!userInfo) {
			return res.status(404).json({ message: 'User not found' });
		}
		/* compare password */
		const validPassword = await bcrypt.compare(
			body.password,
			userInfo.password
		);
		if (!validPassword) {
			return res.status(404).json({ message: 'Invalid password' });
		}
		/* tạo token mới */
		const token = jwt.sign({ _id: userInfo._id }, '123456789', {
			expiresIn: '1d',
		});
		/* nếu có user & password trùng khớp */
		if (userInfo && validPassword) {
			return res.status(200).json({
				message: 'User successfully loggin',
				accessToken: token,
				data: userInfo,
			});
		}
	} catch (error) {
		return res.status(500).json({ message: 'Invalid login' });
	}
};
