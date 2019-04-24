import React from 'react';
import { storiesOf } from '@storybook/react';

import "antd/dist/antd.css";

import {
    Form, Select, Row, Col, Input, Button, Typography
} from 'antd';

const { Option } = Select;
const { Title } = Typography;

class NewRepository extends React.Component {

    FormOptions = [
        'In Memory Store',
        'In Memory Store RDF Schema',
        'In Memory Store RDF Schema and Direct Type Hierarchy',
        'In Memory Java Store with basic SPIN support',
        'In Memory Store with Lucene support',
        'In Memory Store with RDFS+SPIN support',
        'In Memory Store with RDFS+SPIN+Lucene support',
        'In Memory Store Custom Graph Query Inference',
        'Native Java Store',
        'Native Java Store RDF Schema',
        'Native Java Store RDF Schema and Direct Type Hierarchy',
        'Native Java Store Custom Graph Query Inference',
        'Native Java Store with basic SPIN support',
        'Native Java Store with Lucene support',
        'Native Java Store with RDFS+SPIN support',
        'Native Java Storewith RDFS+SPIN+Lucene support',
        'Remote RDF Store',
        'SPARQL endpoint proxy',
        'Federation Store'
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
                        {this.FormOptions.map((option, index) => (
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

const WrappedApp = Form.create({ name: 'coordinated' })(NewRepository);

storiesOf('Form', module)
    .add('New Repository Form', () => (
        <WrappedApp />
    ));