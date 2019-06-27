import { storiesOf } from '@storybook/react';
import React from 'react';
import { Layout, Breadcrumb, Button, Checkbox, Input, Table, Select } from 'antd';
import 'antd/dist/antd.css';

const Option = Select.Option;
const { Content } = Layout;

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
    data: null,
  };
  resource = '';

  // Читывание значения all
  handleResultsChange = (e) => {
    this.state.resultPerPage = e;
    console.log(this.state.resultPerPage);
    this.handleResultsChange;
  };

  //Next
  handleNextChange = (e) => {
    this.state.nextPerPage = e;
    console.log(this.state.resultPerPage);
  };

  //Считывание input
  handleQueryChange = (e) => {
    this.resource = e.target.value;
    console.log(this.resource);
  };

  // <http://www.example.org/schemas/relationship/fatherOf>
  handleExecute = async (e) => {
    if (event.key === 'Enter') {
      let resource = e.target.value;
      console.log('resource', resource);
      const url = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/explore?resource=';
      const lan =
        '%3Chttp%3A%2F%2Fwww.example.org%2Fschemas%2Frelationship%2FfatherOf%3E&limit_explore=' +
        this.state.resultPerPage +
        '&show-datatypes=show-dataypes&offset=0';
      const res = await fetch(url + lan, {
        method: 'GET',
        headers: {
          Accept: 'application/sparql-results+json',
        },
      }).then((r) => r.json());
      console.log(res);
      var resultsToDisplay = [];
      const data = [];
      resultsToDisplay = res.results.bindings;
      //Вывод биндов в виде массива
      console.log(resultsToDisplay);
      this.state.result = JSON.stringify(resultsToDisplay);
      for (let i = 0; i < resultsToDisplay.length; i++) {
        let current_subject = resultsToDisplay[i].subject.value;
        let current_predicate = resultsToDisplay[i].predicate.value;
        let current_object = resultsToDisplay[i].object.value;
        let current_context = resultsToDisplay[i].context.value;
        data.push({
          key: i,
          subject: current_subject,
          predicate: current_predicate,
          object: current_object,
          context: current_context,
        });
      }
      this.setState({ data: data });
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

            <Content
              style={{
                margin: '1px 1px 1px',
                overflow: 'initial',
              }}>
              <Input
                onKeyDown={this.handleExecute}
                placeholder='Resource'
                style={{ marginLeft: 7, margin: '10px 0 ', width: '45%' }}
              />

              <h1>Result per page</h1>

              <Select showSearch style={{ width: 100 }} placeholder='All' onChange={this.handleResultsChange}>
                <Option value={0}>All</Option>
                <Option value={10}>10</Option>
                <Option value={50}>50</Option>
                <Option value={100}>100</Option>
                <Option value={200}>200</Option>
              </Select>

              <div style={{ clear: 'both', margin: '10px 0 ' }}>
                <Button type='primary' onClick={this.handleExecute}>
                  {'Previous ' + this.state.resultPerPage}
                </Button>
                <Button type='primary' onClick={this.handleExecute}>
                  {'Next ' + this.state.resultPerPage}
                </Button>
              </div>

              <Table dataSource={this.state.data} columns={columns} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

storiesOf('Issue #5', module).add('Explore_connect', () => <Explore />);
