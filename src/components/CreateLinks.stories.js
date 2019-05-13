import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Input, Button, Upload, Checkbox, Select, Radio, Layout, Icon, List } from 'antd';

const { TextArea } = Input;

const testData = {
  linkTypes: ['Тип 1', 'Тип 2', 'Тип 3'],
  requirements: ['Требование 1', 'Требование 2', 'Требование 3'],
  modules: ['Модуль 1', 'Модуль 2', 'Модуль 3'],
  recent: ['Недавнее требование 1', 'Недавнее требование 2', 'Недавнее требование 3'],
};

class CreateLinks extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };
  }

  handleFormLayoutChange = (e) => {
    this.setState({ formLayout: e.target.value });
  };

  render() {
    const { formLayout } = this.state;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 10 },
    };

    return (
      <div>
        <Form layout={formLayout}>
          <Form.Item id='linkType' {...formItemLayout} label='Тип ссылки:'>
            <Layout>
              <Select defaultValue='type0' style={{ width: 200 }}>
                {testData.linkTypes.map((element, index) => (
                  <Option value={`type${index.toString()}`}> {element} </Option>
                ))}
              </Select>
            </Layout>
          </Form.Item>

          <Form.Item id='target' {...formItemLayout} label='Целевой объект ссылки: '>
            <Layout>
              <Radio defaultChecked='true'>Ссылка на требование в:</Radio>
              <Select defaultValue='req0' style={{ width: 200 }}>
                {testData.requirements.map((element, index) => (
                  <Option value={`req${index.toString()}`}> {element} </Option>
                ))}
              </Select>
              <Radio>Ссылка на веб-страницу</Radio>
            </Layout>
          </Form.Item>

          <Form.Item id='target' {...formItemLayout} label='Найти: '>
            <Layout>
              <Radio defaultChecked='true'>Требования</Radio>
              <Radio>Строки в модуле:</Radio>
              <Select defaultValue='module0' style={{ width: 200 }}>
                {testData.modules.map((element, index) => (
                  <Option value={`module${index.toString()}`}> {element} </Option>
                ))}
              </Select>
            </Layout>
          </Form.Item>

          <Form.Item id='search' {...formItemLayout} label='Поиск требований по ID:'>
            <Layout>
              <Input />
            </Layout>
          </Form.Item>

          <Form.Item id='chooseRecent' {...formItemLayout} label='Выбор из числа недавних требований:'>
            <Layout>
              <List
                itemLayout='horizontal'
                dataSource={testData.recent}
                renderItem={(item) => <List.Item actions={[<a>select</a>]}>{item}</List.Item>}
              />
            </Layout>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

//const WrappedApp = Form.create({ name: 'coordinated' })(App);

storiesOf('Link', module).add('Create', () => <CreateLinks />);
