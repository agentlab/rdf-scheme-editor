
import { storiesOf } from '@storybook/react';
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {
  Form, Icon, Input, Button, Select
} from 'antd';
import { Table } from 'antd';

const columns = [{
  title: 'Prefix',
  dataIndex: 'Prefix',
}, {
  title: 'Namespace',
  dataIndex: 'Namespace',
}];
const data = [{
  key: '1',
  Prefix: 'Prefix1',
  Namespace: 'Prefix1Namespace1',
}, {
  key: '2',
  Prefix: 'Prefix2',
  Namespace: 'Prefix2Namespace2',
}, {
  key: '3',
  Prefix: 'Prefix3',
  Namespace: 'Prefix3Namespace3',
}];

class Namespaces extends React.Component {
  constructor() {
    super();
  }

 render() {

    return (
      <div>
        <Form>
        <h1 align="center"> Namespaces in repository </h1>
        
          <Form.Item 
			style ={{width : '20%', marginLeft : '10%',}}
            label="Prefix: "
          >
            <Input defaultValue="" />
          </Form.Item>
		  
		  <Select
          style={{ width: '20%' , marginLeft : '10%',}}
          onChange={this.handleCurrencyChange}
          >
          <Option value="Prefix1">Prefix1</Option>
          <Option value="Prefix2">Prefix2</Option>
	  <Option value="Prefix3">Prefix3</Option>
          </Select>
		
	  <Form.Item
            label="Namespace: "
		style ={{width : '20%', marginLeft : '10%',}}
          >
            <Input defaultValue="" />
          </Form.Item>
        </Form>
		 <Button style ={{marginLeft : '10%',}}>Update</Button>
		 <Button style ={{marginLeft : '1%',}}>Delete</Button>
	<Table style ={{width : '40%', marginLeft : '10%', marginTop : '5%'}} columns={columns} dataSource={data} size="middle" /> 

      </div>
	 

  
    );
  }
  }



storiesOf('Lab1', module)
  .add('Namespaces in repository', () => (
    <Namespaces />
  ))
          
