import { storiesOf } from "@storybook/react";
import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Badge } from "antd";
import FormItem from "antd/lib/form/FormItem";

const { TextArea } = Input;

class FormRemoveStatements extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: "horizontal"
    };
  }

  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };

  render() {
    const { formLayout } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    };

    return (
      <div>
        <Form layout={formLayout}>
          <Form.Item />
          <Form.Item label="Subject: " {...formItemLayout}>
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Predicate: " {...formItemLayout}>
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Object: " {...formItemLayout}>
            <div>
              <TextArea readOnly autosize={{ minRows: 2, maxRows: 6 }} />
            </div>
          </Form.Item>
          <Form.Item label="Context: " {...formItemLayout}>
            <Input readOnly />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 8, offset: 4 }}>
            <Button type="primary">Remove</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

storiesOf("RemoveStatements", module).add("RemoveStatements", () => (
  <FormRemoveStatements />
));
