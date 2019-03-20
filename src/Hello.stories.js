import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import { Table, Input, Select, Checkbox } from 'antd';
import { Z_BLOCK } from 'zlib';



const Option = Select.Option;
const { TextArea } = Input;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}






storiesOf('Explore', module)
  .add('Query', () => (
    <div>
      <table cellSpacing={0}>
        <tbody>
          <tr>
            <th>
              <text>Query Language:</text>
            </th>
            <td>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a language"
                optionFilterProp=""
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="firstL">SPARQL</Option>
                <Option value="secondL">SeRQL</Option>
              </Select>
            </td>
          </tr>
          <tr>
            <th>
              <text>Query:</text>
            </th>
            <td>
              <TextArea cols={100} rows={4} ></TextArea>
            </td>
          </tr>
          <tr>
            <th>
              <text>Result per page:</text>
            </th>
            <td>
              <Select
                showSearch
                style={{ width: 100 }}
                optionFilterProp=""
                onChange={handleChange}
                onBlur={handleBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="firstN" selected>All</Option>
                <Option value="secondN">10</Option>
                <Option value="3N">50</Option>
                <Option value="4N">100</Option>
                <Option value="5N">200</Option>
              </Select>
            </td>
          </tr>
          <tr>
            <th>
              <text>Actions Options:</text>
            </th>
            <td>
              <Checkbox checked="checked" >Include inferred statements</Checkbox>
            </td>
            <td>
              <Checkbox>Save privately(do not share)</Checkbox>
            </td>
          </tr>
          <tr>
            <th>
              <text>Actions:</text>
            </th>
            <th>
              <div style={{ display: 'inline-block' }}>
                <Button>Clear</Button>
                <Button>Execute</Button>
                <Button>Save query</Button>
                <TextArea cols={10} rows={1}></TextArea>
              </div>
            </th>
          </tr>
        </tbody>
      </table >

      <h1>
        <a>
          <text>Copyright © 2015 Eclipse RDF4J Contributors</text>
        </a>
      </h1>
    </div>

  ));