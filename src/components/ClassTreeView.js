import React from "react";
import {Card, Input, Tree} from "antd";
import { DefaultSparqlClient } from "../services/DefaultSparqlClient.ts";
import fetch from 'isomorphic-unfetch';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

const x = 6;
const y = 5;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({title: key, key});
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const testQueryReq = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX oslc: <http://open-services.net/ns/core#>

SELECT ?x
WHERE {
 ?x a rdfs:Class .
 ?x rdfs:isDefinedBy oslc:
}`;

var testQuery = `
      PREFIX eurovoc: <http://publications.europa.eu/ontology/euvoc#>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX eschema: <http://eurovoc.europa.eu/schema#>

      SELECT ?domain ?domainLabel ?thesaurus ?thesaurusLabel
      WHERE {
        ?thesaurus rdf:type eschema:MicroThesaurus .
        ?thesaurus skos:prefLabel ?thesaurusLabel .
        ?domain rdf:type eschema:Domain .
        ?domain skos:prefLabel ?domainLabel .
        FILTER(langMatches(lang(?domainLabel), "###lang###"))
        FILTER(langMatches(lang(?thesaurusLabel), "###lang###"))
        FILTER(strStarts(?domainLabel, substr(?thesaurusLabel, 1, 2)))
      }
    `;

const testServerUrlReq = "https://agentlab.ru/rdf4j-workbench/repositories/reqs";
const testServerUrl = "https://agentlab.ru/rdf4j-server/repositories/23";

const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({key, title: key});
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
generateList(gData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

class ClassTreeView extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  };
  onExpand = async (expandedKeys) => {
    var res = await fetch(testServerUrlReq + '?query=' + encodeURIComponent(testQueryReq), 
      {
        Accept: 'application/sparql-results+json'
      });
    //console.log(testServerUrl + '?query=' + encodeURIComponent(testQuery));
    var body = await res.text();
    console.log(body);
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.key.indexOf(value) > -1) {
        return getParentKey(item.key, gData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: false,
    });
  };

  render() {
    const {searchValue, expandedKeys, autoExpandParent} = this.state;
    const loop = data => data.map((item) => {
      const index = item.key.indexOf(searchValue);
      const beforeStr = item.key.substr(0, index);
      const afterStr = item.key.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{color: '#f50'}}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.key}</span>;
      if (item.children) {
        return (
          <TreeNode key={item.key} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title}/>;
    });
    return (
      <Card title="Searchable" className="gx-card">
        <Search style={{marginBottom: 8}} placeholder="Search" onChange={this.onChange}/>
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
        >
          {loop(gData)}
        </Tree>
      </Card>
    );
  }
}

export default ClassTreeView;
