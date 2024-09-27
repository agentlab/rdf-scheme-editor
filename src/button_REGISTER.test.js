import React from 'react';

import { shallow, configure, mounte } from 'enzyme';
import AdvancedSearchForm from '../src/components/RegisterForm.stories';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
module.exports = {
  setupFiles: ['./jest.setup.js'],
};

describe('Registration form', () => {
  // группируем
  //const mockLogin = jest.fn(); // мок для экшена registration (this.props.logIn)
  //const spiedFetch = jest.spyOn(global, 'fetch')

  const initialState = {
    // начальный state компонента
    login: '',
    password: '',
    //registerMsg: null,
    serverRequest: null,
    alert: null,
  };

  //const props = { // начальные props компонента
  //location: { state: { from: '/' } }, // эмулируем пропсы из роутера
  //setRegistration: mockLogin, // подменяем action logIn на функцию-заглушку
  //errorMsg: null,
  // }
  //const registration = shallow(<AdvancedSearchForm />);
  const registration = shallow(<AdvancedSearchForm />);

  it('renders property', () => {
    // создаем snapshot
    expect(registration).toMatchSnapshot();
  });

  it('initialize Login with initial state', () => {
    expect(registration.state()).toEqual(initialState);
  });

  describe('when we register in the Register form', () => {
    describe('when typing into login input', () => {
      const login = 'smax';

      beforeEach(() => {
        registration.find('#login').simulate('change', {
          currentTarget: {
            value: login,
            id: 'login',
          },
        });
      });
      it('updates login field in state', () => {
        expect(registration.state().login).toEqual(login);
      });
    });

    describe('when typing into password input', () => {
      const password = 'pass';

      beforeEach(() => {
        registration.find('#password').simulate('change', {
          currentTarget: {
            value: password,
            id: 'password',
          },
        });
      });

      it('updates password field in state', () => {
        expect(registration.state().password).toEqual(password);
      });
    });

    describe('when clicking the Register button', () => {
      beforeEach(() => {
        registration.find('#setRegistration').simulate('click', {
          preventDefault: () => {},
        });
      });
      console.log(registration.state().login);
      console.log(registration.state().password);

      it('programm message', () => {
        expect(console.log(registration.state().alert));
      });
    });

    describe('when getting request from server', () => {
      it('server request', () => {
        //expect(spiedFetch).toHaveBeenCalledTimes(1)
        expect(console.log(registration.state().serverRequest));
      });
    });
    /*
    describe('show alert', () => {      
      it('alert', () => {   
        //expect(spiedFetch).toHaveBeenCalledTimes(1)       
       expect(console.log(registration.state().alert));
      })    
    })*/

    afterAll(() => {
      // очистили state
      registration.setState(initialState);
    });
  });

  describe('disabled attribute for Register button', () => {
    // формf логина изначально с выключенной кнопкой (то есть, disabled)
    it('render form with disabled Register button at initial render', () => {
      const button = registration.find('#setRegistration');
      expect(button.prop('disabled')).toBeTruthy();
    });

    // для плохого пароля
    it('render form with disabled button for bad password', () => {
      const nextState = {
        ...initialState,
        password: '123',
        login: 'sobolev',
      };
      registration.setState(nextState);

      const button = registration.find('#setRegistration');
      expect(button.prop('disabled')).toBeTruthy();
    });

    // для плохого логина
    it('render form with disabled button for bad login', () => {
      const nextState = {
        ...initialState,
        password: '12345',
        login: 'sth',
      };
      registration.setState(nextState);

      const button = registration.find('#setRegistration');
      expect(button.prop('disabled')).toBeTruthy();
    });

    // для плохих логина и пароля
    it('render form with disabled button for bad login & password', () => {
      const nextState = {
        ...initialState,
        password: '1',
        login: 'sth',
      };
      registration.setState(nextState);

      const button = registration.find('#setRegistration');
      expect(button.prop('disabled')).toBeTruthy();
    });

    it('render form without disabled button, because email & password are correct', () => {
      const nextState = {
        ...initialState,
        login: 'qwert', // корректный email
        password: '123456', // корректный password
      };
      registration.setState(nextState);

      const button = registration.find('#setRegistration');
      expect(button.prop('disabled')).toBeFalsy();
    });

    afterEach(() => {
      //  после каждого теста - сбрасываем state
      registration.setState(initialState);
    });
  });

  describe('when we clear the form', () => {
    const login = 'smax';

    beforeEach(() => {
      registration.find('#login').simulate('change', {
        currentTarget: {
          value: login,
          id: 'login',
        },
      });
    });

    const password = 'pass';

    beforeEach(() => {
      registration.find('#password').simulate('change', {
        currentTarget: {
          value: password,
          id: 'password',
        },
      });
    });

    beforeEach(() => {
      registration.find('#resetRegistration').simulate('click', {
        preventDefault: () => {},
      });
    });

    it('clearing button works correctly', () => {
      expect(registration.state()).toEqual(initialState);
    });

    afterEach(() => {
      registration.setState(initialState);
    });
  });
});
