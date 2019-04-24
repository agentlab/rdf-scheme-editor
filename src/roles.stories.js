import React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import { Form, Input, Select, Button, Transfer, Switch } from 'antd';

const ButtonGroup = Button.Group;

class Demo extends React.Component {
  state = {
    mockData: [],
    targetKeys: [],
  };

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    const data1 = {
      key: '1',
      title: `Администратор`,
    };
    if (data1.chosen) {
      targetKeys.push(data1.key);
    }
    mockData.push(data1);
    const data2 = {
      key: '2',
      title: `Автор`,
    };
    if (data2.chosen) {
      targetKeys.push(data2.key);
    }
    mockData.push(data2);
    const data3 = {
      key: '3',
      title: `Администратор моментальных копий`,
    };
    if (data3.chosen) {
      targetKeys.push(data3.key);
    }
    mockData.push(data3);
    const data4 = {
      key: '4',
      title: `Комментатор`,
    };
    if (data4.chosen) {
      targetKeys.push(data4.key);
    }
    mockData.push(data4);
    this.setState({ mockData, targetKeys });
  };

  handleChange = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys, direction, moveKeys);
    this.setState({ targetKeys });
  };

  renderItem = (item) => {
    const customLabel = <span className='custom-item'>{item.title}</span>;

    return {
      label: customLabel, // for displayed item
      value: item.title, // for title and filter matching
    };
  };

  render() {
    return (
      <div>
        <h2>Роли в процессе</h2>
        <h3>Назначить роли для следующих участников: Специалист</h3>
        <Transfer
          titles={['Доступные роли:', 'Выбранные роли:']}
          dataSource={this.state.mockData}
          listStyle={{
            width: 300,
            height: 200,
          }}
          targetKeys={this.state.targetKeys}
          onChange={this.handleChange}
          render={this.renderItem}
        />
        <p>
          <b>Примечание:</b>Упорядочение ролей, назначенных пользователю, отражает их относительный приоритет.
          <br />
          Если поведение настроено для нескольких ролей, будет выполнено поведение, связанное
          <br />с ролью пользователя, которая имеет высший приоритет. Приоритет не влияет на права доступа.
          <br />
          Среда выполнения процесса позволит пользователю выполнить действия, разрешенные для любой
          <br />
          из назначенных ему ролей.
        </p>
        <div class='button'>
          <ButtonGroup>
            <Button>Cancel</Button>
            <Button>OK</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('root'));

const WrappedDemo = Form.create({ name: 'customized_form_controls' })(Demo);

storiesOf('Forms', module).add('Roles Assignments', () => <WrappedDemo />);
