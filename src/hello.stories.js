import React from 'react';
import { storiesOf } from '@storybook/react';

import "antd/dist/antd.css";

import {
    Form, Select, Row, Col, Input, Button, Typography
} from 'antd';

const { Option } = Select;
const { Title } = Typography;

class App extends React.Component {

    _formOptions = [
        'In Memory Store',
        'In Memory Store RDF Schema',
        'In Memory Store RDF Schema and Direct Type Heirarchy'
    ];

    render() {
        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={12} offset={5}>
                        <Title span={5}>New Repository</Title>
                    </Col>
                </Row>
                <Form.Item label="Type" hasFeedback>
                    <Select defaultValue="0">
                        {this._formOptions.map((option, index) => (
                            <Option value={index.toString()}> {option} </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Id">
                    <Row>
                        <Col span={12}>
                            <Input id="Id" />
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item label="Title">
                    <Input id="Title"/>
                </Form.Item>
                <Row>
                    <Col span={5} offset={5}>
                        <Button type="primary" htmlType="submit">
                            Next
                        </Button>
                    </Col>
                    <Col span={6} offset={5}>
                        <Button offset={8} type="primary" htmlType="submit">
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const WrappedApp = Form.create({ name: 'coordinated' })(App);

storiesOf('Form', module)
    .add('with form', () => (
        <WrappedApp />
    ));