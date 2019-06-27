import * as React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { host } from 'storybook-host';
import { Helper } from './.helpers/Helper';
//import { Toolkit } from '../src/Toolkit';

//include the SCSS for the demo
import './.helpers/demo.scss';

//Toolkit.TESTING = true;

setOptions({
  name: 'STORM React Diagrams',
  url: 'https://github.com/projectstorm/react-diagrams',
  addonPanelInRight: true,
});

storiesOf('Редактор блочных диаграмм', module).add(
  'Diagram Editor',
  Helper.makeDemo(require('./diagramEditor/index').default()),
);
