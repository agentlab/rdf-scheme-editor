import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import { Table, Input, Select, Checkbox } from 'antd';
import { Z_BLOCK } from 'zlib';



const Option = Select.Option;
const { TextArea } = Input;
import { Menu, Icon } from 'antd'; 
function onChange(e) { 
  console.log(`checked = ${e.target.checked}`); 
  } 

const SubMenu = Menu.SubMenu; 
const MenuItemGroup = Menu.ItemGroup; 




class Sider extends React.Component { 
  handleClick = (e) => { 
  console.log('click ', e); 
  } 
  
  render() { 
  return ( 
  <div> 
  <Menu 
  onClick={this.handleClick} 
  style={{ width: 400 }} 
  defaultSelectedKeys={['1']} 
  defaultOpenKeys={['sub1']} 
  mode="inline" 
  > 
  <SubMenu key="sub1" title={<span><Icon type="folder" /><span>Создать требование</span></span>}> 
  <Menu.Item key="1"><Icon type="switcher" /> Веб-сервис</Menu.Item> 
  <Menu.Item key="2"><Icon type="database" /> Классификатор</Menu.Item> 
  <Menu.Item key="3"><Icon type="pie-chart" /> Метаданные</Menu.Item> 
  <Menu.Item key="4"><Icon type="copy" /> Процесс</Menu.Item> 
  <Menu.Item key="5"><Icon type="share-alt" /> Схема процесса</Menu.Item> 
  <SubMenu key="sub2" title={<span><Icon type="hdd" />Форма документа</span>}> 
  <Menu.Item key="7"><Checkbox onChange={onChange}>Использовать создание в один щелчок </Checkbox></Menu.Item> 
  </SubMenu> 
  <Menu.Item key="8"> <Icon type="to-top" />Передать требование</Menu.Item> 
  <Menu.Item key="9"> <Icon type="upload" />Импортировать</Menu.Item> 
  </SubMenu> 
  
  </Menu> 
  </div> 
  ); 
  } 
  } 





storiesOf('Explore', module)
  .add('Query', () => (
   <Sider/>
  ));


