
import React from 'react';
import { storiesOf } from '@storybook/react';
import ReactDOM from 'react-dom';
import {
  Form, Input, Select, Button, Table
} from 'antd';


const InputGroup = Input.Group;
const Option = Select.Option;

class CompactDemo extends React.Component {
  state = {
    dataSource: [],
  }

  render() {
    return (
      <div>
        <h1 align="left" margin-left="50px"> Export Repository </h1>
      <table>
        <td>
            <b>
              <Form.Item
                  label="Download format: ">
              </Form.Item>
              </b> 
        </td>
        <td>
              <InputGroup compact>
                  <Select defaultValue="N-Triples">
                    <Option value="N-Triples">N-Triples</Option>
                    <Option value="RDF/XML">RDF/XML</Option>
                    <Option value="Turtle">Turtle</Option>
                    <Option value="N3">N3</Option>
                    <Option value="TriG">TriG</Option>
                    <Option value="TriX">TriX</Option>
                  </Select>
              </InputGroup>
        </td>  
        <td >
              <Form.Item >
                <Button type="submit">  Download</Button>
              </Form.Item>
        </td>
      </table>

      <table>
        <td>
            <b>
              <Form.Item
                  label="Results per page: ">
              </Form.Item>
              </b> 
        </td>
        <td>
              <InputGroup compact>
                  <Select defaultValue="All">
                    <Option value="All">All</Option>
                    <Option value="10">10</Option>
                    <Option value="50">50</Option>
                    <Option value="100">100</Option>
                    <Option value="200G">200</Option>
                  </Select>
              </InputGroup>
        </td>  
        <td>
              <Form.Item 
                    label="The results shown maybe truncated">  
              </Form.Item>
        </td>
      </table>
      </div>
      );
    }
  }
  
 const columns = [
   {
      title: "Subject",
      dataIndex: "subject",
      key:"subject",
      width: 150,
   },
   {
      title: "Predicate",
      dataIndex: "predicate",
      key: "predicate",
      width: 150,
   },
   {
      title: "Object",
      dataIndex: "object",
      key: "object",
      width: 700,
   },
   {
      title: "Context",
      dataIndex: "context",
      key: "context",
      width: 50,
   }
 ];

 const data = [
   {
      key: "1",
      subject: "oslc",
      predicate: "rdf:type",
      object: "owl:Ontology",
      context: "oslc",
   },
   {
      key: "2",
      subject: "oslc",
      predicate: "rdf:type",
      object: "owl:label",
      context: "oslc",
    },
    {
      key: "3",
      subject: "oslc",
      predicate: "rdf:type",
      object: "owl:descrision",
      context: "oslc",
    }
 ];
  
 storiesOf('Lab 2', module)
 .add('Export Repository', () =>
 <div>
   <CompactDemo />
   <Table columns={columns} dataSource={data} bordered size="small" />
 </div>
 );
  

 