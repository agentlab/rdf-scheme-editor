import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import RepositoriesTable from '../components/Repositories.stories';

const server_URL = 'https://agentlab.ru/rdf4j-server';
const repositories_prefix = '/repositories';
const props = ['id', 'title', 'uri', 'readable', 'writable'];

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

test('Renders correctly if data is correct', () => {
  configure({ adapter: new Adapter() });
  const output = shallow(<RepositoriesTable props={server_URL.concat(repositories_prefix)} />);
  expect(shallowToJson(output)).toMatchSnapshot({
    dataSource: expect.any(Array),
  });
});

test('Render empty table if no data', () => {
  configure({ adapter: new Adapter() });
  const output = shallow(<RepositoriesTable props={server_URL.concat(repositories_prefix).concat('WRONG_POSTFIX')} />);
  expect(shallowToJson(output)).toMatchSnapshot({
    // empty table data
  });
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
