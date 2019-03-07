import { storiesOf } from '@storybook/react';
import React from 'react';
import 'antd/dist/antd.css';
import {Form, Input, Button, Badge} from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const { TextArea } = Input;

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
const formItemLayout = {
labelCol: { span: 4 },
wrapperCol: { span: 14 },
};

return (
<div>
<Form layout={formLayout}>
<FormItem>
    <p>WARNING: Specifying only a context will remove all statements belonging to that context. This operation cannot be undone.<br />
    Please specify subject, predicate, object and/or context of the statements that should be removed. Empty fields match with any subject, predicate, object or context. URIs,<br /> 
    bNodes and literals should be entered using the N-Triples encoding. Example values in N-Triples encoding are:
    </p>
</FormItem>
<Form.Item
>
<div>
    <ul>
    <Badge status="success" text="URI:<http://foo.com/bar>"></Badge>
    <br />
    <Badge status="error" text="BNode: _:nodeID" />
    <br />
    <Badge status="processing" text="Literal: Hello , Hello@en and Hello^^<http://bar.com/foo>" />
    </ul>
</div>
</Form.Item>
<Form.Item
label="Subject: "
{...formItemLayout}
>
<Input readOnly placeholder="Мы любим Вас, Алексей Михайлович" />
</Form.Item>
<Form.Item
label="Predicate: "
{...formItemLayout}
>
<Input readOnly placeholder="И тут!" />
</Form.Item>
<Form.Item
label="Object: "
{...formItemLayout}
>
<div>
<TextArea readOnly placeholder="И тут! Не переживайте, мне не лень это писать" autosize={{ minRows: 2, maxRows: 6 }} />
</div>
</Form.Item>
<Form.Item
label="Context: "
{...formItemLayout}
>
<Input readOnly placeholder="Спасибо ИУ3 за React!" />
</Form.Item>
<Form.Item wrapperCol={{ span: 8, offset: 4 }}
>
<Button type="primary" >Remove</Button>
</Form.Item>
</Form>
</div>
);
}
}

storiesOf('RemoveStatements', module)
.add('RemoveStatements', () => (
<FormLayoutDemo />
))