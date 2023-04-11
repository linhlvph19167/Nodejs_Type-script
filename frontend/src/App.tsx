import { Route, Routes } from 'react-router-dom';

import Add from './views/products/Add';
import Dashboard from './views/dashboard/Dashboard';
import Edit from './views/products/Edit';
import LayoutDefault from './layouts/LayoutDefault';
import Login from './views/login/Login';
import Register from './views/register/Register';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route element={<LayoutDefault />}>
				<Route path="/admin/products" element={<Dashboard />} />
				<Route path="/admin/product/add" element={<Add />} />
				<Route path="/admin/product/edit/:id" element={<Edit />} />
			</Route>
		</Routes>
	);
}

export default App;
