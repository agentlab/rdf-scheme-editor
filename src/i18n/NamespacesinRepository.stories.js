import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table, message } from 'antd';
import { Form, Input, Select, Button, Popconfirm } from 'antd';
import { async } from 'q';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = (e) => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = (form) => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={(node) => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div className='editable-cell-value-wrap' style={{ paddingRight: 24 }} onClick={this.toggleEdit}>
        {children}
      </div>
    );
  };

  render() {
    const { editable, dataIndex, title, record, index, handleSave, children, ...restProps } = this.props;
    return (
      <td {...restProps}>
        {editable ? <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer> : children}
      </td>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'prefix',
        dataIndex: 'prefix',
        width: '30%',
        editable: true,
      },
      {
        title: 'namespace',
        dataIndex: 'namespace',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title='Sure to delete?' onConfirm={() => this.handleDelete(record.key)}>
              <a href='javascript:;'>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [
        {
          key: '0',
          prefix: '',
          namespace: '',
        },
        {
          key: '1',
          prefix: '',
          namespace: '',
        },
      ],
      count: 2,
    };
  }

  handleDelete = async (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter((item) => item.key !== key) });
    const it = dataSource.filter((item) => item.key == key);
    console.log(it);
    const delurl =
      'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/namespaces?prefix=' + it[0].prefix + '&namespace=';
    const res1 = await fetch(delurl, {
      method: 'POST',
    });
  };

  async componentDidMount() {
    this.setState({ dataSource: [], count: 0 });
    var dat = [];
    const url = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/namespaces';
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    res.results.bindings.forEach((quer) => {
      const binding = {
        key: quer.prefix.value,
        prefix: quer.prefix.value,
        namespace: quer.namespace.value,
      };
      dat.push(binding);
    });
    this.setState({ dataSource: dat, count: dat.length });
  }

  /*async componentDidUpdate(prevProps) {
    console.log(prevProps);
    const url = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/namespaces?prefix=ololo&namespace=hahaha';
    const res = await fetch(url, {
      method: 'POST',
    }
    );
  }*/

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: dataSource.length,
      prefix: `<empty>`,
      namespace: '<empty>',
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: dataSource.length,
    });
  };

  handleSave = async (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    const delurl =
      'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/namespaces?prefix=' + item.prefix + '&namespace=';
    const res1 = await fetch(delurl, {
      method: 'POST',
    });
    this.setState({ dataSource: newData });
    const url =
      'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/namespaces?prefix=' +
      newData[index].prefix +
      '&namespace=' +
      newData[index].namespace;
    const res = await fetch(url, {
      method: 'POST',
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button onClick={this.handleAdd} type='primary' style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

storiesOf('Namespaces', module).add('prefix', () => <EditableTable />);
