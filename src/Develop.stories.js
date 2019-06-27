import React from 'react';
import { storiesOf } from '@storybook/react';
import { Menu, Input, Checkbox, Button, Tree } from 'antd';
//import { Z_BLOCK } from 'zlib';
const { TreeNode } = Tree;

const treeData = [
  {
    title: 'Extractors',
    key: '1',
    children: [
      {
        title: 'Extractor1',
        key: '2',
      },
      {
        title: 'Extractor2',
        key: '3',
      },
      {
        title: 'Extractor3',
        key: '4',
      },
    ],
  },
  {
    title: 'Transformers',
    key: '5',
    children: [
      { title: 'Transformer1', key: '6' },
      { title: 'Transformer2', key: '7' },
      { title: 'Transformer3', key: '8' },
    ],
  },
];

//const Option = Select.Option;
//const { TextArea } = Input;
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Develop extends React.Component {
  renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  render() {
    return (
      <div>
        <div style={{ width: 256 }}>
          <h3>DPU Templates Tree</h3>
          <Button style={{ width: 256 }}>Create DPU template</Button>
          <div style={{ height: 10 }} />
          <Button style={{ width: 256 }}>Export DPU templates</Button>
          <div style={{ height: 10 }} />
          <Checkbox onChange={onChange}>Only private DPU templates</Checkbox>
          <div style={{ height: 10 }} />
          <Input placeholder='Type to filter tree' />
          <div style={{ height: 10 }} />
        </div>
        <Tree>{this.renderTreeNodes(treeData)}</Tree>
      </div>
    );
  }
}

storiesOf('Unified Views', module).add('Develop', () => <Develop />);
