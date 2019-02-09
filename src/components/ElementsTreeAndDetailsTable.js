import React from "react";
import PropTypes from 'prop-types';

import {Card, Input, Table, Tree} from "antd";
import "antd/dist/antd.css";
import SplitPane from "react-split-pane";

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

// все тестовые данные должны быть вынесены в стори и тут их быть не должно


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
  padding: "5px"
};

const ElementsTreeAndDetailsTable = (props) => {
  return (
    <div>
      <SplitPane split="vertical" defaultSize="20%" style={{position: "relative"}} size="small">
        <div style={divStyle}>
          <Card title="Elements" className="gx-card" size="small" >
            <Search style={{marginBottom: 8}} size="small" placeholder="Search" />
            <Tree size="small" >
              {renderTreeNodes(props.elementsTreeData)}
            </Tree>
          </Card>
        </div>
        <div style={divStyle}>
          <Table className="gx-table-responsive" bordered pagination={false} size="small"
            title={() => <b>Element details</b>}
            columns={props.detailsColumns} dataSource={props.detailsData} />
        </div>
      </SplitPane>
    </div>
  );
};

// тут должны быть описаны пропстайпы

ElementsTreeAndDetailsTable.propTypes = {
  elementsTreeData: PropTypes.object.isRequired,
  detailsColumns: PropTypes.object.isRequired,
  detailsData: PropTypes.object.isRequired
};

ElementsTreeAndDetailsTable.defaultProps = {
  elementsTreeData: [{}],
  detailsColumns: [{}],
  detailsData: [{}]
}


export default ElementsTreeAndDetailsTable;
