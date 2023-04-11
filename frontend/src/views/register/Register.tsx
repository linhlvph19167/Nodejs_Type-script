import { Button, Col, Form, Input, Row, message } from 'antd';

import { IRegister } from '../../interfaces/users';
import React from 'react';
import { register } from '../../api/users';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate();
	const onFinish = async (values: IRegister) => {
		try {
			const response = await register(values);
			if (response.data) {
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Row>
			<Col span={24}>
				<h1 style={{ textAlign: 'center' }}>Register</h1>
			</Col>
			<Col span={24} style={{ padding: '20px' }}>
				<Form
					layout="vertical"
					name="basic"
					style={{ maxWidth: 600, margin: '0 auto' }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item
						label="Username"
						name="username"
						rules={[{ required: true, message: 'Please input your username!' }]}
						style={{ width: '100%' }}
					>
						<Input placeholder="username" />
					</Form.Item>

					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: 'Please input your email!',
								type: 'email',
							},
						]}
						style={{ width: '100%' }}
					>
						<Input placeholder="email" />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
						style={{ width: '100%' }}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						label="Confirm Password"
						name="confirmPassword"
						rules={[
							{
								required: true,
								message: 'Please input your confirm password!',
							},
						]}
						style={{ width: '100%' }}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							style={{ width: '100%', marginTop: '20px' }}
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
};

export default Register;
