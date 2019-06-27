import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import { Select, Input } from 'antd';
import YASQE from 'yasgui-yasqe';
import 'yasgui-yasqe/dist/yasqe.css';

const Option = Select.Option;
const { TextArea } = Input;

export default class QueryForm extends React.Component {
  constructor(props) {
    super(props);
    var yasqe = null;
    var yasr = null;
  }

  state = {
    language: 'sparql',
    resultPerPage: 0,
    result: '',
  };

  query = '';
  handleLanguageChange = (e) => {
    this.state.language = e;
  };

  handleResultsChange = (e) => {
    this.state.resultPerPage = e;
    console.log(this.state.resultPerPage);
  };

  handleQueryChange = (e) => {
    //console.log("e=", e);

    this.query = e.doc.getValue();
    //console.log('b=', this.yasqe.options.value);
    console.log(this.query);
  };

  handleExecute = async () => {
    if (!(this.query === '')) {
      const q = encodeURIComponent(this.query);
      console.log('query', q);
      const url = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/?query=';
      const lan = '&queryLn=' + this.state.language;
      console.log(lan);

      const res = await fetch(url + q + lan, {
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

  componentDidMount() {
    this.yasqe = YASQE.fromTextArea(document.getElementById('yasqe'), {
      sparql: {
        showQueryButton: true,
      },
    });

    //this.yasqe.on('change', this.handleQueryChange);
    this.yasqe.setValue('');
    this.yasqe.on('change', this.handleQueryChange);
    this.yasqe.query(this.handleExecute);
    this.yasqe.refresh();
  }

  render() {
    return (
      <div>
        <table cellSpacing={0}>
          <tbody>
            <tr>
              <th>
                <h1>Query Language</h1>
              </th>
              <td>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder='Select a language'
                  optionFilterProp=''
                  onChange={this.handleLanguageChange}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>
                  <Option value='sparql'>SPARQL</Option>
                  <Option value='serql'>SERQL</Option>
                </Select>
              </td>
            </tr>
            <tr>
              <th>
                <h1>Query</h1>
              </th>
              <td>
                <textarea id='yasqe' style={{ width: 400 }} autosize={{ minRows: 5, maxRows: 50 }} />
                {/*<div id='yasr' style={{ width: 400 }} />*/}
                {/*<TextArea*/}
                {/*    type='text'*/}
                {/*    style={{ width: 400 }}*/}
                {/*    autosize={{ minRows: 5, maxRows: 50 }}*/}
                {/*    onChange={this.handleQueryChange}*/}
                {/*/>*/}
              </td>
            </tr>
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
                  <Option value={2}>2</Option>
                  <Option value={5}>5</Option>
                  <Option value={10}>10</Option>
                  <Option value={20}>20</Option>
                </Select>
              </td>
            </tr>
            <tr>
              <th>
                <div style={{ display: 'inline-block' }}>
                  <Button onClick={this.handleExecute}>Execute</Button>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

storiesOf('Explore', module).add('Query', () => <QueryForm />);
