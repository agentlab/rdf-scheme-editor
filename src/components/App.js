import React from 'react'
//import {Col, Row} from "antd";
import {
	Layout, Menu, Breadcrumb
} from 'antd';
import 'antd/dist/antd.css';



const { Header, Content, Sider } = Layout;
const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

const App = () => {
	return (
		<Layout>
			<Header className="header">
				<div className="logo" />
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={['1']}
					style={{ lineHeight: '64px' }}
				>
					<Menu.Item key="1">nav 1</Menu.Item>
					<Menu.Item key="2">nav 2</Menu.Item>
					<Menu.Item key="3">nav 3</Menu.Item>
				</Menu>
			</Header>

			<Layout >
				<Sider width={201}

					style={{
						background: '#fff', overflow: 'auto',
						height: '100%', position: 'fixed'
					}}
				>

					<Menu
						mode="inline"
						defaultSelectedKeys={['14']}
						style={{
							height: '100%', borderRight: 0, width: 200, padding: 0,
						}}
					>
						<MenuItemGroup key="g1" title={<span><b>RDF4J Server</b></span>}
							style={{ background: "#E8EAED" }} >
						</MenuItemGroup>

						<SubMenu key="sub1" title={<span><b>Repositories</b></span>}>
							<Menu.Item key="0">New repository</Menu.Item>
							<Menu.Item key="1">Delete repository</Menu.Item>
						</SubMenu>

						<SubMenu key="sub2" title={<span><b>Explore</b></span>}>
							<Menu.Item key="2">Summary</Menu.Item>
							<Menu.Item key="3">Namespaces</Menu.Item>
							<Menu.Item key="4">Contexts</Menu.Item>
							<Menu.Item key="5">Types</Menu.Item>
							<Menu.Item key="6">Explore</Menu.Item>
							<Menu.Item key="7">Query</Menu.Item>
							<Menu.Item key="8">Saved Queries</Menu.Item>
							<Menu.Item key="9">Export</Menu.Item>
						</SubMenu>

						<SubMenu key="sub3" title={<span><b>Modify</b></span>}>
							<Menu.Item key="10">SPARQL Update</Menu.Item>
							<Menu.Item key="11">Add</Menu.Item>
							<Menu.Item key="12">Remove</Menu.Item>
							<Menu.Item key="13">Clear</Menu.Item>
						</SubMenu>

						<SubMenu key="sub4" title={<span><b>System</b></span>}>
							<Menu.Item key="14">Information</Menu.Item>
						</SubMenu>

					</Menu>
				</Sider>

				<Layout style={{ marginLeft: 200, padding: '0 24px 24px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>

					<Content style={{
						margin: '24px 16px 0', overflow: 'initial'
					}}>
					</Content>

				</Layout>
			</Layout>
		</Layout>
	);
};

export default App