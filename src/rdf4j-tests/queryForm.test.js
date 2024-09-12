import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';

configure({ adapter: new Adapter() });

import QueryForm from '../components/QueryForm.stories';

test('QueryForm', () => {
  const output = shallow(<QueryForm />);

  expect(shallowToJson(output)).toMatchSnapshot();

  const execute = output
    .children()
    .children()
    .children()
    .last()
    .children()
    .children()
    .children();
  console.log(shallowToJson(execute));
  expect(execute);
  execute.simulate('click');
  expect(shallowToJson(output)).toMatchSnapshot();
});
