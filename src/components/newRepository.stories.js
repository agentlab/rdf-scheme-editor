import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Select, Row, Col, Input, Button, Typography } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

class NewRepository extends React.Component {
  handleSubmit = async () => {
    const paramType = 'type=' + this.props.form.getFieldValue('type');
    const paramID = '&Repository+ID=' + this.props.form.getFieldValue('id');
    const paramTitle = '&Repository+title=' + this.props.form.getFieldValue('title');
    const per =
      '&Persist=true&Sync+delay=0&EvaluationStrategyFactory=org.eclipse.rdf4j.query.algebra.evaluation.impl.StrictEvaluationStrategyFactory';
    const predata = paramType + paramID + paramTitle + per;
    const url = 'https://agentlab.ru/rdf4j-workbench/repositories/NONE/create';
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: predata,
    }).then((r) => {
      return r;
    });
  };

  handleReset = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form labelCol={{ span: 2 }} wrapperCol={{ span: 7 }}>
        <Form.Item label='Type'>
          {getFieldDecorator('type')(
            <Select>
              <Option value='memory'>Memory Store</Option>
              <Option value='memory-lucene'>Memory Store + Lucene</Option>
              <Option value='memory-rdfs'>Memory Store + RDFS</Option>
              <Option value='memory-rdfs-dt'>Memory Store + RDFS and Direct Type</Option>
              <Option value='memory-customrule'>Memory Store + Custom Graph Query Inference</Option>
              <Option value='memory-spin'>Memory Store + SPIN support</Option>
              <Option value='memory-spin-rdfs'>Memory Store + RDFS and SPIN support</Option>
              <Option value='native'>Native Store</Option>
              <Option value='native-lucene'>Native Store + Lucene</Option>
              <Option value='native-rdfs'>Native Store + RDFS</Option>
              <Option value='native-rdfs-dt'>Native Store + RDFS and Direct Type</Option>
              <Option value='memory-rdfs-lucene'>Native Store + RDFS and Lucene</Option>
              <Option value='native-customrule'>Native Store + Custom Graph Query Inference</Option>
              <Option value='native-spin'>Native Store + SPIN support</Option>
              <Option value='native-spin-rdfs'>Native Store + RDFS and SPIN support</Option>
              <Option value='remote'>Remote RDF Store</Option>
              <Option value='sparql'>SPARQL endpoint proxy</Option>
              <Option value='federate'>Federation Store</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label='ID'>{getFieldDecorator('id')(<Input />)}</Form.Item>
        <Form.Item label='Title'>{getFieldDecorator('title')(<Input />)}</Form.Item>
        <Form.Item wrapperCol={{ span: 15, offset: 2 }}>
          <Button onClick={this.handleSubmit} type='primary' htmlType='submit'>
            Submit
          </Button>

          <Button style={{ marginLeft: 8 }} onClick={this.handleReset} type='primary' htmlType='submit'>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedApp = Form.create({ name: 'coordinated' })(NewRepository);

storiesOf('Form', module).add('New Repository Form', () => <WrappedApp />);
