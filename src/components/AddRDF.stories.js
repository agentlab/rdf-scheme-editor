import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Input, Button, Upload, Checkbox, Select, Radio, Layout, Icon, message } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
function handleChange(value) {
  console.log(`selected ${value}`);
}
function onBlur() {
  console.log('blur');
}

class AddRDFForm extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
      size: 'default',
    };
  }
  state = {
    value: 1,
  };

  base = '';
  context = '';
  datURL = '';
  rdfCont = '';
  dataFormat = 'autodetect';
  useBase = false;
  entRDF = false;

  /*  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }}*/
  handleBaseIRIChange = (e) => {
    this.base = e.target.value;
    console.log(this.base);
  };
  handleConChange = (e) => {
    this.context = e.target.value;
    console.log(this.context);
  };
  handleDataURLChange = (e) => {
    this.dataURL = e.target.value;
    console.log(this.datURL);
  };
  handleRDFContChange = (e) => {
    this.rdfCont = e.target.value;
    console.log(this.rdfCont);
  };
  handleDataFChange = (e) => {
    this.dataFormat = e;
    console.log(this.dataFormat);
  };
  handleUseBaseChange = () => {
    this.useBase = !this.useBase;
    console.log(this.useBase);
  };
  handleEntRDFChange = () => {
    this.entRDF = !this.entRDF;
    console.log(this.entRDF);
  };

  handleFormLayoutChange = (e) => {
    this.setState({ formLayout: e.target.value });
  };
  onCChange = (e) => {
    this.setState({
      value: e.target.value,
    });
    console.log('radio checked', e.target.value);
  };

  handleUpload = async () => {
    var content = '';
    if (this.state.value == 1) content = this.dataURL;
    else if (this.state.value == 3) content = this.rdfCont;
    console.log(content);

    const url = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/add';
    const result = await fetch(
      url + '?baseURI=' + (this.useBase ? this.base : '') + '&dataFormat=' + this.dataFormat + '&rdfdata=' + content,
      {
        method: 'POST',
        /*headers: {

        'Content-Type': 'application/n-triples',
      },*/
      },
    );

    alert('RDF added');
  };

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const { formLayout } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    const props1 = {
      action: 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests',
      onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
          console.log(file, fileList);
        }
      },
    };
    const props = {
      name: 'file',
      multiple: true,
      action: 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests',
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <div>
        <Form layout={formLayout}>
          <Form.Item id='base' {...formItemLayout} label='Base URI: '>
            <Layout>
              <Input style={{ width: '50%' }} onChange={this.handleBaseIRIChange} />
              <Checkbox onChange={this.handleUseBaseChange}> use base URI as context identifier </Checkbox>
            </Layout>
          </Form.Item>

          <Form.Item id='context' {...formItemLayout} label='Context:'>
            <Input style={{ width: '50%' }} onChange={this.handleConChange} />
          </Form.Item>

          <Form.Item id='dataFormat' {...formItemLayout} label='Data format:'>
            <Layout>
              <Select defaultValue='(autodetect)' style={{ width: 120 }} onChange={this.handleDataFChange}>
                <Option value='(autodetect)'>(autodetect)</Option>
                <Option value='application/n-triples'>N-Triples</Option>
                <Option value='RDF/XML'>RDF/XML</Option>
                <Option value='Turtle'>Turtle</Option>
              </Select>
            </Layout>
          </Form.Item>

          <Radio.Group onChange={this.onCChange} value={this.state.value}>
            <Radio.Button value={1}>
              Location of the RDF data you wish to upload
              {this.state.value === 1 ? (
                <Input style={{ width: 200, top: 50, right: 50 }} onChange={this.handleDataURLChange} />
              ) : null}
            </Radio.Button>
            <Radio.Button value={2}>
              Select the file containing the RDF data you wish to upload
              {this.state.value === 2 ? (
                <Upload {...props1}>
                  <Button style={{ top: 50, right: 100 }}>
                    <Icon type='upload' /> Click to upload
                  </Button>
                </Upload>
              ) : null}
            </Radio.Button>
            <Radio.Button value={3}>
              Enter the RDF data you wish to upload
              {this.state.value === 3 ? (
                <TextArea rows={5} style={{ margin: -120, right: 100 }} onChange={this.handleRDFContChange} />
              ) : null}
            </Radio.Button>
          </Radio.Group>
        </Form>

        <Button style={{ margin: 100 }} onClick={this.handleUpload}>
          <Icon type='upload' /> Upload
        </Button>
      </div>
    );
  }
}

storiesOf('Add RDF', module).add('form', () => <AddRDFForm />);
