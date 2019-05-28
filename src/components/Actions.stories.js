import { storiesOf } from '@storybook/react';
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Button,Icon } from 'antd';

const data = [
  {
    key: '1',
    Pipeline: 'ZipTest',
    Started: '21.03.2019 12:26:23',
    Duration: '0:00:10',
    Execute: 'admin',
  },
  {
    key: '2',
    Pipeline: 'MultiTest',
    Started: '19.03.2019 14:58:25',
    Duration: '0:00:12',
    Execute: 'admin',
  },
  {
    key: '3',
    Pipeline: 'Test',
    Started: '19.03.2019 14:46:25',
    Duration: '0:00:11',
    Execute: 'admin',
  },
];

class App extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
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
      sortedInfo: null
    });
  };

  setRefresh = () => {
    this.setState({
      
        filteredInfo: null,
        sortedInfo: null,
      
    });
  };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Action',
        dataIndex: 'Action',
        key: 'Action',
      render: () => (
        <div>
         <Button shape="circle" icon="search" />
         <Button  shape="circle" icon="play-circle" />
         <Button  shape="circle" icon="printer"/>
      </div>
        ),
      },
      {
        title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: () => (
       <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
      ),
    },
    {
      title: 'Pipeline',
      dataIndex: 'Pipeline',
      key: 'Pipeline',
    
     },
      {
        title: 'Started',
        type: 'datetime-local',
        dataIndex: 'Started',
        key: 'Started',
        sorter: (a, b) => a.Started - b.Started,
        sortDirections: ['descend'],
      },
      {
        title: 'Duration',
        type: 'time',
        dataIndex: 'Duration',
       key: 'Duration',

    },
    {
      title: 'Debug',
      dataIndex: 'Debug',
     key: 'Debug',
     render: () => (
     <Icon type="eye-invisible" />
     ),
  },
  {
    title: 'Sch.',
    dataIndex: 'Sch.',
   key: 'Sch.',
   render: () => (
    <Icon type="disconnect" />
    ),
},
{
  title: 'Execute',
  dataIndex: 'Execute',
 key: 'Execute',
},
    ];
    return (
      <div>
        <div className="table-operations">
          <Button onClick={this.setRefresh} type="primary">Refresh</Button>
          <Button onClick={this.clearFilters} type="primary">Clear filters</Button>
          <Button onClick={this.clearSort} type="primary">Clear sort</Button>
          
  
        </div>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} />
      </div>
    );
  }
}

storiesOf('Actions', module).add('Actions', () => <ActionForm />);