import React from 'react';
import { storiesOf } from '@storybook/react';
import {
    Form, Select, Button,
  } from 'antd';
  
const Option = Select.Option;
const FormItem = Form.Item;

storiesOf('Delete Repository', module)
  .add('Select', () => (      
    <Form inline>
        <FormItem>
        <Select
            showSearch
            style={{ width: 500 }} 
            placeholder="Repository:"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
            <Option value="adms-catalog">adms-catalog
										-
										ADMS Catalog</Option>
            <Option value="reqs">reqs
										-
										Requirements</Option>
            <Option value="jhgf">jhgf
										-
										jh</Option>
            <Option value="configurations">configurations
										-
										Portal Configurations</Option>
                                        <Option value="adms-catalog">adms-catalog
										-
										ADMS Catalog</Option>
            <Option value="eurovoc_ru">eurovoc_ru
										-
										EuroVoc (russian edition) in SKOS Core Concepts</Option>
            <Option value="onem2m">onem2m
										-
										OneM2M IoT Repository</Option>
            <Option value="onem2m2">onem2m2
										-
										OneM2M IoT Repository</Option>
                                        <Option value="adms-catalog">adms-catalog
										-
										ADMS Catalog</Option>
            <Option value="datasets">datasets
										-
										Datasets configuration fot portal</Option>
            <Option value="23">23
										-
										Native store with RDF Schema and direct type inferencing</Option>
            <Option value="mappings">mappings
										-
										Portal CVS Mappings</Option>
            <Option value="adms3">adms3
										-
										Native store with RDF Schema and direct type inferencing</Option>
            <Option value="adms4">adms4
										-
										ADMS 4 Native Java</Option>
            <Option value="users">users
										-
										Portal Users</Option>
            <Option value="eurovoc_core">eurovoc_core
										-
										EuroVoc in SKOS Core Concepts</Option> 
                                        <Option value="23">23
										-
										Native store with RDF Schema and direct type inferencing</Option>
            <Option value="rere">rere
										-
										test_feature</Option>
            <Option value="lov">lov
										-
										Linked Open Vocabularies</Option>
            <Option value="adms2">adms2
										-
										ADMS 2.01 Catalog</Option>                
        </Select>
        </FormItem>
        <FormItem>
        <Button type="danger" ghost>Delete</Button>
        </FormItem>
    </Form>
  ));