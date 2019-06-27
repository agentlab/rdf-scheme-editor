import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Input, Select, Button, Table, Layout } from 'antd';

const InputGroup = Input.Group;
const Option = Select.Option;
const dataSource = [{}];
const { Content } = Layout;

const columns = [
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
    width: 150,
  },
  {
    title: 'Predicate',
    dataIndex: 'predicate',
    key: 'predicate',
    width: 150,
  },
  {
    title: 'Object',
    dataIndex: 'object',
    key: 'object',
    width: 700,
  },
  {
    title: 'Context',
    dataIndex: 'context',
    key: 'context',
    width: 50,
  },
];

export default class ExportRepository extends React.Component {
  state = {
    resultPerPage: 0,
    result: '',
  };

  handleResultChange = (e) => {
    this.resultPerPage = e;
    console.log(this.resultPerPage);
  };

  handleExecute = async () => {
    if (!(this.query === '')) {
      const q = encodeURIComponent(this.query) + this.state.resultPerPage;
      console.log('query', q);
      const url = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/export?limit_explore=';

      const res = await fetch(url, {
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
      <div>
        <h1 align='left' margin-left='50px'>
          {' '}
          Export Repository{' '}
        </h1>
        <Content>
          <div>
            <div>
              <b>
                <Form.Item label='Download format: ' />
              </b>
            </div>
            <div>
              <InputGroup compact>
                <Select defaultValue='N-Triples'>
                  <Option value='N-Triples'>N-Triples</Option>
                  <Option value='RDF/XML'>RDF/XML</Option>
                  <Option value='Turtle'>Turtle</Option>
                  <Option value='N3'>N3</Option>
                  <Option value='TriG'>TriG</Option>
                  <Option value='TriX'>TriX</Option>
                </Select>
              </InputGroup>
            </div>
            <div>
              <Form.Item>
                <Button type='submit'> Download</Button>
                <div style={{ display: 'inline-block' }}>
                  <Button onClick={this.handleExecute}>Refresh</Button>
                </div>
              </Form.Item>
            </div>
          </div>

          <div>
            <div>
              <b>
                <Form.Item label='Results per page: ' />
              </b>
            </div>
            <div>
              <InputGroup compact>
                <Select
                  showSearch
                  onChange={this.handleResultChange}
                  optionFilterProp=''
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>
                  <Option value='All'>All</Option>
                  <Option value='10'>10</Option>
                  <Option value='50'>50</Option>
                  <Option value='100'>100</Option>
                  <Option value='200G'>200</Option>
                </Select>
              </InputGroup>
            </div>
          </div>
          <Table onChange={this.handleExecute} columns={columns} dataSource={dataSource} bordered size='small' />
        </Content>
      </div>
    );
  }
}

storiesOf('Lab 2', module).add('Export Repository', () => <ExportRepository />);
