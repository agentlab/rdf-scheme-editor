import { storiesOf } from '@storybook/react';
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Table, Icon, Radio, Layout, List, Typography } from 'antd';

class Sider extends React.Component {
  handleClick = (e) => {
    console.log('click ', e);
  };
}

class FormLayoutDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };
  }

  handleFormLayoutChange = (e) => {
    this.setState({ formLayout: e.target.value });
  };

  render() {
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : null;

    const RadioGroup = Radio.Group;
    const { Header, Footer, Sider, Content } = Layout;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const columns = [
      {
        title: 'Операция',
        dataIndex: 'operation',
        key: 'operation',
      },
      {
        title: 'Доступ',
        dataIndex: 'permission',
        key: 'permission',
        render: (permission) => {
          if (permission == 'minus') {
            return (
              <a href='javascript:;'>
                <Icon type='minus-circle' theme='filled' />
              </a>
            );
          } else
            return (
              <a href='javascript:;'>
                <Icon type='check-circle' theme='filled' />
              </a>
            );
        },
      },
      {
        title: 'Действия',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href='javascript:;'>
              <Icon type='edit' />
            </a>
            <a href='javascript:;'>
              <Icon type='form' />
            </a>
          </span>
        ),
      },
    ];

    const data1 = [
      <a href='javascript:;'>Любой пользователь (default)</a>,
      <a href='javascript:;'>Администратор</a>,
      <a href='javascript:;'>Автор</a>,
      <a href='javascript:;'>Комментатор</a>,
      <a href='javascript:;'>Администратор моментальных копий проекта</a>,
    ];

    const data2 = [
      {
        key: '1',
        operation: 'Показать отчет',
        permission: 'minus',
        description: ' ',
      },
      {
        key: '2',
        operation: 'Развернуть отчет',
        permission: 'minus',
        description: ' ',
      },
      {
        key: '3',
        operation: 'Развернуть ресурс отчета',
        permission: 'minus',
        description: ' ',
      },
      {
        key: '4',
        operation: 'Управлять папкой отчетов',
        permission: 'minus',
        description: ' ',
      },
      {
        key: '5',
        operation: 'Сгенерировать приглашение в коллектив',
        description: ' ',
      },
      {
        key: '6',
        operation: 'Сохранить область',
        description: ' ',
      },
      {
        key: '7',
        operation: 'Сохранить область проекта',
        description: ' ',
      },
      {
        key: '8',
        operation: 'Изменить блокировки',
        description: ' ',
      },
    ];

    return (
      <div>
        <Layout>
          <Header style={{ padding: '0 10px', background: '#fff' }}>
            <h1>Права доступа</h1>
          </Header>
          <RadioGroup
            onChange={this.onChange}
            value={this.state.value}
            style={{ padding: '0 10px', background: '#fff' }}>
            <Radio style={radioStyle} value={1}>
              Показать <b>по ролям</b>
            </Radio>
            <Radio style={radioStyle} value={2}>
              Показать <b>по операциям</b>
            </Radio>
          </RadioGroup>
          <Layout>
            <Sider onClick={this.handleClick} width={400} style={{ padding: '0 10px', background: '#fff' }}>
              <h4>Выберите роль:</h4>
              <List size='small' dataSource={data1} bordered renderItem={(item) => <List.Item>{item}</List.Item>} />
            </Sider>

            <Content style={{ background: '#fff' }}>
              <h4>Права доступа для роли Администратор:</h4>
              <Table
                size='small'
                columns={columns}
                expandedRowRender={(record) => <p style={{ margin: 0 }}>{record.description}</p>}
                dataSource={data2}
                bordered
              />
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </div>
    );
  }
}

storiesOf('Form', module).add('RolesPermissions', () => <FormLayoutDemo />);
