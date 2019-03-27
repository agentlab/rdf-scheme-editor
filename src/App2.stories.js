import { storiesOf } from '@storybook/react';
import React from 'react'
import {
	Layout, Menu, Breadcrumb, Button, Dropdown, Icon, message, Pagination, AutoComplete, Checkbox, Input, Table, Divider, Tag
} from 'antd';
import 'antd/dist/antd.css';

const { Header, Content, Sider } = Layout;
const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

const menu2 = (
	<Menu>
		<Menu.Item key="1"><Icon type="user" />All</Menu.Item>
		<Menu.Item key="2"><Icon type="user" />10</Menu.Item>
		<Menu.Item key="3"><Icon type="user" />50</Menu.Item>
		<Menu.Item key="3"><Icon type="user" />100</Menu.Item>
		<Menu.Item key="3"><Icon type="user" />200</Menu.Item>
	</Menu>
);

const columns = [{
	title: 'Subject',
	dataIndex: 'name',
	key: 'name',
	render: text => <a href="javascript:;">{text}</a>,
}, {
	title: 'Predicate',
	dataIndex: 'age',
	key: 'age',
}, {
	title: 'Object',
	dataIndex: 'address',
	key: 'address',
}, {
	title: 'Context',
	key: 'tags',
	dataIndex: 'tags',
	render: tags => (
		<span>
			{tags.map(tag => {
				let color = tag.length > 5 ? 'geekblue' : 'green';
				if (tag === 'loser') {
					color = 'volcano';
				}
				return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
			})}
		</span>
	),
}];

const data = [{
	key: '1',
	name: '',
	address: '',
	tags: [],
}, {
	key: '2',
	name: '',
	address: '',
	tags: [],
}, {
	key: '',
	name: '',
	address: '',
	tags: [],
}];

class Explore extends React.Component {
	render() {
		return (
			<Layout>
				<Layout >
					<Layout style={{ marginLeft: 200, padding: '0 24px 24px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>Explore</Breadcrumb.Item>
						</Breadcrumb>

						<Checkbox>Show data types & language tags</Checkbox>

						<Content style={{
							margin: '100px 100px 100px', overflow: 'initial'
						}}>

							<Input placeholder="Resource" style={{ marginLeft: 7, right: 100, top: -100, bottom: 0 }} />

							<Dropdown overlay={menu2}>
								<Button style={{ marginLeft: 8, right: 100, top: -80, bottom: 0 }}>100 <Icon type="down" /></Button>
							</Dropdown>

							<div >
								<Button type="primary" style={{ marginLeft: 8, right: 100, top: -60, bottom: 0 }}>Previous 100</Button>
								<Button type="primary" style={{ marginLeft: 8, right: 100, top: -60, bottom: 0 }}>Next 100</Button>
							</div>

							<Table columns={columns} dataSource={data} />

						</Content>
					</Layout>
				</Layout>
			</Layout>
		);
	}
}

storiesOf('Issue #5', module)
	.add('Explore', () => (
		<Explore />
	))