import joi from 'joi';

export const userValidate = joi.object({
	username: joi.string().required().messages({
		'string.empty': 'username không được để trống',
		'string.required': 'username là trường bắt buộc',
	}),
	email: joi.string().email().required().messages({
		'string.empty': 'email không được để trống',
		'string.required': 'email là trường bắt buộc',
		'string.email': 'nhập đúng định dạng của email',
	}),
	password: joi.string().required().messages({
		'string.empty': 'passwrod không được để trống',
		'string.required': 'passwrod là trường bắt buộc',
	}),
	confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
		'any.only': 'password nhập không trùng',
		'string.empty': 'confirm password không được để trống',
		'any.required': 'confirm password là trường bắt buộc',
	}),
	role: joi.string().valid('admin', 'member').default('member').messages({
		'string.empty': 'role không được để trống',
		'any.only': 'role chỉ được là admin hoặc member',
		'any.required': 'role là trường bắt buộc',
	}),
});

export const userLogin = joi.object({
	email: joi.string().email().required().messages({
		'string.empty': 'email không được để trống',
		'any.required': 'email là trường bắt buộc',
		'string.email': 'nhập đúng định dạng của email',
	}),
	password: joi.string().required().messages({
		'string.empty': 'passwrod không được để trống',
		'any.required': 'passwrod là trường bắt buộc',
	}),
});
