import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table } from 'antd';

const urlTemplate = 'https://agentlab.ru/rdf4j-workbench/repositories/reqs/explore?resource=';

function constUrlHref(url, template = urlTemplate) {
  return `${urlTemplate}${url}`;
}

const dataSource = [
  {
    key: '1',
    context: 'oslc:',
    url: 'oslc%3A',
  },
  {
    key: '2',
    context: 'al_rm:',
    url: 'al_rm%3A',
  },
  {
    key: '3',
    context: 'oslc_rm:',
    url: 'oslc_rm%3A',
  },
  {
    key: '4',
    context: '<https://agentlab.ru/expert/rm/expert/main-reqs#>',
    url: '%3Chttps%3A%2F%2Fagentlab.ru%2Fexpert%2Frm%2Fexpert%2Fmain-reqs%23%3E',
  },
  {
    key: '5',
    context: 'expert_reqs:',
    url: 'expert_reqs%3A',
  },
  {
    key: '6',
    context: '<http://agentlab.ru/expert/rm/expert/reqs#>',
    url: '%3Chttp%3A%2F%2Fagentlab.ru%2Fexpert%2Frm%2Fexpert%2Freqs%23%3E',
  },
  {
    key: '7',
    context: '<https://agentlab.ru/expert/rm/expert/reqs-collection#>',
    url: '%3Chttps%3A%2F%2Fagentlab.ru%2Fexpert%2Frm%2Fexpert%2Freqs-collection%23%3E',
  },
  {
    key: '8',
    context: '<https://agentlab.ru/expert/rm/expert/reqs-module#>',
    url: '%3Chttps%3A%2F%2Fagentlab.ru%2Fexpert%2Frm%2Fexpert%2Freqs-module%23%3E',
  },
  {
    key: '9',
    context: '<https://agentlab.ru/expert/rm/expert/reqs-module-docx#>',
    url: '%3Chttps%3A%2F%2Fagentlab.ru%2Fexpert%2Frm%2Fexpert%2Freqs-module-docx%23%3E',
  },
  {
    key: '10',
    context: '<https://agentlab.ru/expert/rm/expert/reqs-module-docx-big#>',
    url: '%3Chttps%3A%2F%2Fagentlab.ru%2Fexpert%2Frm%2Fexpert%2Freqs-module-docx-big%23%3E',
  },
];

const columns = [
  {
    title: 'Context',
    dataIndex: 'context',
    key: 'context',
    render: (text, record) => <a href={constUrlHref(record.url)}>{record.context}</a>,
  },
];

storiesOf('Contexts in Repository', module).add('Context', () => <Table dataSource={dataSource} columns={columns} />);
