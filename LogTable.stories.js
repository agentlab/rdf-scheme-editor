import { storiesOf } from '@storybook/react';
import React from 'react';
import 'antd/dist/antd.css';
import { Input, Table, Icon, Layout, } from 'antd';

class Sider extends React.Component {
  handleClick = (e) => {
    console.log('click ', e);
  };
}

class LogTable extends React.Component {
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
    
    const { Content } = Layout;


    const columns = [
      {
        title: 'TYPE',
        dataIndex: 'type',
        key: 'type',
        width: 80,
      },
      {
        title: 'TIMESTAMP',
        dataIndex: 'timestamp',
        key: 'timestamp',
        width: 250,
      },
      {
        title: 'DPU INSTANSE',
        key: 'dpu',
        dataIndex: 'dpu',
        width: 210,
      },
      {
        title: 'MESSAGE',
        dataIndex: 'message',
        key: 'message',
      },
    ];


    const data = [
      {
        key: '1',
        type: <select name="" style={{ width: '100%' }} >
        <option value="all">ALL</option>
        <option value="error">ERROR+</option>
        <option value="warn">WARN+</option>
        <option value="info">INFO+</option>
        <option value="debug">DEBUG+</option>
        <option value="trace">TRACE+</option>
        </select>,
        timestamp: <select name="" style={{ width: '100%' }} >
        <option value="all"></option>
        </select>,
        dpu: <select name="" style={{ width: '100%' }}>
        <option value="all"></option>
        </select>,
        message: <Input style={{ width: '100%' }} />,
      },
      {
        key: '2',
        type: <Icon type="close-circle" theme="twoTone" twoToneColor="#eb2f96" />,
        timestamp: 'Aug 4, 2019 12:00:00',
        dpu: 'SPARQL EXTRACTOR',
        message: 'Message ',
      },
    ];

    return (
      <div>
        <Layout>
            <Content style={{ background: '#fff' }}>
              <Table
                size='middle'
                columns={columns}
                dataSource={data}
                bordered
              />
            </Content>
          </Layout>
      </div>
    );
  }
}

storiesOf('Log', module).add('Table', () => <LogTable />);
