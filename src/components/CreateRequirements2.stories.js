import {
  Form, Input, Button, Radio, Select, Typography, Upload, Icon, Checkbox
} from 'antd';
import React from "react";
import ReactDOM from "react-dom";
import { DatePicker, message } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import { storiesOf } from '@storybook/react';

const Option = Select.Option;
function handleChange(value) {
  console.log(`selected ${value}`);
}

class FormLayoutDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };
  }

  handleFormLayoutChange = (e) => {
    this.setState({ formLayout: e.target.value });
  }




  render() {
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 4 },
      wrapperCol: { span: 9 },
    } : null;
    const formItem2Layout = formLayout === 'horizontal' ? {
      labelCol: { span: 7 },
      wrapperCol: { span: 2 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 14, offset: 4 },
    } : null;


    return (
      <div>

        <Form layout={formLayout}>

          <Form.Item
            label="Имя"
            {...formItemLayout}
          >
            <Input placeholder="" />
          </Form.Item>

          <Form.Item
            label="Тип требования"
            {...formItemLayout}
          >
            <Select defaultValue="Тип документа" {...formItemLayout} onChange={handleChange} label="Тип требования">
              <Option value="Тип документа">Тип документа</Option>
              <Option value="Тип недокумента">Тип недокумента</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Формат требования"
            {...formItemLayout}
          >
            <Select defaultValue="Текст" {...formItemLayout} onChange={handleChange} label="Тип требования">
              <Option value="Текст">Текст</Option>
              <Option value="Не текст">Не текст</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Описание"
            {...formItemLayout}
          >
            <Input placeholder="" />
          </Form.Item>

          <Form.Item label="Расположение"
            {...formItemLayout}
          >
          </Form.Item>
          <Form.Item label="Папка"
            {...formItemLayout}
          >
            <Input placeholder="Базовые понятия" />
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Выбрать папку
              </Button>
            </Upload>

          </Form.Item>

          <Form.Item label="Теги"
            {...formItemLayout}
          >
            <Input placeholder="" />
            <Button>Добавить тег</Button>
          </Form.Item>

          <Form.Item label="Начальное значение требования"
            {...formItem2Layout}
          >
          </Form.Item>
          <Form.Item
            label="Шаблон"
            {...formItemLayout}
          >
            <Select defaultValue="Нет" {...formItemLayout} onChange={handleChange} label="Тип требования">
              <Option value="Текст.">Нет</Option>
              <Option value="Не текст">Есть</Option>
            </Select>
          </Form.Item>
          <Form.Item >
            <Checkbox>Открыть требование</Checkbox>
          </Form.Item>
        </Form>
      </div>
    );
  }
}



storiesOf("LR1", module)
  .add("CreateRequirements", () => (
    <h1>
      <FormLayoutDemo>Form</FormLayoutDemo>
    </h1>
  ));

