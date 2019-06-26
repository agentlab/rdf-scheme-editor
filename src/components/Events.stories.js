import { storiesOf } from '@storybook/react';
import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';

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
    dataIndex: 'timestamp',
    key: 'timestamp',
    sorter: (a, b) => a.timestamp - b.timestamp,
    sortDirections: ['descend'],
  },
  {
    title: 'DPU Instance',
    dataIndex: 'dpuinstance',
    key: 'dpuinstance',
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
    title: 'Short messege',
    dataIndex: 'shortmessege',
    key: 'shortmessege',
  },
];

const data = [
  {
    type: 'i',
    timestamp: '21.03.2019 12:26:23',
    dpuinstance: 'uv-e-filesDownload',
    shortmessege: "Starting DPU developer's code for DPU: 18",
  },
  {
    type: 'i',
    timestamp: '21.03.2019 12:26:25',
    dpuinstance: 'uv-t-unzipper',
    shortmessege: 'DPU: 14 completed',
  },
  {
    type: 'i',
    timestamp: '21.03.2019 12:26:25',
    dpuinstance: 'uv-t-filesToRdf',
    shortmessege: 'Starting FilesToRdf',
  },
];

class EventForm extends React.Component {
  render() {
    return <div>Спасите меня, я не работаю!!!</div>;
  }
}

storiesOf('Events', module).add('Events', () => <EventForm />);
