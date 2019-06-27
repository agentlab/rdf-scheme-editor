import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import RepositoriesTable from '../components/Repositories.stories';

const server_URL = 'https://agentlab.ru/rdf4j-server';
const repositories_prefix = '/repositories';
const props = ['id', 'title', 'uri', 'readable', 'writable'];

test('Renders corectly', () => {
  configure({ adapter: new Adapter() });
  const output = shallow(<RepositoriesTable />);
  expect(shallowToJson(output)).toMatchSnapshot();
});


let webData = fetch(server_URL.concat(repositories_prefix), {
  method: 'GET',
  headers: {
    Accept: 'application/sparql-results+json',
  },
});

let wrongWebData = fetch(server_URL.concat(repositories_prefix).concat('WRONG_POSTFIX'), {
  method: 'GET',
  headers: {
    Accept: 'application/sparql-results+json',
  },
});

test('Web request is made correctly', async () => {
  await webData.then((r) => {
    expect(r.status).toEqual(200);
  });
});

test('Web request to a wrong address is caught', async () => {
  await wrongWebData.then((r) => {
    expect(r.status).not.toEqual(200);
  });
});

test('The repositories information is correct', async () => {
  const data = await webData.then((r) => r.json());

  expect(data).not.toBeUndefined();

  data.results.bindings.forEach((dataElement) => {
    props.forEach((property) => {
      expect(dataElement).toHaveProperty(property);
    });
  });
});
