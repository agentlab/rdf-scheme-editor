import React, { useEffect, useState } from "react";
import { storiesOf } from '@storybook/react';
import { Table } from 'antd';
import "antd/dist/antd.css";
import "../index.css";

import { executeGet, executeSelect, executeUpdate } from '../sparql';


const urlTemplate = "https://agentlab.ru/rdf4j-workbench/repositories/reqs/explore?resource=";

function constUrlHref(url, template = urlTemplate) {
  return `${urlTemplate}${url}`;
}

const dataSource = [{
    key: '1',
    context: 'oslc:',
    url: 'oslc%3A'
    }, {
    key: '2',
    context: 'al_rm:',
    url: 'al_rm%3A'
    }, {
    key: '3',
    context: 'oslc_rm:',
    url: 'oslc_rm%3A'
    }, {
    key: '4',
    context: '<https://agentlab.ru/expert/rm/expert/main-reqs#>',
    url: '%3Chttps%3A%2F%2Fagentlab.ru%2Fexpert%2Frm%2Fexpert%2Fmain-reqs%23%3E'
    }, {
    key: '5',
    context: 'expert_reqs:',
    url: 'expert_reqs%3A'
    }, {
    key: '6',
    context: '<http://agentlab.ru/expert/rm/expert/reqs#>',
    url: '%3Chttp%3A%2F%2Fagentlab.ru%2Fexpert%2Frm%2Fexpert%2Freqs%23%3E'
    }, {
    key: '7',
    context: '<https://agentlab.ru/expert/rm/expert/reqs-collection#>',
    url: '%3Chttps%3A%2F%2Fagentlab.ru%2Fexpert%2Frm%2Fexpert%2Freqs-collection%23%3E'
    }, {
    key: '8',
    context: '<https://agentlab.ru/expert/rm/expert/reqs-module#>',
    url: '%3Chttps%3A%2F%2Fagentlab.ru%2Fexpert%2Frm%2Fexpert%2Freqs-module%23%3E'
    }, {
    key: '9',
    context: '<https://agentlab.ru/expert/rm/expert/reqs-module-docx#>',
    url: '%3Chttps%3A%2F%2Fagentlab.ru%2Fexpert%2Frm%2Fexpert%2Freqs-module-docx%23%3E'
    }, {
    key: '10',
    context: '<https://agentlab.ru/expert/rm/expert/reqs-module-docx-big#>',
    url: '%3Chttps%3A%2F%2Fagentlab.ru%2Fexpert%2Frm%2Fexpert%2Freqs-module-docx-big%23%3E'
    }];
  

const columns = [{
    title: 'Context',
    dataIndex: 'context',
    key: 'contextID',
    render: (text, record) => <a href={constUrlHref(record.url)}>{record.prefix}</a>,
  }];


// const columns = [{
//   title: 'Context',
//   dataIndex: 'context',
//   key: 'contextID',
// }];  


function ContextsTable(props) {
  //такой код не работает, тк fetch возвращает не результат, а Promise
  //const dataSource = selectRequirementsModule('https://agentlab.ru/rdf4j-server/repositories');
  console.log("EXECUTE GET RESULTS=", props.dataSource);

  //React Hooks API
  const [dataSource, setDataSource] = useState([]);
  const [namespaceSource, setNamespaceSource] = useState([]);
  console.log(dataSource)

  function selectContextsModule(url) {
    console.log("EXECUTE GET URL=", url);
    executeGet(url+"namespaces")
      .then(res => 
        res.results.bindings.map(binding =>
          ({
            prefix: binding.prefix.value,
            key: binding.namespace.value,
            // readable: binding.readable.value,
            // writable: binding.writable.value,
          })
        )
      , error => {
        console.error(error);
      }).then(data => {
        console.log("EXECUTE GET RESULTS=", data);
        setNamespaceSource(data);
    });
    return executeGet(url+"contexts")
      .then(res => 
        res.results.bindings.map((binding, i) =>
          ({
            key: i,
            url: binding.contextID.value,
            // readable: binding.readable.value,
            // writable: binding.writable.value,
          })
        )
      , error => {
        console.error(error);
      }).then(data => {
        data.map((dat, i) => 
        (
          dat.prefix = namespaceSource[dat.]
        )
        )
        console.log("EXECUTE GET RESULTS=", data);
        setDataSource(data);
      });
  }

  function selectNamespacesModule(url="https://agentlab.ru/rdf4j-workbench/repositories/reqs/namespaces") {
    console.log("EXECUTE GET URL=", url);
    return executeGet(url)
      .then(res => 
        res.results.bindings.map(binding =>
          ({
            prefix: binding.prefix.value,
            url: binding.namespace.value,
            // readable: binding.readable.value,
            // writable: binding.writable.value,
          })
        )
      , error => {
        console.error(error);
      }).then(data => {
        console.log("EXECUTE GET RESULTS=", data);
        setNamespaceSource(data);
      });
  }

  // React Hooks API
  useEffect(
    () => {
      selectContextsModule('https://agentlab.ru/rdf4j-server/repositories/reqs/');//http://localhost:8080/rdf4j-server/repositories
    }, []
  );

  return(
    <Table size="small" bordered pagination={false}
      dataSource={dataSource} columns={columns}
    />
  );
}

storiesOf('Contexts in Repository', module)
  .add('Context', () => (      
    <ContextsTable/>
  ));

