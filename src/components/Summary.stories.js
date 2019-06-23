import { storiesOf } from '@storybook/react';
import React from 'react';
import { Form, Input } from 'antd';
import { any } from 'prop-types';

// const server_URL = 'https://agentlab.ru/rdf4j-server';

class FormLayoutDemo extends React.Component {
  constructor() {
    super();

    this.state = {
      bindings: [
        {
          id: {
            type: '',
            value: '',
          },
          description: {
            type: '',
            value: '',
          },
          location: {
            type: '',
            value: '',
          },
          server: {
            type: '',
            value: '',
          },
          size: {
            type: '',
            value: '',
          },
          contexts: {
            type: '',
            value: '',
          },
        },
      ],
    };
  }

  handleExecute = async () => {
    const url = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/summary';
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/sparql-results+json',
      },
    })
      .then((r) => r.json())
      .catch((ex) => console.error(ex));

    this.setState({ bindings: res.results.bindings });
    console.log(this.state);
  };

  render() {
    this.handleExecute();
    return (
      <div>
        <Form>
          <h1 align='center'> Repository Location </h1>

          <Form.Item label='ID:'>
            <Input readOnly defaultValue='reqs' value={this.state.bindings[0].id.value} />
          </Form.Item>
          <Form.Item label='Title:'>
            <Input readOnly defaultValue='Requirements' value={this.state.bindings[0].description.value} />
          </Form.Item>
          <Form.Item label='Location:'>
            <Input
              readOnly
              defaultValue='https://agentlab.ru/rdf4j-server/repositories/reqs'
              value={this.state.bindings[0].location.value}
            />
          </Form.Item>
          <Form.Item label='RDF4J Server:'>
            <Input
              readOnly
              defaultValue='https://agentlab.ru/rdf4j-server'
              value={this.state.bindings[0].server.value}
            />
          </Form.Item>
          <h1 align='center'> Repository Size </h1>
          <Form.Item label='Number of Statements:'>
            <Input readOnly defaultValue='5672' value={this.state.bindings[0].size.value} />
          </Form.Item>
          <Form.Item label='Number of Labeled Contexts: '>
            <Input readOnly defaultValue='10' value={this.state.bindings[0].contexts.value} />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

//storiesOf('Repositories', module).add('List', () => <RepositoriesTable props={server_URL} />);
/*
          <form onSubmit={this.props.reqSend} style={{ marginTop: '10px' }}>
            <button onClick={this.handleExecute}>Execute</button>
          </form>
*/
storiesOf('Lab1', module).add('Summary', () => <FormLayoutDemo />);
