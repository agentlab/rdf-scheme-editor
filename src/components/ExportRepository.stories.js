import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Input, Select, Button, Table, Layout } from 'antd';

const InputGroup = Input.Group;
const Option = Select.Option;
//const dataSource = [{}];
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
  result = [];

  handleResultChange = (e) => {
    this.state.resultPerPage = e;
    console.log(this.state.resultPerPage);
    this.handleResultChange;
  };

  handleExecute = async () => {
    const url = 'https://agentlab.ru/rdf4j-server/repositories/rpo-tests/statements';

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/rdf+json',
      },
    }).then((r) => r.json());

    console.log(res);
    var resultsToDisplay = [];
    const data = [];
    resultsToDisplay = res.results.bindings;

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
  };

  /*.then((r) => {
      //var i = 0;
      console.log(r);
      var mapped = r.results.bindings.map((obj) => {
        let b2 = { key: predicate };
        Object.keys(obj).forEach((key) => {
          b2[key] = obj[key].value;
          let b3 = { key1: object };
          Object.keys(obj2).forEach((key1) => {
            b3[key1] = obj2[key1].value;
          })
        });

        return b3;
      });

      console.log(mapped);
      return mapped;
    });

    console.log(res);
    var resultsToDisplay = [];

    if (this.state.resultPerPage != 0) resultsToDisplay = res.slice(0, this.state.resultPerPage);
    else resultsToDisplay = res;

    this.setState({
      result: resultsToDisplay,
    });*/

  /*console.log(res);
 
    var resultsToDisplay = [];
    const data = [];
    if (this.state.resultPerPage != 0) resultsToDisplay = res.results.bindings.slice(0, this.state.resultPerPage);
    else resultsToDisplay = res.results.bindings;
    //console.log(resultsToDisplay);
    this.state.result = JSON.stringify(resultsToDisplay);

    Object.keys(subject).forEach(function(value,index) {
      let current_subject = resultsToDisplay.subject.value;
      data.push({
        subject: current_subject,
      })
      Object.keys(predicate).forEach(function(value,index) {
        let current_predicate = resultsToDisplay.predicate.value;
        data.push({
          predicate: current_predicate,
        })
        Object.keys(object).forEach(function(value,index) {
          let current_object = resultsToDisplay.object.value;
          data.push({
            object: current_object,
          })
        });
      });
    });

    
    }*/

  //this.setState({ data: data });

  //console.log(this.state.result);
  //alert(this.state.result);
  //}

  render() {
    return (
      <div>
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
              <b>
                <Form.Item label='Results per page: ' />
              </b>
            </div>
            <div>
              <InputGroup compact>
                <Select
                  showSearch
                  defaultValue='All'
                  onChange={this.handleResultChange}
                  optionFilterProp=''
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>
                  <Option value='All'>All</Option>
                  <Option value='10'>10</Option>
                  <Option value='50'>50</Option>
                  <Option value='100'>100</Option>
                  <Option value='200'>200</Option>
                </Select>
              </InputGroup>
            </div>
          </div>
          <Table onChange={this.handleExecute} columns={columns} dataSource={this.state.data} bordered size='small' />
        </Content>
      </div>
    );
  }
}

storiesOf('Lab 2', module).add('Export Repository', () => <ExportRepository />);
