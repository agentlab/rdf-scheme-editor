import { storiesOf } from '@storybook/react';
import React from 'react';

import {
  Form, Select, Input, Button, Table, Checkbox
} from 'antd';

const dataSource = [{
}];

const columns = [{
  title: 'Subject',
  dataIndex: 'subject',
  key: 'subject',
}, {
  title: 'Predicate',
  dataIndex: 'predicate',
  key: 'predicate',
}, {
  title: 'Object',
  dataIndex: 'object',
  key: 'object',
}, {
  title: 'Context',
  dataIndex: 'context',
  key: 'context',
}];

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
      const selectItemLayout = formLayout === 'horizontal' ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 2, offset: 3 },
      } : null;
      const buttonItemLayout = formLayout === 'horizontal' ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 5, offset: 3 },
      } : null;
      const tailFormItemLayout = formLayout === 'horizontal' ? {
        labelCol: { span: 7 },
        wrapperCol: { span: 4, offset: 0 },
      } : null;
      return (
        <div>
          <Form layout={formLayout}>
            <Form.Item
              label="Resource: "
              {...formItemLayout}
            >
              <Input placeholder="" />
            </Form.Item>
            <Form.Item
              label="Results per page: "
              {...selectItemLayout}
            >
              <Select defaultValue="1">
                <Option value="1">All</Option>
                <Option value="2">10</Option>
                <Option value="3">50</Option>
                <Option value="4">100</Option>
                <Option value="5">200</Option>
              </Select>
            </Form.Item>
          
            <Form.Item
              label="Results offset: "
              {...buttonItemLayout}
            >
              <Button type="secondary">Previous 0</Button>
              <Button type="secondary">Next 0</Button>
            </Form.Item>
            
            <Form.Item
              label="Show data types & language tags: "
              {...tailFormItemLayout}
            >
              <Checkbox />
            </Form.Item>
          </Form> 
          <Table dataSource={dataSource} columns={columns} />
        </div>
      );
    }
  }
  
  storiesOf('Explore', module)
    .add('Explore', () => ( 
      <FormLayoutDemo />
    ));


