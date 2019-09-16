import { storiesOf } from '@storybook/react';
import React from 'react';
import { Table, Button } from 'antd';
import 'antd/dist/antd.css';
import '../index.css';

class Events extends React.Component {
  state = {
    data: [],
  };

  addEventsPerID = async () => {
    let id = 1;
    let current_data = await this.connectToServer(id).then((r) => r.json());
    let converted_data = this.makeTabelData(current_data);
    this.setState({
      data: this.state.data.concat(converted_data),
    });
  };

  makeTabelData = (myData) => {
    let data = [];
    for (let i = 0; i < myData.length; i++) {
      data.push({
        type: myData[i].type,
        time: myData[i].time,
        shortMessage: myData[i].shortMessage,
        dpuInstance: myData[i].dpuInstance === null ? null : myData[i].dpuInstance.name,
      });
    }
    return data;
  };

  connectToServer = (id) => {
    let crossAny = 'https://cors-anywhere.herokuapp.com/';
    let url = 'http://82.202.226.30:8080';
    let prefix = '/master/api/1/pipelines/1/executions/' + id + '/events';

    var username = 'master';
    var password = 'commander';
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    headers.append('Content-Type', 'application/json');
    let webData = fetch(crossAny + url.concat(prefix), {
      method: 'GET',
      headers: headers,
    });
    console.log(webData);
    return webData;
  };
  render() {
    const columns = [
      {
        title: 'type',
        dataIndex: 'type',
        key: 'type',
        filters: [
          {
            text: 'i',
            value: 'i',
          },
        ],
        onFilter: (value, record) => record.type.indexOf(value) === 0,
      },
      {
        title: 'Timestamp',
        type: 'datetime-local',
        dataIndex: 'time',
        key: 'time',
        sorter: (a, b) => a.timestamp - b.timestamp,
        sortDirections: ['descend'],
      },
      {
        title: 'DPU Instance',
        dataIndex: 'dpuInstance',
        key: 'dpuInstance',
        filters: [
          {
            text: 'uv-t-filesToRdf',
            value: 'toRdf',
          },
          {
            text: 'uv-e-filesDownload',
            value: 'download',
          },
          {
            text: 'uv-t-unzipper',
            value: 'unzipper',
          },
        ],
        onFilter: (value, record) => record.dpuinstance.indexOf(value) === 0,
      },
      {
        title: 'Short message',
        dataIndex: 'shortMessage',
        key: 'shortMessage',
      },
    ];
    return (
      <div>
        <div className='table-operations'>
          <Button onClick={this.addEventsPerID} type='primary'>
            Event
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={this.state.data}

          // dataSource={data1}
        />
      </div>
    );
  }
}
storiesOf('Events', module).add('Event', () => <Events />);
export default Events;
