import React from 'react';
import { storiesOf } from '@storybook/react';
import { StyleSheet, css } from 'aphrodite';
import { Form, Icon, Input, Button, Checkbox, Select, Menu, Layout, Row, Col, InputNumber } from 'antd';

const { Content, Sider } = Layout;

var requirements = {
  URL: 'border',
  xsdtype: 'border',
  'Альтернативные варианты написания': 'interation',
  Вид: 'border',
  Включает: 'disconnect',
  'Включен в': 'disconnect',
  'Данные процесса': 'border',
  Длина: 'border',
  'Дочерний объект для': 'disconnect',
  'Требование 10': 'border',
  'Требование 11': 'border',
  'Требование 12': 'border',
  'Требование 13': 'disconnect',
  'Требование 14': 'border',
  'Требование 15': 'border',
  'Требование 16': 'disconnect',
  'Требование 17': 'disconnect',
  'Требование 18': 'border',
  'Требование 19': 'disconnect',
  'Требование 20': 'border',
  'Требование 21': 'border',
  'Требование 22': 'disconnect',
  'Требование 23': 'border',
  'Требование 24': 'interationr',
  'Требование 25': 'interation',
  'Требование 26': 'border',
  'Требование 27': 'interation',
  'Требование 28': 'border',
};

const styles = StyleSheet.create({
  scroll_container: { height: 400, width: '100%', border: '2px solid gray', overflowY: 'auto', display: 'block' },
  widthn: { width: '92%' },
  column: { display: 'inline-flex', flexDirection: 'column', width: '98%', align: 'center' },
  blue: { color: 'rgba(177,208,250)' },
  orange: { color: 'orange' },
  gray: { color: 'gray' },
  shadowtext: { textShadow: '10px 10px 20px black' },
  size16: { fontSize: '16pt' },
  formcolor: { background: '#FFFFEF' },
  formcolor_padding: { background: '#FFFFEF', padding: '0 3' },
  menuStyle: {
    color: 'black',
    fontWeight: 'bold',
    background: 'linear-gradient(0deg, rgba(177,208,250,1) 0%, rgba(248,248,251,1) 100%)',
  },
  content1: { width: '18%' },
  content2: { width: '70%' },
  content3: { width: '25%', height: '100%' },
  sel: {
    backgroundColor: 'linear-gradient(180deg, rgba(177,208,250,1) 0%, rgba(248,248,251,1) 100%)',
    fontSize: '16pt',
  },
  border1: { border: '3px solid rgba(177,208,250,1)' },
  border2: { border: '2px solid gray' },
  center: { textAlign: 'center' },
});

const mySelect = [],
  container = [];

for (var requirement in requirements) {
  mySelect.push(<Option value={requirement}>{requirement}</Option>);

  if (requirements[requirement] == 'disconnect')
    container.push(
      <div>
        {' '}
        <Icon type={requirements[requirement]} className={css(styles.orange)} /> {requirement}
      </div>,
    );
  else if (requirements[requirement] == 'interation')
    container.push(
      <div>
        {' '}
        <Icon type={requirements[requirement]} theme='filled' className={css(styles.blue)} /> {requirement}
      </div>,
    );
  else
    container.push(
      <div>
        {' '}
        <Icon type={requirements[requirement]} className={css(styles.blue)} /> {requirement}
      </div>,
    );
}

