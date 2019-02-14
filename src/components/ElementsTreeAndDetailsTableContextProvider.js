import React, { useEffect, useState } from 'react';

import ElementsTreeAndDetailsTable from "./ElementsTreeAndDetailsTable";
import {ElementsTreeAndDetailsTableContext} from "./ElementsTreeAndDetailsTableContext";



// API search function
function executeSparql(url, query, callback, onErr) {
  var queryUrl = url + '?query=' + encodeURIComponent(query) + '&queryLn=sparql';
  console.log("queryUrl=", queryUrl);

  return fetch(queryUrl, 
    { 
      headers: {
        Accept: 'application/sparql-results+json'
      } 
    })
    .then(r => r.json())
    .then(r => {
      callback(r.results);
    })
    .catch(error => {
      onErr(error);
      return [];
    });
}


export function ElementsTreeAndDetailsTableContextProvider(props) {
  const {url, query, detailsQuery, detailsColumns, rootElement} = props;

  const [elementsTreeData, setElementsTreeData] = useState([]);
  const [detailsData, setDetailsData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  // можно делать интернационализацию, можно узнавать выбранную локаль и выбирать rdf лейблы по локали
  // const { t, i18n } = useTranslation();

  useEffect(
    () => {
      executeSparql(url, query,
        results => {
          //console.log("results.bindings=", results.bindings);
          var nodeList = rootElement;
          nodeList[0].children = results.bindings.map((item) => {
            return({
              title: (item.label ? item.label.value : item.type.value),
              key: item.type.value
            });
          });
          setElementsTreeData(nodeList);
        },
        error => {
          console.error(error);
        }
      )
    },
    [url, query]
  );

  const onTreeSelect = (selectedKeys, info) => {
      // console.log('onTreeSelect.info=', info);
      // console.log('onTreeSelect.selectedKeys=', selectedKeys);
      // console.log(rootElement);

      var query = detailsQuery.replace("###", selectedKeys[0]);
      //console.log('onTreeSelect.query=', query);

      executeSparql(url, query,
        results => {
          //console.log("results2.bindings=", results.bindings);

          var list = results.bindings.map((item, index) => {
            return({
              pred: item.pred.value,
              obj: item.obj.value,
              key: index
            });
          });
          setDetailsData(list);
        },
        error => {
          console.error(error);
        }
      )
  }

  const getExpandedKeys = (value, node, parentKey) => {
    var keys = []
    if (node.title.toLowerCase().indexOf(value) > -1) {
      keys.push(parentKey);
    }
    node.children && node.children.forEach((child) => {
      keys = keys.concat(getExpandedKeys(value, child, node.key));
    });
    return keys;
  }

  const onSearchInputChanged = (e) => {
    const value = e.target.value.toLowerCase();
    const expandedKeys = getExpandedKeys(value, rootElement[0], rootElement[0].key)
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setAutoExpandParent(true);
    setSearchValue(value);
    setExpandedKeys(expandedKeys);
  }

  const onExpandKeys = (expandedKeys) => {
    setAutoExpandParent(false);
    setExpandedKeys(expandedKeys);
  }

  const value = { elementsTreeData, onTreeSelect, 
                  detailsColumns, detailsData, 
                  expandedKeys, onSearchInputChanged, searchValue, onExpandKeys, autoExpandParent };

  return <ElementsTreeAndDetailsTableContext.Provider value={value}>{props.children}</ElementsTreeAndDetailsTableContext.Provider>
}

