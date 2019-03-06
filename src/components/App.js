
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Menu } from 'antd'; //here Icon can be imported;

//const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends Component {
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
        <MenuItemGroup key="g1" title="RDF4J Server">
        </MenuItemGroup>
          <MenuItemGroup key="g1" title="Repositories">
            <Menu.Item key="1">New repository </Menu.Item>
            <Menu.Item key="2">Delete repository</Menu.Item>
          </MenuItemGroup>

          <MenuItemGroup key="g2" title="Explore">
            <Menu.Item key="3">Summery</Menu.Item>
            <Menu.Item key="4">Namespace</Menu.Item>
            <Menu.Item key="5">Contexts</Menu.Item>
            <Menu.Item key="6">Types</Menu.Item>
            <Menu.Item key="7">Explore</Menu.Item>
            <Menu.Item key="8">Query</Menu.Item>
            <Menu.Item key="9">Saved Querles</Menu.Item>
            <Menu.Item key="10">Export</Menu.Item>
          </MenuItemGroup>
       
        <MenuItemGroup key="g2" title="Modify">
          <Menu.Item key="11">SPARQL Update</Menu.Item>
          <Menu.Item key="12">Add</Menu.Item>
          <Menu.Item key="13">Remove</Menu.Item>
          <Menu.Item key="14">Clear</Menu.Item>
        </MenuItemGroup>

        <MenuItemGroup key="g2" title="Information">
            <Menu.Item key="15">Information</Menu.Item>
        </MenuItemGroup>
       

      </Menu>
    );
  }
}

export default App;

