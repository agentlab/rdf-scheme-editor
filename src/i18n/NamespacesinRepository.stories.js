import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table, message } from 'antd';
import { Form, Input, Select, Button } from 'antd';
import { async } from 'q';

const dataSource = [
  {
    key: '1',
    prefix: 'Mike',
    namespace: 32,
  },
  {
    key: '2',
    prefix: 'John',
    namespace: 42,
  },
];

var dat = [];

const columns = [
  {
    title: 'Prefix',
    dataIndex: 'prefix',
    key: 'prefix',
  },
  {
    title: 'Namespace',
    dataIndex: 'namespace',
    key: 'namespace',
  },
];

const { Option } = Select;

class PrefixInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  handleNumberChange = (e) => {
    const number = parseInt(e.target.value, 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  };

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <span>
        <Input
          type='text'
          size={size}
          value={state.number}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select value={state.currency} size={size} style={{ width: '32%' }} onChange={this.handleCurrencyChange}>
          {dat.map((option, i) => (
            <Option value={option.namespace}>{option.prefix}</Option>
          ))}
        </Select>
      </span>
    );
  }
}

class Demo extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  checkPrefix = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
  };

  async execut() {
    const url = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/namespaces';

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    res.results.bindings.forEach((quer) => {
      const binding = {
        prefix: quer.prefix.value,
        namespace: quer.namespace.value,
      };
      dat.push(binding);
    });

    /*const repositories = res.results.bindings.map((binding) => ({
      key: binding.id.value,
    }));

    repositories.forEach(async (element) => {
      const qu = await fetch(url + '/' + element.key + '/namespaces', {
        method: 'GET',
        headers: {
          Accept: 'application/sparql-results+json',
        },
      }).then((r) => r.json());

      console.log(qu);

      qu.results.bindings.forEach((quer) => {
        const binding = {
          prefix: quer.prefix.value,
          namespace: quer.namespace.value,
        };
        dat.push(binding);
      }); */

    /*  const mapa = chlen.results.bindings.map((binding) => ({
        prefix: binding.prefix.value,
        namespace: binding.namespace.value,
      })); 

      dvachlena.push(mapa); */

    console.log(dat);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout='inline' onSubmit={this.handleSubmit}>
        <Form.Item label='Prefix'>
          {getFieldDecorator('prefix', {
            initialValue: { currency: 'Mike' },
            rules: [{ validator: this.checkPrefix }],
          })(<PrefixInput />)}
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' onClick={this.execut}>
            Update
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Delete
          </Button>
        </Form.Item>
        <Table dataSource={dat} columns={columns} />
      </Form>
    );
  }
}

const WrappedDemo = Form.create({ name: 'customized_form_controls' })(Demo);

storiesOf('Namespaces', module).add('prefix', () => <WrappedDemo />);
