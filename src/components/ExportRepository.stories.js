import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Input, Select, Button, Col, Row, Table, Layout } from 'antd';

const InputGroup = Input.Group;
const Option = Select.Option;
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

class ExportRepository extends React.Component {
  state = {
    resultPerPage: 10,
    result: '',
    data: null,
  };

  handleResultChange = (e) => {
    this.state.resultPerPage = e;
    console.log('Results per page: ', this.state.resultPerPage);
    this.handleExecute;
  };

  handleExecute = async () => {
    const url = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/export';
    const prefix = '?limit_explore=' + this.state.resultPerPage;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());

    let resultsToDisplay = [];
    const data = [];
    resultsToDisplay = res.results.bindings;
    console.log('res:\n', res);
    console.log('bindings:\n', resultsToDisplay);

    for (let i = 0; i < resultsToDisplay.length; i++) {
      let current_subject = '';
      let current_predicate = '';
      let current_object = '';
      let current_context = '';

      if (resultsToDisplay[i].subject != undefined) {
        current_subject = resultsToDisplay[i].subject.value;
      }

      if (resultsToDisplay[i].predicate != undefined) {
        current_predicate = resultsToDisplay[i].predicate.value;
      }

      if (resultsToDisplay[i].object != undefined) {
        current_object = resultsToDisplay[i].object.value;
      }

      if (resultsToDisplay[i].context != undefined) {
        current_context = resultsToDisplay[i].context.value;
      }

      data.push({
        key: i,
        subject: current_subject,
        predicate: current_predicate,
        object: current_object,
        context: current_context,
      });
      this.setState({ data: data });
    }
  };

  render() {
    return (
      <div
        onLoad={(temp) => {
          temp = 10;
          this.handleExecute(temp);
          return false;
        }}>
        <h1 align='left' margin-left='200px'>
          Export Repository{' '}
        </h1>
        <Content style={{ display: 'inline-block', margin: '2%' }}>
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
          <div style={{ display: 'inline-block' }}>
            <Form.Item>
              <div class='pdownlclass'>
                <a
                  href='https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/export?Accept=application%2Fn-triples'
                  target='_blank'
                  title='скачать'>
                  <Button type='submit'> Download</Button>
                </a>
              </div>
              <div>
                <Button onClick={this.handleExecute}>Refresh</Button>
              </div>
            </Form.Item>
          </div>
          <div>
            <div>
              <Row>
                <Col span={1} offset={0}>
                  <b>
                    <Form.Item label='Results per page: ' />
                  </b>
                </Col>
                <Col span={1} offset={2}>
                  <InputGroup compact>
                    <Select showSearch defaultValue='All' onChange={this.handleResultChange} optionFilterProp=''>
                      <Option value='All'>All</Option>
                      <Option value='10'>10</Option>
                      <Option value='50'>50</Option>
                      <Option value='100'>100</Option>
                      <Option value='200'>200</Option>
                    </Select>
                  </InputGroup>
                </Col>
              </Row>
            </div>
          </div>
          <Table columns={columns} dataSource={this.state.data} bordered size='small' />
        </Content>
      </div>
    );
  }
}

storiesOf('Lab 2', module).add('Export Repository', () => <ExportRepository />);
