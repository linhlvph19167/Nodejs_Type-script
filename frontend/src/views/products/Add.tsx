import { Button, Form, Input, message, Typography, Col  } from 'antd';

import { IProduct } from '../../interfaces/products';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add: React.FC = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const onFinish = async (values: IProduct) => {
		try {
			const data = { ...values, categoryId: '642c3484ce80f2f8f722005f' };
			const token = localStorage.getItem('token');
			console.log('🚀 ~ file: Add.tsx:15 ~ onFinish ~ token:', token);
			/* theem san pham */
			const response = await axios.post(
				`http://localhost:8080/api/products`,
				data,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			if (response.data) {
				messageApi.open({
					type: 'success',
					content: 'success',
				});
				navigate('/admin/products');
			}
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: 'create faild',
			});
		}
	};
	return (
		<>
			{contextHolder}
			<Col span={24}>
					<Typography.Title level={3}>Thêm sản phẩm</Typography.Title>
				</Col>
			<Form
				name="basic"
				autoComplete="off"
				layout="vertical"
				onFinish={onFinish}
			>
				<Form.Item
					label="product name"
					name="name"
					rules={[
						{ required: true, message: 'Please input your product name!' },
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="price"
					name="price"
					rules={[
						{
							required: true,
							message: 'Please input your price!',
						},
					]}
				>
					<Input type="number" />
				</Form.Item>

				<Form.Item
					label="image"
					name="image"
					rules={[
						{
							required: true,
							message: 'Please input your image!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="description"
					name="description"
					rules={[
						{
							required: true,
							message: 'Please input your description!',
						},
					]}
				>
					<Input />
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
		</>
	);
};

export default Add;
