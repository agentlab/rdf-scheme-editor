import React from 'react';
import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import './index.css';

import { Form, Input, Button, Upload, Checkbox,Select, Radio, Layout, Icon } from 'antd';
  

  const { TextArea } = Input;
 
  class AddRDFForm extends React.Component {
    constructor() {
        super();
        this.state = {
        formLayout: 'horizontal',
        }; } 

        handleFormLayoutChange = (e) => {
            this.setState({ formLayout: e.target.value });
            }

    render() {
       const { formLayout } = this.state;
            const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            } ;

      return (
        <div>
          <Form layout={formLayout}>
            <Form.Item id="base" {...formItemLayout} label="Base URI: ">
              <Layout>
                <Input readOnly style={{ width: "50%" }} />
                <Checkbox> use base URI as context identifier </Checkbox>
              </Layout>
            </Form.Item>

            <Form.Item id="context" {...formItemLayout} label="Context:">
              <Input readOnly style={{ width: "50%" }} />
            </Form.Item>

            <Form.Item
              id="dataFormat"
              {...formItemLayout}
              label="Data format:"
            >
              <Layout>
                <Select
                  defaultValue="(autodetect)"
                  style={{ width: 120 }}
                >
                  <Option value="(autodetect)">(autodetect)</Option>
                  <Option value="N-Triples">N-Triples</Option>
                  <Option value="RDF/XML">RDF/XML</Option>
                  <Option value="Turtle">Turtle</Option>
                </Select>
                <Radio>Location of the RDF data you wish to upload</Radio>
              </Layout>
            </Form.Item>

            <Form.Item
              id="RDFdataUrl"
              {...formItemLayout}
              label="RDF Data URL:"
            >
              <Layout>
                <Input readOnly style={{ width: "50%" }} />
                <Radio>
                  Select the file containing the RDF data you wish to
                  upload
                </Radio>
              </Layout>
            </Form.Item>

            <Form.Item label="RDF Data File: " {...formItemLayout}>
              {
                <Upload
                  name="logo"
                  action="/upload.do"
                  listType="picture"
                >
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>
              }
              <Checkbox>Enter the RDF data you wish to upload</Checkbox>
            </Form.Item>

            <Form.Item
              id="RDFcontent"
              {...formItemLayout}
              label="RDF Content:"
            >
              <Layout>
                <TextArea readOnly rows={4} style={{ width: "50%" }} />
                <Button style={{ width: "30%" }}>Upload</Button>
              </Layout>
            </Form.Item>
          </Form>
        </div>
      );
    }
  }
  
storiesOf('Add RDF', module)
.add('form', () => (
    <AddRDFForm></AddRDFForm>
    ));