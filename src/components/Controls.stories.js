import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { useTranslation } from 'react-i18next';

import ElementsTreeAndDetailsTable from "./ElementsTreeAndDetailsTable";
import {ElementsTreeAndDetailsTableContext} from "./ElementsTreeAndDetailsTableContext";
import {ElementsTreeAndDetailsTableContextProvider} from "./ElementsTreeAndDetailsTableContextProvider";

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

const expandedKeys = [];


// в отдельной функции маппинг изменения одного компонента на изменение состояния другого

const detailsQuery = 
`SELECT ?pred ?obj
WHERE {
 <###> ?pred ?obj
}`;



storiesOf('Редактор атрибутов classov', module)
//  .add('Без данных', () => <ElementsTreeAndDetailsTable />) // эта штука без контекста не работает и не факт, что должна
  .add('С корректными данными иерархии классов', () => 
    <ElementsTreeAndDetailsTableContextProvider
      url={"https://agentlab.ru/rdf4j-server/repositories/reqs"}
      query={`PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX oslc: <http://open-services.net/ns/core#>
      
      SELECT DISTINCT ?type ?label
      WHERE {
       ?type a rdfs:Class .
       ?type rdfs:isDefinedBy oslc:
       OPTIONAL {
         ?type rdfs:label ?label .
         FILTER (lang(?label) = "" || lang(?label) = "en")
       }
      }`}
      detailsQuery={detailsQuery}
      detailsColumns={[{
        title: 'Параметр',
        dataIndex: 'pred',
        key: 'pred',
      }, {
        title: 'Значение',
        dataIndex: 'obj',
        key: 'obj',
      }]}
      rootElement={[{
        title: 'Class',
        key: 'rdfs:Class',
        children: [{}]
      }]} >
      <ElementsTreeAndDetailsTable elementsHeader={"Классы"} detailsHeader={"Детали класса"} />
    </ElementsTreeAndDetailsTableContextProvider>
  )
  .add('С корректными данными иерархии свойств', () => 
    <ElementsTreeAndDetailsTableContextProvider
      url={"https://agentlab.ru/rdf4j-server/repositories/reqs"}
      query={`PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX oslc: <http://open-services.net/ns/core#>
      
      SELECT DISTINCT ?type ?label
      WHERE {
       ?type a rdf:Property .
       OPTIONAL {
        ?type rdfs:label ?label .
        FILTER (lang(?label) = "" || lang(?label) = "en")
       }
      }`}
      detailsQuery={detailsQuery}
      detailsColumns={[{
        title: 'Параметр',
        dataIndex: 'pred',
        key: 'pred',
      }, {
        title: 'Значение',
        dataIndex: 'obj',
        key: 'obj',
      }]}
      rootElement={[{
        title: 'Property',
        key: 'rdfs:Property',
        children: [{}]
      }]} >
      <ElementsTreeAndDetailsTable 
          elementsTreeData={elementsTreeData} 
          detailsColumns={detailsColumns} 
          detailsData={detailsData}  />
    </ElementsTreeAndDetailsTableContextProvider>
  );
