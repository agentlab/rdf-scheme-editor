import React from "react";
import {Card, Input, Tree} from "antd";
import { DefaultSparqlClient } from "../services/DefaultSparqlClient.ts";
import fetch from 'isomorphic-unfetch';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;


const testQueryReq = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX oslc: <http://open-services.net/ns/core#>

SELECT ?x
WHERE {
 ?x a rdfs:Class .
 ?x rdfs:isDefinedBy oslc:
}`;


const testServerUrlReq = "https://agentlab.ru/rdf4j-server/repositories/reqs";

var dataList = [];

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
    treeData: [
      {title: '0', key: '0'},
      {title: '1', key: '1'},
      {title: '2', key: '2', isLeaf: true},
    ],
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  };
  onLoadData = (treeNode) => {
    return new Promise( async (resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      var res = await fetch(testServerUrlReq + 
        '?query=' + 
        encodeURIComponent(testQueryReq) + 
        '&queryLn=sparql', 
        { 
          headers: {
            Accept: 'application/sparql-results+json'
          } 
        });
      console.log(testServerUrlReq + '?query=' + encodeURIComponent(testQueryReq) + '&queryLn=sparql');
      var body = await res.json();
      console.log(body);
      var nodeList = [];
      body.results.bindings.map((item) => {
        const index = item.x.value.indexOf('#');
        const afterStr = item.x.value.substr(index);
        nodeList.push({
          title: afterStr,
          key: item.x.value
        });
      });
      treeNode.props.dataRef.children = nodeList;
      // treeNode.props.dataRef.children = [
      //   {title: `${treeNode.props.eventKey}-0`, key: `${treeNode.props.eventKey}-0`, isLeaf: true},
      //   {title: `${treeNode.props.eventKey}-1`, key: `${treeNode.props.eventKey}-1`},
      // ];
      this.setState({
        treeData: [...this.state.treeData],
        expandedKeys: [...this.state.expandedKeys]
      });
      resolve();
    });
  };
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.key.indexOf(value) > -1) {
        return getParentKey(item.key, this.state.treeData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
      treeData: [...this.state.treeData]
    });
  };

  renderTreeNodes = (data) => {
    const {searchValue, expandedKeys, autoExpandParent} = this.state;
    generateList(this.state.treeData);
    return data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{color: '#f50'}}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;

      if (item.children) {
        return (
          <TreeNode title={title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={title} key={item.key} isLeaf={item.isLeaf} dataRef={item}/>;
    });
  };

  render() {
    return (
      <Card title="LoadData" className="gx-card">
        <Search style={{marginBottom: 8}} placeholder="Search" onChange={this.onChange}/>
        <Tree 
          onExpand={this.onExpand}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          loadData={this.onLoadData}
        >
          {this.renderTreeNodes(this.state.treeData)}
        </Tree>
      </Card>
    );
  }
}


export default ClassTreeView;
