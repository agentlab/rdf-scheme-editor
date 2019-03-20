import { storiesOf } from "@storybook/react";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Table } from "antd";

import { executeGet, executeSelect, executeUpdate } from './sparql';

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id',
}, {
  title: 'Title',
  dataIndex: 'title',
  key: 'title',
}, {
  title: 'URI',
  dataIndex: 'uri',
  key: 'uri',
}, {
  title: 'Readable',
  dataIndex: 'readable',
  key: 'readable',
}, {
  title: 'Writable',
  dataIndex: 'writable',
  key: 'writable',
}];


function RepositoriesTable(props) {
  //такой код не работает, тк fetch возвращает не результат, а Promise
  //const dataSource = selectRequirementsModule('https://agentlab.ru/rdf4j-server/repositories');
  //console.log("EXECUTE GET RESULTS=", props.dataSource);

  //React Hooks API
  const [dataSource, setDataSource] = useState([]);

  function selectRequirementsModule(url) {
    console.log("EXECUTE GET URL=", url);
    return executeGet(url)
      .then(res => 
        res.results.bindings.map(binding =>
          ({
            key: binding.id.value,
            id: binding.id.value,
            title: binding.title.value,
            uri: binding.uri.value,
            readable: binding.readable.value,
            writable: binding.writable.value,
          })
        )
      , error => {
        console.error(error);
      }).then(data => {
        console.log("EXECUTE GET RESULTS=", data);
        setDataSource(data);
      });
  }

  // React Hooks API
  useEffect(
    () => {
      selectRequirementsModule('https://agentlab.ru/rdf4j-server/repositories');//http://localhost:8080/rdf4j-server/repositories
    }, []
  );

  return(
    <Table size="small" bordered pagination={false}
      dataSource={dataSource} columns={columns}
    />
  );
}

storiesOf("Repositories", module)
  .add("Info", () =>
    <RepositoriesTable/>
  );