import { storiesOf } from '@storybook/react';
import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Badge, Menu, Icon } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

class HeadMenu extends React.Component {
  state = {};

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu onClick={this.handleClick} theme='dark' selectedKeys={[this.state.current]} mode='horizontal'>
        <Menu.Item key='test'>Test</Menu.Item>
        <Menu.Item key='pipelines'>Pipelines</Menu.Item>
        <Menu.Item key='dpu'>DPU Templates</Menu.Item>
        <Menu.Item key='monitor'>Execution Monitor</Menu.Item>
        <Menu.Item key='scheduler'>Scheduler</Menu.Item>
        <Menu.Item key='setting'>Setting</Menu.Item>
        <Menu.Item key='user'>
          <Icon type='user' />
          User
        </Menu.Item>
        <Menu.Item key='logout'>
          <Icon type='logout' />
          Logout
        </Menu.Item>
        <Icon type='check' />
      </Menu>
    );
  }
}

storiesOf('Head Menu', module).add('Head Menu', () => <HeadMenu />);
