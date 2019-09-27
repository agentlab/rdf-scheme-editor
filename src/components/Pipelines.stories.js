import { storiesOf } from '@storybook/react';
import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Form, Input, Radio, Table, Button, Icon } from 'antd';

class PipelineForm extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };
  }
  state = {
    filteredInfo: null,
    sortedInfo: null,
    data: [],
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearSort = () => {
    this.setState({
      sortedInfo: null,
    });
  };

  setRefresh = async () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
      data: await this.getPipelines().then((r) => r.json()),
    });
  };

  createPipelines = async () => {
    let shit = 'https://cors-anywhere.herokuapp.com/';
    let url = 'http://82.202.226.30:8080';
    let prefix = '/master/api/1/pipelines/';

    let username = 'master';
    let password = 'commander';
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    let webData = fetch(shit + url.concat(prefix), {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        name: this.props.form.getFieldValue('name'),
        description: this.props.form.getFieldValue('description'),
        userExternalId: 'admin',
      }),
    });
    return webData;
  };

  getPipelines = () => {
    let shit = 'https://cors-anywhere.herokuapp.com/';
    let url = 'http://82.202.226.30:8080';
    let prefix = '/master/api/1/pipelines/visible?userExternalId=admin';

    let username = 'master';
    let password = 'commander';
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    headers.append('Content-Type', 'application/json');

    let webData = fetch(shit + url.concat(prefix), {
      method: 'GET',
      headers: headers,
    });
    return webData;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
            labelCol: { span: 10 },
            wrapperCol: { span: 14 },
          }
        : null;
    const buttonItemLayout =
      formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 1 },
          }
        : null;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      },
      {
        title: 'Status',
        dataIndex: 'Status',
        key: 'Status',
        render: () => <Icon type='check-circle' theme='twoTone' twoToneColor='#52c41a' />,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => {
          return a.name.localeCompare(b.name);
        },
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => {
          return a.description.localeCompare(b.description);
        },
        sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
      },
      {
        title: 'UserExternalId',
        dataIndex: 'userExternalId',
        key: 'userExternalId',
        sorter: (a, b) => {
          return a.userExternalId.localeCompare(b.userExternalId);
        },
        sortOrder: sortedInfo.columnKey === 'userExternalId' && sortedInfo.order,
      },
    ];
    return (
      <div>
        <Form layout='inline'>
          <Form.Item label='Name' {...formItemLayout}>
            {getFieldDecorator('name')(<Input />)}
          </Form.Item>
          <Form.Item label='Description' {...formItemLayout}>
            {getFieldDecorator('description')(<Input />)}
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type='primary' onClick={this.createPipelines}>
              Create pipeline
            </Button>
          </Form.Item>
        </Form>
        <div className='table-operations'>
          <Button onClick={this.setRefresh} type='primary'>
            Get pipelines
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={this.clearSort} type='primary'>
            Clear sort
          </Button>
        </div>
        <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange} />
      </div>
    );
  }
}

const PipelineApp = Form.create({ name: 'coordinated' })(PipelineForm);

storiesOf('PipelineApp', module).add('PipelineApp', () => <PipelineApp />);
