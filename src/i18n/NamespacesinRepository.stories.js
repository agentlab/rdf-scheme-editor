import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table, message } from 'antd';
import { Form, Input, Select, Button, Popconfirm } from 'antd';
import { async } from 'q';

const EditableContext = React.createContext();

var data = [];

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
    this.execut();
    this.columns = [
      {
        title: 'prefix',
        dataIndex: 'prefix',
        width: '30%',
        editable: true,
      },
      {
        title: 'Namespace',
        dataIndex: 'Namespace',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          data.length >= 1 ? (
            <Popconfirm title='Sure to delete?' onConfirm={() => this.handleDelete(record.key)}>
              <a href='javascript:;'>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
  }

  async execut() {
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
      data = dat;
    });
  }

  handleDelete = (key) => {
    const dataSource = [...data];
    data = dataSource.filter((item) => item.key !== key);
  };

  handleAdd = () => {
    const newData = {
      key: data.length,
      prefix: `Edward King ${data.length}`,
      Namespace: 32,
    };
    data.push(newData);
    console.log(data);
    this.render();
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
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
          dataSource={data}
          columns={columns}
        />
      </div>
    );
  }
}

storiesOf('Namespaces', module).add('prefix', () => <EditableTable />);
