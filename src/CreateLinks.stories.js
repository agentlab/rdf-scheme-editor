import React from 'react';
import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import './index.css';

import {
    Form, Select, Row, Col, Input, Button, Typography
} from 'antd';

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

class CreateLinks extends React.Component {
    render() {
        return ( 
        	<Form layout={formLayout}>
        	    <Form.Item id = "type" {...formItemLayout} label= "Link type: ">
        	        <Layout>
        	            <Select defaultValue="type1" style={{ width: 120 }}>
        	            	<Option value="type1">type1</Option>
        	            	<Option value="type2">type2</Option>
        	            	<Option value="type3">type3</Option>
        	        	</Select>
        	        </Layout>
        	    </Form.Item>

        	    <Form.Item id = "tagret" {...formItemLayout} label= "Link target: ">
        	        <Layout>
        	        	<Radio>Link on requirement in:</Radio> 
        	            <Select defaultValue="source1" style={{ width: 120 }}>
        	            	<Option value="source1">source1</Option>
        	            	<Option value="source2">source2</Option>
        	            	<Option value="source3">source3</Option>
        	        	</Select>
        	        	<Radio>Link on web page</Radio> 
        	        </Layout>
        	    </Form.Item>

        	    <Form.Item id = "find" {...formItemLayout} label= "Find: ">
        	        <Layout>
        	        	<Radio>Requirements</Radio> 
        	        	<Radio>Strings in module:</Radio> 
        	            <Select defaultValue="source1" style={{ width: 120 }}>
        	            	<Option value="source1">source1</Option>
        	            	<Option value="source2">source2</Option>
        	            	<Option value="source3">source3</Option>
        	        	</Select>
        	        </Layout>
        	    </Form.Item>

        	    <Form.Item id = "findString" {...formItemLayout} label= "Find by ID or by name: ">
        	        <Layout>
        	        	<Input readOnly style={{ width:  '50%' }} ></Input>
        	        </Layout>
        	    </Form.Item>

        	    <Form.Item id = "selectRecent" {...formItemLayout} label= "Select requirement from recently viewed:">
        	        <Layout>
        	        	<Input readOnly style={{ width:  '50%' }} ></Input>
        	        </Layout>
        	    </Form.Item>
        </Form>
        );
    }
}

const WrappedApp = Form.create({ name: 'coordinated' })(App);

storiesOf('Form', module).add('with table', () => (
   <WrappedApp/>
));
