
import { storiesOf } from '@storybook/react';
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Menu, Icon, Checkbox } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
function onChange(e) {
		console.log(`checked = ${e.target.checked}`);
}
class FormLayoutDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };

  }

  
  render() {
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    } : null;

    return (
      <div>
       <Menu
        
        style={{ width: 400 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline">
      
        <SubMenu key="sub1" title={<span><Icon type="file-done" /><span>Создать требование</span></span>}>
          <Menu.Item key="1"><Icon type="layout" />Веб-сервис</Menu.Item>
          <Menu.Item key="2"><Icon type="profile" />Классификатор</Menu.Item>
		  <Menu.Item key="3"><Icon type="appstore" />Метаданные</Menu.Item>
		  <Menu.Item key="4"><Icon type="line-chart" />Процесс</Menu.Item>
		  <Menu.Item key="5"><Icon type="cluster" />Схема процесса</Menu.Item>
          <SubMenu key="sub2" title={<span><Icon type="file-text" /><span>Форма документа</span></span>}>
            <Menu.Item key="7">
			<Checkbox onChange={onChange}>Использовать создание в один щелчок </Checkbox></Menu.Item>
         </SubMenu>
		 <Menu.Item key="8"><Icon type="solution" />Передать требование</Menu.Item>
		 <Menu.Item key="9"><Icon type="export" />Импортировать</Menu.Item>
		</SubMenu>
       </Menu>

  
      </div>
    );
  }
}


storiesOf('Create', module)
  .add('Artifact', () => (
    <FormLayoutDemo />
  ))
          