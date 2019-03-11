
import { storiesOf } from '@storybook/react';
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {
  Form, Input, Checkbox, Upload, Button,Icon,Select,
} from 'antd';

const { Option } = Select;

class FormLayoutDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };
  }


  render() {
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
	  
    } : null;
	 const formItemLayout2 = formLayout === 'horizontal' ? {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
	  
	  
	  
    } : null;

    return (
      <div>
        <Form layout={formLayout}>
        <h1 align="center"> Add RDF </h1>
        

          <Form.Item
            label="Base URl: "
            {...formItemLayout}
          >
            <Input readOnly defaultValue="Base" />
			
			{(
            <Checkbox>use base URl as cintext identifier</Checkbox>
          )}
          </Form.Item>
		
          <Form.Item
            label="Context: "
            {...formItemLayout}
          >
            <Input readOnly defaultValue="Context" />
          </Form.Item>
		  
		     <Form.Item
          label="Data format: "
		  {...formItemLayout}
          hasFeedback
        >
          {(
            <Select placeholder="(autodetect)">
              <Option value="auto">(autodetect)</Option>
              <Option value="">N-Triples</Option>
			  <Option value="">RDF-XML</Option>
			  <Option value="">Turtle</Option>
			  <Option value="">N3</Option>
			  <Option value="">RDF-JSON</Option>
			  <Option value="">TriG</Option>
			  <Option value="">N-Quads</Option>
			  <Option value="">BinaryRDF</Option>
			  <Option value="">TriX</Option>
			  <Option value="">JSON-LD</Option>
            </Select>
          )}
		  
		  {(
            <Checkbox>Location of the RDF data you wish to upload</Checkbox>
          )}
        </Form.Item>
		  
		<Form.Item
            label="RDF Data URL: "
            {...formItemLayout}
          >
            <Input readOnly defaultValue="" />
			{(
            <Checkbox>Select the file containing the RDF data you wish to upload</Checkbox>
          )}
          </Form.Item>		  
		  
		  <Form.Item
          label="RDF Data File: "
		  {...formItemLayout}
          
        >
          {(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}	  
		  {(
            <Checkbox>Enter the RDF data you wish to upload</Checkbox>
          )}
        </Form.Item>

        <Form.Item
            label="RDF Content: "
            {...formItemLayout2}
          >
            <Input readOnly defaultValue="" />
        </Form.Item>
        </Form>
      </div>
    );
  }
}


storiesOf('Lab1', module)
  .add('Add RDF', () => (
    <FormLayoutDemo />
  ))
          