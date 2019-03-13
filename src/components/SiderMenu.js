import React, { Component } from "react";
import { Layout, Menu } from 'antd';

const Sider = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class SiderMenu extends Component {
    render() {
        return (
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100%', position: 'fixed'
                }}
            >
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['14']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', width: 200 }}
                >
                    <MenuItemGroup key="g1" title={<span><b>RDF4J Server</b></span>}
                        style={{ background: "#C89D4F" }} >
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

                    <MenuItemGroup key="sub4" title={<span><b>System</b></span>}>
                        <Menu.Item key="14">Information</Menu.Item>
                    </MenuItemGroup>

                </Menu>
            </Sider>
        );
    }
}