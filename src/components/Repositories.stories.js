import { storiesOf } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const server_URL = 'https://agentlab.ru/rdf4j-server';
const server_wrong_URL = 'https://agentlab.ru/WRONG-rdf4j-server'; //example
const repositories_prefix = '/repositories';
const url_prefix = 'https://agentlab.ru/rdf4j-workbench';


const RepositoriesTable = (props) => {
  const [dataSource, setDataSource] = useState([]);
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
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => <button onClick={() => deleteClickHandler(record.key)}>Delete</button>
    },
  ]

  const deleteClickHandler = (key) => {
    deleteRepository(key)
    console.log(key)
    alert('ready')
  }

  const deleteRepository = async (repID) => {
    //return fetch(`${url_prefix}/repositories/${repID}/update`, {
    await fetch(`${url_prefix}/repositories/NONE/delete?id=${repID}`, {
      method: 'POST',
      //body: 'update=' + encodeURIComponent('DELETE DATA' + '{' + '<http://exampleSub> <http://exampleSub> 103' + '}'),
    })
  }


  const selectRequirementsModule = (url) => {
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
    selectRequirementsModule(props.props.concat(repositories_prefix));
  }, []);

  return <Table size='small' bordered pagination={false} dataSource={dataSource} columns={columns} />;
}

storiesOf('Repositories', module).add('List', () => <RepositoriesTable props={server_URL} />);
storiesOf('Repositories', module).add('Wrong list', () => <RepositoriesTable props={server_wrong_URL} />);
