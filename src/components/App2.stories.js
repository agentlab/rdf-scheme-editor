import { storiesOf } from '@storybook/react';
import React from 'react'
import {
	Layout, Menu, Breadcrumb, Button, Dropdown, Icon,  Checkbox, Input, Table
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
  dataIndex: 'name_1',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Predicate',
  dataIndex: 'name_2',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Object',
  dataIndex: 'name_3',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Context',
  dataIndex: 'name_4',
  render: text => <a href="javascript:;">{text}</a>,
}
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
	name_1: `reqs-collection:567Rno8wjrwxiXoozHsFva${i}`,
	name_2: `rdf:type${i}`,
	name_3: `folders:folder1${i}`,
	name_4: `<https://agentlab.ru/expert/rm/expert/reqs-test#>`
  });
}

class Explore extends React.Component {
	render() {
		return (
			<Layout>
				<Layout >
					<Layout style={{ marginLeft: 2, padding: '0 24px 24px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>Explore</Breadcrumb.Item>
						</Breadcrumb>

						<Checkbox style={{clear: "both", margin: '10px 0 '}}>Show data types & language tags</Checkbox>

						<Content style={{
							margin: '1px 1px 1px', overflow: 'initial'
						}}>

							<Input placeholder="Resource" style={{ marginLeft: 7, margin: '10px 0 ', width:'45%'}} />

							<div><Dropdown overlay={menu2}>
								<Button style={{ marginLeft: 8,margin: '10px 0 ' }}>100 <Icon type="down" /></Button>
							</Dropdown></div>

							<div style={{clear: "both", margin: '10px 0 '}}>
								<Button type="primary" >Previous 100</Button>
								<Button type="primary" >Next 100</Button>
							</div>

							<Table columns={columns} dataSource={data} style={{clear: "both", margin: '10px 0 '}}/>
		
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


