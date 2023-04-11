import { Button, Col, Form, Input, Row, message } from 'antd';

import { IUser } from '../../interfaces/users';
import React from 'react';
import { login } from '../../api/users';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const onFinish = async (values: IUser) => {
		try {
			const response = await login(values);
			if (response.data) {
				localStorage.setItem('token', response.data.accessToken);
				messageApi.open({
					type: 'success',
					content: 'success',
				});
				navigate('/admin/products');
			}
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: 'error login',
			});
		}
	};
	return (
		<>
			{contextHolder}
			<Row>
				<Col span={24}>
					<h1 style={{ textAlign: 'center' }}>Login</h1>
				</Col>
				<Col span={24} style={{ padding: '20px' }}>
					<Form
						layout="vertical"
						name="basic"
						style={{ maxWidth: 600, margin: '0 auto' }}
						initialValues={{ remember: true }}
						onFinish={onFinish}
						autoComplete="off"
					>
						<Form.Item
							label="Email"
							name="email"
							rules={[{ required: true, message: 'Please input your email!' }]}
							style={{ width: '100%' }}
						>
							<Input placeholder="email" />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{ required: true, message: 'Please input your password!' },
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
		</>
	);
};

export default Login;
