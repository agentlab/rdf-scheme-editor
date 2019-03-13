import { storiesOf } from '@storybook/react';
import React from 'react'
//import {Col, Row} from "antd";
/////
import {
	Layout, Menu, Breadcrumb,Button,Dropdown, Icon,message,Pagination, AutoComplete,Checkbox, Input, Table, Divider, Tag
} from 'antd';

import 'antd/dist/antd.css';



  function handleMenuClick(e) {
	message.info('Click on menu item.');
	console.log('click', e);
  }
 
  function onShowSizeChange(current, pageSize) {
	console.log(current, pageSize);
  }

  function onSelect(value) {
	console.log('onSelect', value);
  }

  function onChange(e) {
	console.log(`checked = ${e.target.checked}`);
  }



const { Header, Content, Sider } = Layout;
const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

const menu2 = (
	<Menu onClick={handleMenuClick}>
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
			<Header className="header">
				<div className="logo" />
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={['1']}
					style={{ lineHeight: '64px'}}
				>
					<Menu.Item key="1">RDF4J</Menu.Item>
					
				</Menu>
			</Header>
            
			<Layout >
            const menu = (
  

				<Sider width={201}

					style={{
                        background: '#fff', overflow: 'auto',
						height: '100%', position: 'absolute'
						
					}}
				>
				

					<Menu
						mode="inline"
						defaultSelectedKeys={['14']}
						style={{
							height: '100%', borderRight: 0, width: 200, padding: 0
						}}
					>
                    
                    
						<MenuItemGroup key="g1" title={<span><b>RDF4J Server</b></span>}
							style={{ background: "#E8EAED",}} >
						</MenuItemGroup>

                        <MenuItemGroup key="g2" title={<span><b>Repositories</b></span>}>

                            <Menu.Item key="1"><span>New repository </span></Menu.Item>
                            <Menu.Item key="2" >Delete repository</Menu.Item>
                            
                        </MenuItemGroup>

						<SubMenu key="sub2" title={<span><b>Explore</b></span>}
                        style={{ background: "#E8EAED" }} >
                        

							<Menu.Item key="3">Summary</Menu.Item>
							<Menu.Item key="4">Namespaces</Menu.Item>
							<Menu.Item key="5">Contexts</Menu.Item>
							<Menu.Item key="6">Types</Menu.Item>
							<Menu.Item key="7">Explore</Menu.Item>
							<Menu.Item key="8">Query</Menu.Item>
							<Menu.Item key="9">Saved Queries</Menu.Item>
							<Menu.Item key="10">Export</Menu.Item>
                            </SubMenu>

						<MenuItemGroup key="g4" title={<span><b>Modify</b></span>}
                        style={{ background: "#E8EAED" }} >
                        </MenuItemGroup>

							<Menu.Item key="11">SPARQL Update</Menu.Item>
							<Menu.Item key="12">Add</Menu.Item>
							<Menu.Item key="13">Remove</Menu.Item>
							<Menu.Item key="14">Clear</Menu.Item>
						

						<MenuItemGroup key="g5" title={<span><b>System</b></span>}
                        style={{ background: "#E8EAED" }} >
					
                        </MenuItemGroup>

							<Menu.Item key="15">Information</Menu.Item>
						
					</Menu>
				</Sider>

				
			



				<Layout style={{ marginLeft: 200, padding: '0 24px 24px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Explore</Breadcrumb.Item>
	
					</Breadcrumb>


					<Checkbox onChange={onChange} >Show data types & language tags</Checkbox>

   




					<Content style={{
						margin: '100px 100px 100px', overflow: 'initial'
					}}>

		


		
        <Input placeholder="Resource" style={{ marginLeft: 7,  right:100, top:-100, bottom:0 }}/>




        <Dropdown overlay={menu2}>
				<Button style={{ marginLeft: 8,  right:100, top:-80, bottom:0 }}>100 <Icon type="down" />
				
							 </Button>
							 
         </Dropdown>




				 

				 


				 <div >
<Button type="primary" style={{ marginLeft: 8,  right:100, top:-60, bottom:0 }}>Previous 100</Button>
<Button type="primary" style={{marginLeft: 8,  right:100, top:-60, bottom:0 }}>Next 100</Button>

	</div>




<Table columns={columns} dataSource={data}   />





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
