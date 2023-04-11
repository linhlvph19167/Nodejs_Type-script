import { Button, Form, Input, message, Typography, Col  } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IProduct } from '../../interfaces/products';
import axios from 'axios';
import { getProduct } from '../../api/products';

const Edit = () => {
	const { id } = useParams();
	const [product, setProduct] = useState<IProduct>();
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm();
	const onFinish = async (values: IProduct) => {
		try {
			const data = {
				...values,
				categoryId: '642c3484ce80f2f8f722005f',
			};
			console.log('🚀 ~ file: Edit.tsx:18 ~ onFinish ~ data:', data);
			const response = await axios.put(
				`http://localhost:8080/api/products/${id}`,
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
				content: 'update faild',
			});
		}
	};
	useEffect(() => {
		const fetchData = async () => {
			if (!id) return;
			try {
				const response = await getProduct(id);
				if (response.data) {
					setProduct(response.data);
				}
			} catch (error) {
				messageApi.open({
					type: 'error',
					content: 'update faild',
				});
			}
		};
		fetchData();
	}, []);
	if (!product) return <div>loading</div>;
	const initialValues = {
		name: product?.name || '',
		price: product?.price || 0,
		image: product?.image || '',
		description: product?.description || '',
	};
	return (
		<>
			{contextHolder}
			<Col span={24}>
					<Typography.Title level={3}>Sửa sản phẩm</Typography.Title>
				</Col>
			<Form
				initialValues={initialValues}
				name="basic"
				autoComplete="off"
				layout="vertical"
				form={form}
				onFinish={onFinish}
			>
				<Form.Item
					label="product name"
					name={'name'}
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

export default Edit;