class AdvancedSearchForm extends React.Component {
  render() {
    return (
      <Form>
        <Form.Item>
          <Layout className={css(styles.formcolor)}>
            <Content>
              <Form.Item>
                <Menu className={css(styles.menuStyle)}>
                  <Menu.Item>
                    <Row className={css(styles.size16)}>
                      <Col span={24}>Изменить параметры отображения столбцов</Col>

                      <Col className={css(styles.gray)}>&#10006;</Col>
                    </Row>
                  </Menu.Item>
                </Menu>
              </Form.Item>
            </Content>

            <Content>
              <Form.Item className={css(styles.size16)}>
                <Content>
                  <div className={css(styles.border1)}>
                    <div className={css(styles.shadowtext)}>Выберите тип требований или ссылок</div>
                  </div>
                </Content>

                <Content className={css(styles.content1)}>
                  <div>
                    <Select defaultValue='all' className={css(styles.sel)}>
                      <Option value='all'>Все</Option>

                      {mySelect}
                    </Select>
                  </div>

                  <Input class={css(styles.size16)} />
                </Content>
              </Form.Item>
            </Content>

            <Layout className={css(styles.formcolor)}>
              <Content classname={css(styles.content3)}>
                <Form.Item className={css(styles.size16)}>
                  <div className={css(styles.shadowtext)}>Выберите типы требований...</div>

                  <div className={css(styles.scroll_container)}>{container}</div>
                </Form.Item>
              </Content>

              <Content>
                <Form.Item>
                  <br />

                  <div className={css(styles.column)}>
                    <Button className={css(styles.size16)}>Добавить</Button>

                    <Button className={css(styles.size16)}> Изменить</Button>
                  </div>

                  <br />
                  <br />
                  <br />
                  <br />

                  <div className={css(styles.center)}>
                    <a className={css(styles.size16)}>Вернуть значение по умолчанию</a>
                  </div>
                </Form.Item>
              </Content>

              <Content className={css(styles.content2)}>
                <Form.Item className={css(styles.size16)}>
                  <Row>
                    <Col span={10}>Отображаемые столбцы</Col>

                    <Col span={8}>Ширина (пи...</Col>

                    <Col span={6}>Форматирование</Col>
                  </Row>

                  <div className={css(styles.border2)}>
                    <Row>
                      <Col span={10}>ИД</Col>

                      <Col span={8}>
                        <InputNumber className={css(styles.size16)} min={0} defaultValue={45} />
                      </Col>

                      <Col span={6}>&nbsp;</Col>
                    </Row>

                    <Row>
                      <Col span={10}>Имя</Col>

                      <Col span={8}>
                        <InputNumber className={css(styles.size16)} min={0} defaultValue={222} />
                      </Col>

                      <Col span={6}>&nbsp;</Col>
                    </Row>

                    <Row>
                      <Col span={10} className={css(styles.shadowtext)}>
                        Тип требования
                      </Col>

                      <Col span={8}>
                        <InputNumber className={css(styles.size16)} min={0} defaultValue={222} />
                      </Col>

                      <Col span={6}>&nbsp;</Col>
                    </Row>

                    <Row>
                      <Col span={10}>Кем изменено</Col>

                      <Col span={8}>
                        <InputNumber className={css(styles.size16)} min={0} defaultValue={222} />
                      </Col>

                      <Col span={6}>&nbsp;</Col>
                    </Row>

                    <Row>
                      <Col span={10}>Входит в состав</Col>

                      <Col span={8}>
                        <InputNumber className={css(styles.size16)} min={0} defaultValue={174} />
                      </Col>

                      <Col span={6}>&nbsp;</Col>
                    </Row>

                    <Row>
                      <Col span={10}>Изменено</Col>

                      <Col span={8}>
                        <InputNumber className={css(styles.size16)} min={0} defaultValue={185} />
                      </Col>

                      <Col span={6}>&nbsp;</Col>
                    </Row>

                    <Row>
                      <Col span={24}>&nbsp;</Col>
                    </Row>

                    <Row>
                      <Col span={24}>&nbsp;</Col>
                    </Row>

                    <Row>
                      <Col span={24}>&nbsp;</Col>
                    </Row>

                    <Row>
                      <Col span={24}>&nbsp;</Col>
                    </Row>
                  </div>
                </Form.Item>
              </Content>

              <Sider className={css(styles.formcolor_padding)}>
                <Form.Item className={css(styles.widthn)}>
                  <br />

                  <div className={css(styles.column)}>
                    <Button className={css(styles.size16)}>Вверх</Button>

                    <Button className={css(styles.size16)}>Вниз </Button>

                    <Input className={css(styles.size16)} placeholder='Форматировать' />
                  </div>
                </Form.Item>
              </Sider>
            </Layout>

            <Content>
              <Row>
                <Col span={21}>
                  <Form.Item>
                    <Checkbox className={css(styles.size16)}>
                      Показывать только атрибуты по умолчанию (
                      <Icon type='interation' theme='filled' className={css(styles.blue)} />)
                    </Checkbox>
                  </Form.Item>
                </Col>

                <Col span={3}>
                  <Form.Item>
                    <Button className={css(styles.size16)}> ОК</Button>
                    &nbsp;
                    <Button className={css(styles.size16)}>Отмена</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'normal_login' })(AdvancedSearchForm);

storiesOf('Table Columns Customization', module).add('with form', () => (
  <WrappedAdvancedSearchForm>Table Columns Customization</WrappedAdvancedSearchForm>
));
