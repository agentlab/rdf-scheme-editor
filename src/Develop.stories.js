import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table, Input, Select, Checkbox, Button, Divider } from 'antd';
//import { Z_BLOCK } from 'zlib';

//const Option = Select.Option;
//const { TextArea } = Input;
import { Menu, Icon } from 'antd';
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Develop extends React.Component {
  handleClick = (e) => {
    console.log('click ', e);
  };

  render() {
    return (
      <div>
        <div style={{ width: 256 }}>
          <h3>DPU Templates Tree</h3>
          <Button style={{ width: 256 }}>Create DPU template</Button>
          <div style={{ height: 10 }} />
          <Button style={{ width: 256 }}>Export DPU templates</Button>
          <div style={{ height: 10 }} />
          <Checkbox onChange={onChange}>Only private DPU templates</Checkbox>
          <div style={{ height: 10 }} />
          <Input placeholder='Type to filter tree' />
          <div style={{ height: 10 }} />
        </div>
        <Menu
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode='inline'>
          <SubMenu
            key='sub1'
            title={
              <span>
                <Icon type='folder' />
                <span>Extractors</span>
              </span>
            }>
            <MenuItemGroup key='g1'>
              <SubMenu key='sub2' title='Extractor 1'>
                <Menu.Item key='2'>Option</Menu.Item>
              </SubMenu>
              <SubMenu key='sub3' title='Extractor 2'>
                <Menu.Item key='3'>Option</Menu.Item>
              </SubMenu>
              <SubMenu key='sub4' title='Extractor 3'>
                <Menu.Item key='4'>Option</Menu.Item>
              </SubMenu>
              <SubMenu key='sub5' title='Extractor 4'>
                <Menu.Item key='5'>Option</Menu.Item>
              </SubMenu>
              <SubMenu key='sub6' title='Extractor 5'>
                <Menu.Item key='6'>Option</Menu.Item>
              </SubMenu>
              <SubMenu key='sub7' title='Extractor 6'>
                <Menu.Item key='7'>Option</Menu.Item>
              </SubMenu>
              <SubMenu key='sub8' title='Extractor 7'>
                <Menu.Item key='8'>Option</Menu.Item>
              </SubMenu>
            </MenuItemGroup>
          </SubMenu>
          <SubMenu
            key='sub9'
            title={
              <span>
                <Icon type='folder' />
                <span>Transformers</span>
              </span>
            }>
            <SubMenu key='sub10' title='Transformer 1'>
              <Menu.Item key='9'>Option</Menu.Item>
            </SubMenu>
            <SubMenu key='sub11' title='Transformer 2'>
              <Menu.Item key='10'>Option</Menu.Item>
            </SubMenu>
            <SubMenu key='sub12' title='Transformer 3'>
              <Menu.Item key='11'>Option</Menu.Item>
            </SubMenu>
            <SubMenu key='sub13' title='Transformer 4'>
              <Menu.Item key='12'>Option</Menu.Item>
            </SubMenu>
            <SubMenu key='sub14' title='Transformer 5'>
              <Menu.Item key='13'>Option</Menu.Item>
            </SubMenu>
            <SubMenu key='sub15' title='Transformer 6'>
              <Menu.Item key='14'>Option</Menu.Item>
            </SubMenu>
            <SubMenu key='sub16' title='Transformer 7'>
              <Menu.Item key='15'>Option</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

storiesOf('Unified Views', module).add('Develop', () => <Develop />);
