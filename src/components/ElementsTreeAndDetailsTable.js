import React, { useContext } from "react";
//import PropTypes from 'prop-types';

import {Card, Input, Table, Tree} from "antd";
import "antd/dist/antd.css";
import SplitPane from "react-split-pane";

import {ElementsTreeAndDetailsTableContext} from "./ElementsTreeAndDetailsTableContext";

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

// все тестовые данные должны быть вынесены в Story и тут их быть не должно


const renderTreeNodes = (data, searchValue) => data.map((item) => {
  const index = item.title.toLowerCase().indexOf(searchValue);
  const beforeStr = item.title.substr(0, index);
  const middleStr = item.title.substr(index, searchValue.length);
  const afterStr = item.title.substr(index + searchValue.length);
  const title = index > -1 ? (
    <span>
      {beforeStr}
      <span style={{color: '#f50'}}>{middleStr}</span>
      {afterStr}
    </span>
  ) : <span>{item.title}</span>;

  if (item.children) {
    return (
      <TreeNode title={title} key={item.key} dataRef={item}>
        {renderTreeNodes(item.children, searchValue)}
      </TreeNode>
    );
  }
  return <TreeNode title={title} key={item.key} dataRef={item} />;
})


const divStyle = {
  padding: "5px"
};

const ElementsTreeAndDetailsTable = (props) => {
  // это и есть все входные данные компонента из родительского контекста
  // пропсы почти не используются
  const { elementsTreeData, onTreeSelect, 
          detailsColumns, detailsData, 
          expandedKeys, searchValue, onSearchInputChanged, onExpandKeys } = useContext(ElementsTreeAndDetailsTableContext);

  return (
    <SplitPane split="vertical" defaultSize="20%" style={{position: "relative"}} size="small">
      <div style={divStyle}>
        <Card title={props.elementsHeader} className="gx-card" size="small" >
          <Search style={{marginBottom: 8}} size="small" placeholder="Search" onChange={onSearchInputChanged} />
          <Tree size="small" onSelect={onTreeSelect}  expandedKeys={expandedKeys}>
            {elementsTreeData && renderTreeNodes(elementsTreeData, searchValue)}
          </Tree>
        </Card>
      </div>
      <div style={divStyle}>
        <Table className="gx-table-responsive" bordered pagination={false} size="small"
          title={() => <b>{props.detailsHeader}</b>}
          columns={detailsColumns} dataSource={detailsData} />
      </div>
    </SplitPane>
  );
};

// тут должны бы быть описаны пропстайпы
// но с Hooks API хз как делать валидацию и надо ли ее делать

/*ElementsTreeAndDetailsTable.propTypes = {
  elementsTreeData: PropTypes.object.isRequired,
  detailsColumns: PropTypes.object.isRequired,
  detailsData: PropTypes.object.isRequired
};

ElementsTreeAndDetailsTable.defaultProps = {
  elementsTreeData: [{}],
  detailsColumns: [{}],
  detailsData: [{}]
}*/

export default ElementsTreeAndDetailsTable;
