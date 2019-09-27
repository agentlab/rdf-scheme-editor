import { storiesOf } from '@storybook/react';
import React from 'react';
import { Menu, Icon, Button, Form, Input, Select } from 'antd';

const { SubMenu } = Menu;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class Types extends React.Component {
  state = {
    forma: <Tq1 />,
  };
  handleSubmit = async (e) => {
    console.log(e);
    if (e.key == '5') {
      this.setState({
        forma: <Tq1 />,
      });
    } else if (e.key == '6') {
      this.setState({
        forma: <Tq2 />,
      });
    } else if (e.key == '7') {
      this.setState({
        forma: <Tq3 />,
      });
    } else if (e.key == '8') {
      this.setState({
        forma: <Tq4 />,
      });
    }
  };
  render() {
    return (
      <div>
        <Properties hanlder={this.handleSubmit} forma={this.state.forma} />
      </div>
    );
  }
}

class Properties extends React.Component {
  render() {
    return (
      <div style={{ marginLeft: '5%' }}>
        <div style={{ minWidth: '15%', float: 'left' }}>
          <Menu defaultSelectedKeys={['5']} mode='inline'>
            <Menu.Item key='5' onClick={this.props.hanlder}>
              Option 5
            </Menu.Item>
            <Menu.Item key='6' onClick={this.props.hanlder}>
              Option 6
            </Menu.Item>
            <Menu.Item key='7' onClick={this.props.hanlder}>
              Option 7
            </Menu.Item>
            <Menu.Item key='8' onClick={this.props.hanlder}>
              Option 8
            </Menu.Item>
          </Menu>
        </div>
        <div style={{ minWidth: '70%', display: 'inline-block' }}>{this.props.forma}</div>
      </div>
    );
  }
}

class Tq1 extends React.Component {
  render() {
    return (
      <div>
        <Form {...formItemLayout}>
          <Form.Item label='Warning' validateStatus='warning'>
            <Input placeholder='Warning' id='warning' />
          </Form.Item>

          <Form.Item
            label='Validating'
            hasFeedback
            validateStatus='validating'
            help='The information is being validated...'>
            <Input placeholder="I'm the content is being validated" id='validating' />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

class Tq2 extends React.Component {
  render() {
    return (
      <div>
        <Form {...formItemLayout}>
          <Form.Item label='Success' hasFeedback validateStatus='success'>
            <Input placeholder="I'm the content" id='success' />
          </Form.Item>

          <Form.Item label='Warning' hasFeedback validateStatus='warning'>
            <Input placeholder='Warning' id='warning2' />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

class Tq3 extends React.Component {
  render() {
    return (
      <div>
        <Form {...formItemLayout}>
          <Form.Item label='Name' hasFeedback validateStatus='warning'>
            <Input placeholder='Username' />
          </Form.Item>
          <Form.Item label='Surname' hasFeedback validateStatus='success'>
            <Input placeholder='Family' />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

class Tq4 extends React.Component {
  render() {
    return (
      <div>
        <Form {...formItemLayout}>
          <Form.Item label='Name' hasFeedback validateStatus='warning'>
            <Input placeholder='Username' />
          </Form.Item>
          <Form.Item label='1' hasFeedback validateStatus='success'>
            <Input placeholder='1' />
          </Form.Item>
          <Form.Item label='2' hasFeedback validateStatus='success'>
            <Input placeholder='2' />
          </Form.Item>
          <Form.Item label='3' hasFeedback validateStatus='success'>
            <Input placeholder='3' />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

storiesOf('Sanakoev', module).add('Properties', () => <Types />);
