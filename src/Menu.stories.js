import { storiesOf } from "@storybook/react";
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LockedLayout extends React.Component {
    constructor() {
      super();
      this.state = {
        formLayout: "horizontal"
      };
    }

    handleFormLayoutChange = e => {
      this.setState({ formLayout: e.target.value });
    };

  render() {
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    } : null;

    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="1">
          RDF4J Server
        </Menu.Item>

        <SubMenu key="sub1" title="Repositories" >

          <Menu.Item key="2">New repository</Menu.Item>
          <Menu.Item key="3">Delete repository</Menu.Item>

        </SubMenu>

        <SubMenu key="sub2" title="Explore">
          <Menu.Item key="4" >Summary</Menu.Item>
          <Menu.Item key="5" >Namespaces</Menu.Item>
          <Menu.Item key="6">Contexts</Menu.Item>
          <Menu.Item key="7">Types</Menu.Item>
          <Menu.Item key="8">Explore</Menu.Item>
          <Menu.Item key="9">Query</Menu.Item>
          <Menu.Item key="10">Saved Queries</Menu.Item>
          <Menu.Item key="11">Export</Menu.Item>
        </SubMenu>

        <SubMenu key="sub3" title="Modify">
          <Menu.Item key="12">SPARQL Update</Menu.Item>
          <Menu.Item key="13">Add</Menu.Item>
          <Menu.Item key="14">Remove</Menu.Item>
          <Menu.Item key="15">Clear</Menu.Item>
        </SubMenu>

        <SubMenu key="sub4" title="System">
          <Menu.Item key="16">Information</Menu.Item>
        </SubMenu>

      </Menu>
    );
  }
}

storiesOf("Menu", module).add("info", () => <LockedLayout />); 