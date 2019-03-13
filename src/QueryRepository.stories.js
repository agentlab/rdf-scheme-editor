import { storiesOf } from "@storybook/react";
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {
  Select, Button, Table, Input, Checkbox
} from 'antd';


class QueryRepository extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    return (
    <div style={{ padding: '24px'}}>
    	<table>
    		<tr>
    			<td>
    				<span style={{ marginRight: '10px' }}> Query Language: </span>
    			</td>
    			<td>
    				<Select labelInValue defaultValue={{ key: "SPARQL" }} style={{ width: 100}}>
            			<Option value="SPARQL">SPARQL</Option>
             			<Option value="SeRQL">SeRQL</Option>
            		</Select>
    			</td>
    		</tr>
    		<tr>
    			<td>
    			    <span>Query:</span>
    			</td>
    			<td>
    				<Input.TextArea style={{ width: "900px", height: "300px" }}/>

    			</td>
    		</tr>
    		<tr>
    			<td>
	             	<span>Results per page:</span>
    			</td>
    			<td>
    				<Select defaultValue="100" style={{ width: 80 }}>
		        		<Option value="All">All</Option>
		        		<Option value="10">10</Option>
		         		<Option value="50">50</Option>
		        		<Option value="100">100</Option>
		         		<Option value="200">200</Option>	
        			</Select>
    			</td>
    		</tr>
    		<tr>
    			<td>
    				<span>Results per page:</span>
    			</td>
    			<td>
    				<Checkbox checked={true}>Include inferred statements</Checkbox>
    				<Checkbox disabled>Save privately (do not share)</Checkbox>
    			</td>
    		</tr>
    		<tr>
				<td>
					<span>Actions:</span>
				</td>
				<td>
					<Button id="Clear" style={{marginRight: "5px"}}>Clear</Button>
					<Button id="Execute" style={{marginRight: "5px"}}>Execute</Button>
					<Button id={"saver"} style={{marginRight: "5px"}} disabled={true}>Save query</Button>
					<Input style={{ width: "300px" }}></Input>
				</td>
    		</tr>
    	</table>
    </div>
    );
  }
}

//const WrappedDemo = Form.create({ name: 'validate_other' })(Demo);

//ReactDOM.render(<WrappedDemo />, document.getElementById('container'));
storiesOf("Query Repository", module).add("info", () => <QueryRepository />);

