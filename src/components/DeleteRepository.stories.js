import React from "react";
import { storiesOf } from "@storybook/react";
import { Form, Select, Button } from "antd";

const Option = Select.Option;
const FormItem = Form.Item;

const options = [
  {
    value: "adms-catalog",
    text: "adms-catalog - ADMS Catalog"
  },
  {
    value: "reqs",
    text: "reqs - Requirements"
  },
  {
    value: "jhgf",
    text: "jhgf - jh"
  },
  {
    value: "configurations",
    text: "configurations - Portal Configurations"
  },
  {
    value: "adms-catalog",
    text: "adms-catalog - ADMS Catalog"
  },
  {
    value: "eurovoc_ru",
    text: "eurovoc_ru - EuroVoc (russian edition) in SKOS Core Concepts"
  },
  {
    value: "onem2m",
    text: "onem2m - OneM2M IoT Repository"
  },
  {
    value: "onem2m2",
    text: "onem2m2 - OneM2M IoT Repository"
  },
  {
    value: "datasets",
    text: "datasets - Datasets configuration fot portal"
  },
  {
    value: "23",
    text: "23 - Native store with RDF Schema and direct type inferencing"
  },
  {
    value: "mappings",
    text: "mappings - Portal CVS Mappings"
  },
  {
    value: "adms3",
    text: "adms3 - Native store with RDF Schema and direct type inferencing"
  },
  {
    value: "adms4",
    text: "adms4 - ADMS 4 Native Java"
  },
  {
    value: "users",
    text: "users - Portal Users"
  },
  {
    value: "eurovoc_core",
    text: "eurovoc_core - EuroVoc in SKOS Core Concepts"
  },
  {
    value: "rere",
    text: "rere - test_feature"
  },
  {
    value: "lov",
    text: "lov - Linked Open Vocabularies"
  },
  {
    value: "adms2",
    text: "adms2 - ADMS 2.01 Catalog"
  }
];

storiesOf("Delete Repository", module).add("Select", () => (
  <Form inline>
    <FormItem>
      <Select
        showSearch
        style={{ width: 500 }}
        placeholder="Repository:"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options.map((option, i) => (
          <Option value={option.value}>{option.text}</Option>
        ))}
      </Select>
    </FormItem>
    <FormItem>
      <Button type="danger" ghost>
        Delete
      </Button>
    </FormItem>
  </Form>
));
