/*
    Страница Repositories/New repository
    Baisarov A.A. IU3-62
*/
import { storiesOf } from '@storybook/react';
import React from "react";
import { Layout } from 'antd';
import { Select, Input, Button } from 'antd';

const { Content } = Layout;
const Option = Select.Option;

class NewRepository extends React.Component {

    listOfOption = [
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
        'Federation Store',
    ];

    render() {
        return (
            <Layout style={MainLayoutStyle}>
                <Content style={ContentStyle}>
                    {/* 
                    <PropertyEditor />
                    */}

                    <h1 style={H1TitleStyle}>New Repository</h1>
                    <hr />

                    <Select
                        defaultValue="0"
                        style={SelectStyle}
                    >
                        {this.listOfOption.map((option, index) => (
                            <Option value={index.toString()}> {option} </Option>
                        ))}
                    </Select>

                    <br />
                    <Input placeholder="ID" style={InputIdStyle} mode="horizontal" />
                    <br />
                    <Input placeholder="Title" style={InputTitleStyle} mode="horizontal" />
                    <br />

                    <div style={DivStyle}>
                        <Button style={ButtNextStyle}>Next</Button>
                        <Button style={ButtCancelStyle}>Cancel</Button>
                    </div>

                </Content>
            </Layout>
        );
    }
}

const MainLayoutStyle = {
    marginLeft: 0,
    padding: '0',
}

//New Repository
const H1TitleStyle = {
    margin: 0,
}

const ContentStyle = {
    margin: '0 20px 0',
    overflow: 'initial',
}

//In memory store
const SelectStyle = {
    width: '100%',
    maxWidth: '500px',
    marginBottom: 10,
}

//ID
const InputIdStyle = {
    width: '100%',
    maxWidth: '500px',
    marginBottom: 10,
}

//Title
const InputTitleStyle = {
    width: '100%',
    maxWidth: '500px',
    marginBottom: 10,
}

//div
const DivStyle = {
    width: '100%',
    maxWidth: '550px',
}

//Next
const ButtNextStyle = {
    position: 'absolute',
}

//Cancel
const ButtCancelStyle = {
    marginLeft: '77.5%',
}

storiesOf('Issue #_1', module)
    .add('NewRepository', () => (
        <NewRepository />
    ))