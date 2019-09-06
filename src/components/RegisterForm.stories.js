import { storiesOf } from '@storybook/react';
import React from 'react';
//import 'whatwg-fetch';
//import 'node-fetch'
//import PropTypes from 'prop-types';
import { Form, Button, Alert, Input } from 'antd';

// Проверка логина и пароля

const testPassword = (password) => {
  return !!password && password.length >= 4;
};

class AdvancedSearchForm extends React.Component {
  state = {
    login: '',
    password: '',
    //registerMsg: null,
    // временное хранилище ответа запоса
    serverRequest: null,
    alert: null,
  };

  setRegistration = async (e) => {
    e.preventDefault();
    let regAnswer = 'Регистрация успешно завершена!';
    const { login, password } = this.state;

    if (login == '') regAnswer = 'Введите логин!!!';
    else if (password == '') regAnswer = 'Введите пароль!!!';
    else if (login.trim() == '') regAnswer = 'Логин не должен содержать одни пробелы!!!';
    else if (password.trim() == '') regAnswer = 'Пароль не должен содержать одни пробелы!!!';
    else if (login.length < 4) regAnswer = 'Длина логина должна быть больше 3 символов!!!';
    else if (login.length < 4) regAnswer = 'Длина пароля должна быть больше 3 символов!!!';

    if (regAnswer != 'Регистрация успешно завершена!')
      //alert (regAnswer);
      this.setState({ alert: regAnswer });
    else {
      console.log(login);
      console.log(password);

      await this.addUser(login, password)
        .then((r) => {
          r.json();
          console.log(r);
        })
        .then((json) => {
          console.log(json);
          this.setState({ serverRequest: json });
          //alert('Регистрация успешно завершена!');
          this.setState({ alert: regAnswer });
        })
        .catch((e) => {
          throw new Error('fetch failed' + e);
        });
    }

    this.handleReset();
  };

  addUser = (username, password) => {
    let shit = 'https://cors-anywhere.herokuapp.com/';
    let url = 'http://82.202.226.30';
    let prefix = '/master/api/1/users/create';

    var adminname = 'master';
    var adminpassword = 'commander';
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(adminname + ':' + adminpassword));
    headers.append('Content-Type', 'application/json');

    var data = {
      'Subject.UPVSIdentityID': username,
      'Subject.FormattedName': username,
      'Actor.UPVSIdentityID': password,
      'Actor.FormattedName': password,
      'SPR.Roles': 'simple-user',
    };

    var promise = fetch(url.concat(prefix), {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    console.log('New request was sent correctly', promise);

    return promise;
  };

  handleChange = (e) => {
    const value = e.currentTarget.value;
    const fieldName = e.currentTarget.id;

    this.setState((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  handleReset = (e) => {
    e.preventDefault();

    var inputs = document.querySelectorAll('Input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }
    console.log('Clearing passed');
    this.setState({
      login: '',
      password: '',
      //registerMsg: null,
      // временное хранилище ответа запроса
      serverRequest: null,
      alert: null,
    });
  };

  handleReset = () => {
    var inputs = document.querySelectorAll('Input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }
    console.log('Clearing passed');
    this.setState({
      login: '',
      password: '',
      //registerMsg: null,
      // временное хранилище ответа запоса
      serverRequest: null,
      alert: null,
    });
  };

  validate = () => {
    // создали новый метод
    const { login, password } = this.state;
    if (!testPassword(password)) return false;
    if (!testPassword(login)) return false;
    return true; // иначе true, то есть "форма валидна"
  };

  render() {
    const { login, password } = this.state;
    return (
      <Form name='form1'>
        <div>
          <h1>&nbsp;&nbsp;Registration</h1>
        </div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User:</div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {<Input style={{ width: '20%' }} id='login' onChange={this.handleChange} value={login} />}
        </div>
        <div>&nbsp;</div>
        <Alert message='Success Text' type='success' />
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password:</div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {
            <Input
              type='password'
              style={{ width: '20%' }}
              maxLength={15}
              id='password'
              onChange={this.handleChange}
              value={password}
            />
          }
        </div>
        <div>&nbsp;</div>
        <div className='form-operations'>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            onClick={this.setRegistration}
            type='primary'
            disabled={!this.validate()}
            htmlType='submit'
            id='setRegistration'>
            Register
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={this.handleReset}
            type='reset'
            htmlType='submit'
            id='resetRegistration'>
            Clear
          </Button>
        </div>

        <Alert
          message='Success Text'
          description={this.state.alert}
          type={this.state.alert == 'Регистрация успешно завершена!' ? 'succes' : 'error'}
        />
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'normal_login' })(AdvancedSearchForm);

storiesOf('Register Form', module).add('Action', () => (
  <WrappedAdvancedSearchForm>Register Form</WrappedAdvancedSearchForm>
));

export default AdvancedSearchForm;
