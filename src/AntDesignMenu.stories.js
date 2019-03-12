import { storiesOf } from '@storybook/react';
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Menu, Icon } from 'antd';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Sider extends React.Component {
  handleClick = (e) => {
    console.log('click ', e);
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span><a href ="https://agentlab.ru/rdf4j-workbench/repositories/NONE/server">RDF4J Server</a></span></span>}>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span><a href ="https://agentlab.ru/rdf4j-workbench/repositories/NONE/repositories">Repositories</a></span></span>}>
          <Menu.Item key="1"><a href="https://agentlab.ru/rdf4j-workbench/repositories/NONE/create">New repository</a></Menu.Item>
          <Menu.Item key="2"><a href="https://agentlab.ru/rdf4j-workbench/repositories/NONE/delete">Delete repository</a></Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={<span><Icon type="setting" /><span>Explore</span></span>}>
          <Menu.Item key="3">Summary</Menu.Item>
          <Menu.Item key="4">Namespaces</Menu.Item>
          <Menu.Item key="5">Contexts</Menu.Item>
		  <Menu.Item key="6">Types</Menu.Item>
          <Menu.Item key="7">Explore</Menu.Item>
		  <Menu.Item key="8">Query</Menu.Item>
		  <Menu.Item key="9">Saved Quries</Menu.Item>
		  <Menu.Item key="10">Export</Menu.Item>
        </SubMenu>
		<SubMenu key="sub4" title={<span><Icon type="setting" /><span>Modify</span></span>}>
          <Menu.Item key="11">SPARQL Update</Menu.Item>
          <Menu.Item key="12">Add</Menu.Item>
          <Menu.Item key="13">Remove</Menu.Item>
		  <Menu.Item key="14">Clear</Menu.Item>
        </SubMenu>
		<SubMenu key="sub5" title={<span><Icon type="setting" /><span>System</span></span>}>
          <Menu.Item key="15"><a href="https://agentlab.ru/rdf4j-workbench/repositories/NONE/information">Information</a></Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}


storiesOf('Lab1', module)
  .add('Menu', () => (
    <Sider />
  ))
          