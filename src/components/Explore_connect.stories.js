import { storiesOf } from '@storybook/react';
import React from 'react';
import { Layout, Breadcrumb, Button, Checkbox, Input, Table, Select } from 'antd';
import 'antd/dist/antd.css';

const Option = Select.Option;
const { TextArea } = Input;

const { Content } = Layout;

const dataSource = [{}];
const columns = [
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Predicate',
    dataIndex: 'predicate',
    key: 'predicate',
  },
  {
    title: 'Object',
    dataIndex: 'object',
    key: 'object',
  },
  {
    title: 'Context',
    dataIndex: 'context',
    key: 'context',
  },
];

export default class Explore extends React.Component {
  //TUT
  state = {
    resultPerPage: 0,
    result: '',
  };
  resource = '';

  //TUT
  handleResultsChange = (e) => {
    this.state.resultPerPage = e;
    console.log(this.state.resultPerPage);
  };

  //TUT
  handleQueryChange = (e) => {
    this.resource = e.target.value;
    console.log(this.resource);
  };

  //TUT  <http://www.example.org/schemas/relationship/fatherOf>
  handleExecute = async () => {
    if (!(this.query === '')) {
      const q = encodeURIComponent(this.query) + this.state.resultPerPage;
      console.log('query', q);
      const url = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/explore?resource=';
      const lan =
        '%3Chttp%3A%2F%2Fwww.example.org%2Fschemas%2Frelationship%2FfatherOf%3E&limit_explore=' +
        this.state.resultPerPage +
        '&show-datatypes=show-dataypes&know_total=3&query=&ref=';
      const res = await fetch(url + lan, {
        method: 'GET',
        headers: {
          Accept: 'application/sparql-results+json',
        },
      }).then((r) => r.json());

      console.log(res);
      var resultsToDisplay = [];
      if (this.state.resultPerPage != 0) resultsToDisplay = res.results.bindings.slice(0, this.state.resultPerPage);
      else resultsToDisplay = res.results.bindings;
      console.log(resultsToDisplay);
      this.state.result = JSON.stringify(resultsToDisplay);

      console.log(this.state.result);
      alert(this.state.result);
    }
  };

  render() {
    return (
      <Layout>
        <Layout>
          <Layout style={{ marginLeft: 2, padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Explore</Breadcrumb.Item>
            </Breadcrumb>

            <Checkbox style={{ clear: 'both', margin: '10px 0 ' }}>Show data types & language tags</Checkbox>

            <Content
              style={{
                margin: '1px 1px 1px',
                overflow: 'initial',
              }}>
              <Input
                onChange={this.handleResultsChange}
                placeholder='Resource'
                style={{ marginLeft: 7, margin: '10px 0 ', width: '45%' }}
              />

              <tr>
                <th>
                  <h1>Result per page</h1>
                </th>
                <td>
                  <Select
                    showSearch
                    style={{ width: 100 }}
                    optionFilterProp=''
                    onChange={this.handleResultsChange}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    <Option value={0}>All</Option>
                    <Option value={10}>10</Option>
                    <Option value={50}>50</Option>
                    <Option value={100}>100</Option>
                    <Option value={200}>200</Option>
                  </Select>
                </td>
              </tr>

              <div style={{ clear: 'both', margin: '10px 0 ' }}>
                <Button type='primary' onClick={this.handleExecute}>
                  Previous 100
                </Button>
                <Button type='primary' onClick={this.handleExecute}>
                  Next 100
                </Button>
              </div>

              <Table dataSource={dataSource} columns={columns} onChange={this.handleExecute} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

storiesOf('Issue #5', module).add('Explore_connect', () => <Explore />);
