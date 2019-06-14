import { storiesOf } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const server_URL = 'https://agentlab.ru/rdf4j-server';
const repositories_prefix = '/repositories';
const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'URI',
    dataIndex: 'uri',
    key: 'uri',
  },
  {
    title: 'Readable',
    dataIndex: 'readable',
    key: 'readable',
  },
  {
    title: 'Writable',
    dataIndex: 'writable',
    key: 'writable',
  },
];

function RepositoriesTable(props) {
  const [dataSource, setDataSource] = useState([]);

  function selectRequirementsModule(url) {
    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/sparql-results+json',
      },
    })
      .then((data) => data.json())
      .then(
        (data) =>
          data.results.bindings.map((binding) => ({
            key: binding.id.value,
            id: binding.id.value,
            title: binding.title.value,
            uri: binding.uri.value,
            readable: binding.readable.value,
            writable: binding.writable.value,
          })),
        (error) => {
          console.error(error);
        },
      )
      .then((data) => {
        setDataSource(
          data.sort((a, b) => {
            // sort data in alphabetical order
            return a.key > b.key;
          }),
        );
      });
  }

  useEffect(() => {
    selectRequirementsModule(server_URL.concat(repositories_prefix));
  }, []);

  return <Table size='small' bordered pagination={false} dataSource={dataSource} columns={columns} />;
}

storiesOf('Repositories', module).add('List', () => <RepositoriesTable />);
