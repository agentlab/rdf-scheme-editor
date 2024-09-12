import { storiesOf } from '@storybook/react';
import React from 'react';
import { Form, Input } from 'antd';

class FormLayoutDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };
  }
  handleExecute = async () => {
    const url = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/summary';
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/sparql-results+json',
      },
    })
      .then((r) => r.json())
      .catch((ex) => console.error(ex));

    this.setState({ bindings: res.results.bindings });
    console.log(this.state);
  };

  render() {
    this.handleExecute();
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : null;

    return (
      <div>
        <Form layout={formLayout}>
          <h1 align='center'> Repository Location </h1>

          <Form.Item label='ID: ' {...formItemLayout}>
            <Input readOnly defaultValue='reqs' />
          </Form.Item>
          <Form.Item label='Title: ' {...formItemLayout}>
            <Input readOnly defaultValue='Requirements' />
          </Form.Item>
          <Form.Item label='Location: ' {...formItemLayout}>
            <Input readOnly defaultValue='https://agentlab.ru/rdf4j-server/repositories/reqs' />
          </Form.Item>
          <Form.Item label='RDF4J Server: ' {...formItemLayout}>
            <Input readOnly defaultValue='https://agentlab.ru/rdf4j-server' />
          </Form.Item>
          <h1 align='center'> Repository Size </h1>
          <Form.Item label='Number of Statements: ' {...formItemLayout}>
            <Input readOnly defaultValue='5672' />
          </Form.Item>
          <Form.Item label='Number of Labeled Contexts: ' {...formItemLayout}>
            <Input readOnly defaultValue='10' />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

storiesOf('Lab1', module).add('Summary', () => <FormLayoutDemo />);
