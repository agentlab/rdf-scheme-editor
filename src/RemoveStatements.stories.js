import { storiesOf } from "@storybook/react";
import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input, Button} from "antd";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const { TextArea } = Input;
class RemoveStatForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {

    return (

      <Form
        onSubmit={this.handleSubmit}
        className="form"
        style={{ width: 600 , padding: '15px'}}
      >
      <li className="content">
      WARNING: Specifying only a context will remove all statements belonging to that context. This operation cannot be undone.
      </li>
      <br/>
      <li> Please specify subject, predicate, object and/or context of the statements that should be removed.
       Empty fields match with any subject, predicate, object or context.
       URIs, bNodes and literals should be entered using the N-Triples encoding.
       Example values in N-Triples encoding are: </li>
       <ul>
        <li>URI: http://foo.com/bar </li>
        <li>BNode: _:nodeID</li>
        <li>Literal: "Hello" , "Hello"@en and "Hello"^^http://bar.com/foo</li>
        </ul>

       <br/>
        <Form.Item {...formItemLayout} label="Subject">
          {(<Input placeholder="Subject" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Predicate">
          {(
            <Input placeholder="Predicate" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Object">
          {(
            <TextArea rows={3} placeholder="Predicate" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Context">
          {(<Input placeholder="Context" />)}
        </Form.Item>

        <Form.Item>
          <Button type="submit" htmlType="submit">
            Remove
          </Button>
        </Form.Item>
      </Form>

    );
  }
}

const WrappedRemoveStatForm = Form.create({ name: "remove" })(RemoveStatForm);

storiesOf('Remove Statements', module)
  .add('', () => (
    <RemoveStatForm />
  ))

//ReactDOM.render(<WrappedRemoveStatForm /> document.getElementById("container"));
