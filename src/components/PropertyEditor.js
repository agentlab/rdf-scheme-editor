import React from "react";
import {Card, Divider, Icon, Table} from "antd";

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:void(0);">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:void(0);">Action 一 {record.name}</a>
      <Divider type="vertical"/>
      <a href="javascript:void(0);">Delete</a>
      <Divider type="vertical"/>
      <a href="javascript:void(0);" className="ant-dropdown-link">
        More actions <Icon type="down"/>
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

const PropertyEditor = () => {
  return (
    <Card title="Simple Table">
      <Table className="gx-table-responsive" columns={columns} dataSource={data}/>
    </Card>
  );
};

export default PropertyEditor;
