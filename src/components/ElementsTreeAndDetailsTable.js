import React, { useContext } from "react";
//import PropTypes from 'prop-types';

import {Card, Input, Table, Tree} from "antd";
import "antd/dist/antd.css";
import SplitPane from "react-split-pane";

import {ElementsTreeAndDetailsTableContext} from "./ElementsTreeAndDetailsTableContext";

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

// все тестовые данные должны быть вынесены в Story и тут их быть не должно


const renderTreeNodes = data => data.map((item) => {
  if (item.children) {
    return (
      <TreeNode title={item.title} key={item.key} dataRef={item}>
        {renderTreeNodes(item.children)}
      </TreeNode>
    );
  }
  return <TreeNode {...item} />;
})


const divStyle = {
  padding: "5px",
  overflow: "auto"
};

const ElementsTreeAndDetailsTable = (props) => {
  // это и есть все входные данные компонента из родительского контекста
  // пропсы почти не используются
  const { elementsTreeData, onTreeSelect, detailsColumns, detailsData } = useContext(ElementsTreeAndDetailsTableContext);

  return (
    <SplitPane split="vertical" defaultSize="20%" style={{position: "relative"}} size="small">
      <div style={divStyle}>
        <Card title={props.elementsHeader} className="gx-card" size="small" style={{ minWidth: "fit-content" }}>
          <Search style={{marginBottom: 8}} size="small" placeholder="Search" />
          <Tree size="small" onSelect={onTreeSelect}>
            {elementsTreeData && renderTreeNodes(elementsTreeData)}
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
