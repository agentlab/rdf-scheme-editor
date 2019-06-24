import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Select, Button } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

const server_URL = 'https://agentlab.ru/rdf4j-server';
const url_prefix = 'https://agentlab.ru/rdf4j-workbench';


const DeleteForm = () => {
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState({})

  const getRepositories = async () => {
    return await fetch(`${server_URL}/repositories`, {
      method: 'GET',
      headers: {
        Accept: 'application/sparql-results+json',
      },
    })
      .then((data) => data.json())
      .then(
        (data) =>
          data.results.bindings.map((binding) => ({
            id: binding.id.value,
            title: binding.title.value,
          })),
        (error) => {
          console.error(error);
        },
      )
      .then((data) => {
        setOptions(data);
        data.length > 0 ? setSelectedOption(data[0]) : null;
      });
  }

  const deleteRepository = async (repID) => {
    //return fetch(`${url_prefix}/repositories/${repID}/update`, {
    return await fetch(`${url_prefix}/repositories/NONE/delete?id=${repID}`, {
      method: 'POST',
      //body: 'update=' + encodeURIComponent('DELETE DATA' + '{' + '<http://exampleSub> <http://exampleSub> 103' + '}'),
    })
      .then(() => {
        setOptions(options.filter((option) => option.id != repID))
        alert('ready')
      })
      .catch((error) => console.error(error))
  }

  const changeOptionHandler = (option) => {
    setSelectedOption(option)
  }

  const deleteClickHandler = () => {
    deleteRepository(selectedOption)
  }

  useEffect(() => {
    getRepositories();
  }, []);

  return (
    <Form inline>
      <FormItem>
        <Select
          showSearch
          style={{ width: 500 }}
          placeholder='Repository:'
          filterOption={options}
          onChange={changeOptionHandler}
        >
          {
            options.map((option, i) => (
              <Option value={option.id} key={i}>{option.id + "-" + option.title}</Option>
            ))
          }
        </Select>
      </FormItem>
      <FormItem>
        <Button
          type='danger'
          ghost
          onClick={deleteClickHandler}
        >
          Delete
</Button>
      </FormItem>
    </Form>
  )
}

storiesOf('Delete Repository', module).add('Select', () => <DeleteForm />);