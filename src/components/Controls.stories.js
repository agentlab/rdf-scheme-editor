import React from 'react';
import { storiesOf } from '@storybook/react';

import ElementsTreeAndDetailsTable from "./ElementsTreeAndDetailsTable";

const elementsTreeData = [{
  title: '0-0',
  key: '0-0',
  children: [{
    title: '0-0-0',
    key: '0-0-0',
    children: [
      { title: '0-0-0-0', key: '0-0-0-0' },
      { title: '0-0-0-1', key: '0-0-0-1' },
      { title: '0-0-0-2', key: '0-0-0-2' },
    ],
  }, {
    title: '0-0-1',
    key: '0-0-1',
    children: [
      { title: '0-0-1-0', key: '0-0-1-0' },
      { title: '0-0-1-1', key: '0-0-1-1' },
      { title: '0-0-1-2', key: '0-0-1-2' },
    ],
  }, {
    title: '0-0-2',
    key: '0-0-2',
  }],
}, {
  title: '0-1',
  key: '0-1',
  children: [
    { title: '0-1-0-0', key: '0-1-0-0' },
    { title: '0-1-0-1', key: '0-1-0-1' },
    { title: '0-1-0-2', key: '0-1-0-2' },
  ],
}, {
  title: '0-2',
  key: '0-2',
}];

const detailsColumns = [{
  title: 'Имя',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:void(0);">{text}</a>,
}, {
  title: 'Тип данных',
  dataIndex: 'dataType',
  key: 'dataType',
}, {
  title: 'Описание',
  dataIndex: 'description',
  key: 'description',
}];

const detailsData = [{
  key: '1',
  name: 'Приоритет',
  dataType: 'число',
  description: 'Приоритет требования',
}, {
  key: '2',
  name: 'Риск',
  dataType: 'число',
  description: 'Риск требования',
}];

// в отдельной функции маппинг изменения одного компонента на изменение состояния другого

storiesOf('Редактор атрибутов классов', module)
  .add('Без данных', () => <ElementsTreeAndDetailsTable />)
  .add('С корректными данными', () => <ElementsTreeAndDetailsTable elementsTreeData={elementsTreeData} detailsColumns={detailsColumns} detailsData={detailsData} />);
