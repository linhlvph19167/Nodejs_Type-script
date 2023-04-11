import {
	Button,
	Col,
	Image,
	Row,
	Space,
	Table,
	Typography,
	message,
	Input, 
	List 
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ColumnsType } from 'antd/es/table';
import { IProduct } from '../../interfaces/products';
import axios from 'axios';
import { getProducts } from '../../api/products';


// const [form] = Form.useForm();
//     const onFinish = (values: any) => {
//         const Products = prop.products;
//         const searchProduct = Products.filter(pro => pro.name.toLocaleLowerCase().includes(values.name.toLocaleLowerCase()));
//         if (searchProduct.length == 0) {
//             alert(`There are no products with the name - ${values.name} `);
//         }
//         else {
//             setData(searchProduct);
//         }
//     };
const Dashboard: React.FC = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const columns: ColumnsType<IProduct> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: 'Image',
			dataIndex: 'Image',
			key: 'Image',
			render: (_, record: IProduct) => (
				<Image
					src={record.image}
					alt="image"
					style={{ height: '150px', width: '150px', objectFit: 'cover' }}
				/>
			),
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Link to={`/admin/product/edit/${record._id}`}>
						<Button type="primary">
							Sửa
						</Button>
					</Link>
					<Button danger onClick={() => handleDelete(record._id)}>
						Xóa
					</Button>
				</Space>
			),
		},
	];
	const [products, setProducts] = useState<IProduct[]>([]);
	const handleDelete = async (id: string) => {
		setProducts(products.filter((product) => product._id !== id));
		try {
			const response = await axios.delete(
				`http://localhost:8080/api/products/${id}`,
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
				content: 'edit faild',
			});
		}
	};
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await getProducts();
				if (response.status === 200) {
					setProducts(
						response.data.map((product: IProduct) => ({
							...product,
							key: product._id,
						}))
					);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchProducts();
	}, []);
	return (
		<>
			{contextHolder}
			
			<Row>
				<Col span={24}>
					<Typography.Title level={3}>Quản lý sản phẩm</Typography.Title>
				</Col>
				<Col span={24}>
					<Link to="/admin/product/add">
						<Button type="primary">
							<PlusOutlined />
							Thêm mới
						</Button>
					</Link>
				</Col>
				<Col span={24} style={{ marginTop: '20px' }}>
					<Table columns={columns} dataSource={products} />
				</Col>
			{/* <Form
                    {...Layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{ maxWidth: 110, display: "flex", marginBottom: "30px" }}
                >
                    <Form.Item name="name" rules={[{ required: true }]}>
                        <Input placeholder="Search name " />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: "-60px" }}>
                            <SearchOutlined />
                        </Button>
                    </Form.Item>
                </Form> */}
			</Row>
		</>
	);
};

export default Dashboard;
