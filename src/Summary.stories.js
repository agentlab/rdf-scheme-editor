
import { storiesOf } from '@storybook/react';
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {
  Form, Input,
} from 'antd';

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
        <Form layout={formLayout}>
        <h1 align="center"> Repository Location </h1>
        

          <Form.Item
            label="ID: "
            {...formItemLayout}
          >
            <Input readOnly defaultValue="reqs" />
          </Form.Item>
          <Form.Item
            label="Title: "
            {...formItemLayout}
          >
            <Input readOnly defaultValue="Requirements" />
          </Form.Item>
          <Form.Item
            label="Location: "
            {...formItemLayout}
          >
            <Input readOnly defaultValue="https://agentlab.ru/rdf4j-server/repositories/reqs" />
          </Form.Item>
          <Form.Item
            label="RDF4J Server: "
            {...formItemLayout}
          >
            <Input readOnly defaultValue="https://agentlab.ru/rdf4j-server" />
          </Form.Item>
          <h1 align="center"> Repository Size </h1>
          <Form.Item
            label="Number of Statements: "
            {...formItemLayout}
          >
            <Input readOnly defaultValue="5672" />
          </Form.Item>
          <Form.Item
            label="Number of Labeled Contexts: "
            {...formItemLayout}
          >
            <Input readOnly defaultValue="10" />
          </Form.Item>
        </Form>
      </div>
    );
  }
}


storiesOf('Lab1', module)
  .add('Summary', () => (
    <FormLayoutDemo />
  ))
          