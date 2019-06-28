import { storiesOf } from '@storybook/react';
import React from 'react';

class Types extends React.Component {
  state = {
    urls: [undefined],
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    var params =
      'action=exec&' +
      'queryLn=SPARQL&' +
      'query=' +
      encodeURIComponent(
        'PREFIX foaf: <https://agentlab.ru/rdf4j-workbench/repositories> ' + 'SELECT ?s ' + 'WHERE{ ?s rdf:type ?o .}',
      ) +
      '&' +
      'limit_query=100&' +
      'infer=true&';
    var urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/eurovoc_ru/query' + '?' + params;
    var dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    dataSel = dataSel['results']['bindings'];
    const data = [];
    for (var i = 0; i < dataSel.length; i++) {
      data.push(dataSel[i]['s']['value']);
    }
    this.setState({
      urls: data,
    });
  };

  render() {
    return (
      <div>
        <TypesInRep data={this.state.urls} reqSend={this.handleSubmit} />
      </div>
    );
  }
}

class TypesInRep extends React.Component {
  render() {
    return (
      <div style={{ padding: '5%' }}>
        <h1>Types In Repository</h1>
        <table style={{ border: '1px solid black' }}>
          <tr>
            <th style={{ backgroundColor: 'lightgrey', minWidth: '300px' }}>Type</th>
          </tr>
          {this.props.data.map((url) => (
            <tr style={{ border: '1px solid black' }}>
              <td>
                <a href={url}>{url}</a>
              </td>
            </tr>
          ))}
        </table>
        <form onSubmit={this.props.reqSend} style={{ marginTop: '10px' }}>
          <button>Let's check them</button>
        </form>
      </div>
    );
  }
}

storiesOf('Explore', module).add('Types', () => <Types />);
