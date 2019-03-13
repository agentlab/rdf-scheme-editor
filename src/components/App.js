import React from 'react'
//import {Col, Row} from "antd";
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';

import ClassTreeView from './ClassTreeView'
import PropertyEditor from './PropertyEditor'

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const App = () => {
	return (
	<Layout>
		<Header className="header">
	      {/* 
	      //  TODO : left side navigation menu 
	      */}
	      <div className="logo" />
	      <Menu
	        mode="horizontal"
	        defaultSelectedKeys={['2']}
	        style={{ lineHeight: '64px' }}
	      >
	        <Menu.Item key="1">nav 1</Menu.Item>
	        <Menu.Item key="2">nav 2</Menu.Item>
	        <Menu.Item key="3">nav 3</Menu.Item>
	      </Menu>
	    </Header>
		<Layout>
			<Sider width={200} 
				   style={{ 
				    background: '#fff',
					overflow: 'auto',
					height: '100vh',
					position: 'fixed'
				   }}>
				<ClassTreeView />
	  	 	</Sider>
		  	<Layout style={{ marginLeft: 300, padding: '0 24px 24px' }}>
		        <Breadcrumb style={{ margin: '16px 0' }}>
		          <Breadcrumb.Item>Home</Breadcrumb.Item>
		          <Breadcrumb.Item>List</Breadcrumb.Item>
		          <Breadcrumb.Item>App</Breadcrumb.Item>
		        </Breadcrumb>
		        <Content style={{
		           margin: '24px 16px 0', 
		           overflow: 'initial'
		        }}
		        >
		  	 		<PropertyEditor />
		 		</Content>
		 	</Layout>
		</Layout>
	</Layout>
	);
};

export default App
