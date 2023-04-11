import {
	AppstoreOutlined,
	MailOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group'
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const items: MenuProps['items'] = [
	getItem('Sản phẩm', '1', <AppstoreOutlined />, [
		getItem(<Link to="/admin/products">Quản lý sản phẩm</Link>, '2'),
		getItem(<Link to="/admin/product/add">Thêm sản phẩm</Link>, '3'),
	]),
];

const LayoutDefault: React.FC = () => {
	const navigate = useNavigate();
	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/');
		}
	}, []);

	return (
		<Layout>
			<Layout.Sider
				style={{ width: '260px', minHeight: '100vh', background: 'white' }}
			>
				<Menu
					onClick={onClick}
					defaultSelectedKeys={['1']}
					defaultOpenKeys={['1']}
					mode="inline"
					theme="light"
					items={items}
				/>
			</Layout.Sider>
			<Layout.Content style={{ padding: '24px' }}>
				<Outlet />
			</Layout.Content>
		</Layout>
	);
};

export default LayoutDefault;
