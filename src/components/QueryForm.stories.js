import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table, Button } from 'antd';
import { Select, Input } from 'antd';
import YASQE from 'yasgui-yasqe';
import 'yasgui-yasqe/dist/yasqe.css';

const Option = Select.Option;
const { TextArea } = Input;
const columns = []
var resheader = []

export default class QueryForm extends React.Component {
  // constructor(props) {
  //   super(props);
  //   var yasqe = null;
  // }

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
      //console.log('query', q);
      const url = 'https://agentlab.ru/rdf4j-server/repositories/rpo-tests?query=';
      const lan = '&queryLn=' + this.state.language;
      // console.log(lan);

      const res = await fetch(url + q + lan, {
        method: 'GET',
        headers: {
          Accept: 'application/sparql-results+json',
        },
      })



        .then((r) => r.json())
        .then(
          (r) => {
            var i = 0;
            resheader = r.head.vars
            console.log(resheader);
            while(columns.length > 0) {
              columns.pop();
          }
            resheader.forEach(element => {
              columns.push({
                title: element,
                dataIndex: element,
                key: element
              })
            });
            var mapped = r.results.bindings.map((binding) => {
              let b2 = { key: i++ };
              Object.keys(binding).forEach((key) => {
                console.log(key, binding[key]);
                b2[key] = binding[key].value;
              });

              return b2;

            })
            console.log(mapped);
            return mapped;
          }

        );
      console.log(res);

      var resultsToDisplay = [];
      if (this.state.resultPerPage != 0) resultsToDisplay = res.slice(0, this.state.resultPerPage);
      else resultsToDisplay = res;
      this.setState({
        language: this.state.language,
        result: resultsToDisplay,
      });
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
		    <div style={{ display: 'inline-block' }}>
          {this.state.result != 0 &&
            <Table dataSource={this.state.result} columns={columns} style={{ clear: 'both', margin: '10px 0 ' }} />
          }
        </div>
      </div>
    );
  }
}

storiesOf('Explore', module).add('Query', () => <QueryForm />);
