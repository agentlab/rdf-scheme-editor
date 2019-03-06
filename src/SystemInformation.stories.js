import { storiesOf } from "@storybook/react";
import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input } from "antd";

class LockedLayout extends React.Component {
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
    const formItemLayout =
      formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : null;

    return (
      <div>
        <Form formlayout={formItemLayout}>
          <h1>Application Information </h1>
          <Form.Item label="Application Name: " {...formItemLayout}>
            <Input readOnly defaultValue="RDF4J Workbench" />
          </Form.Item>

          <Form.Item label="Version: " {...formItemLayout}>
            <Input readOnly defaultValue="2.5.0-M2+00d2484" />
          </Form.Item>
          <h1>Runtime Information </h1>
          <Form.Item label="Operating System: " {...formItemLayout}>
            <Input readOnly defaultValue="Linux 4.15.0-45-generic (amd64)" />
          </Form.Item>
          <Form.Item label="Java Runtime: " {...formItemLayout}>
            <Input
              readOnly
              defaultValue="Oracle Corporation OpenJDK 64-Bit Server VM (1.8.0_181)"
            />
          </Form.Item>
          <Form.Item label="Process User: " {...formItemLayout}>
            <Input readOnly defaultValue="root" />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

storiesOf("SystemInformation", module).add("Info", () => <LockedLayout />);