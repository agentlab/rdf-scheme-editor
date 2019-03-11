import { storiesOf } from "@storybook/react";
import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import {
    Form, Input, Checkbox, Icon
} from "antd";

function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
}
class LockedLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            formLayout: "horizontal"
        };
    }

    handleFormLayoutChange = e => {
        this.setState({ formLayout: e.target.value });
    };

    render() {
        const { formLayout } = this.state;
        const formItemLayout =
            formLayout === "horizontal"
                ? {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 }
                }
                : null;

        return (
            <div>
                <Form formlayout={formItemLayout}>
                    <h1><b class="text-shadow-2"> Создание требования с атрибутами </b></h1>

                    <Form.Item label="Имя: " {...formItemLayout}>
                        <Input />
                    </Form.Item>

                    <Form.Item required label="Тип требования: " {...formItemLayout}><Icon type="bars" />
                    
                        <select name="Форма документа">
                            <option>Форма документа</option>
                            <option>Форма документа2</option>
                            <option>Форма документа3</option>
                        </select>
                    </Form.Item>

                    <Form.Item required label="Формат требования: " {...formItemLayout}><Icon type="file-text" />
                        <select name="Формат требования">
                            <option>Текст</option>
                            <option>Голосовое</option>
                            <option>Какое нибудь</option>
                        </select>
                    </Form.Item>

                    <Form.Item label="Описание: " {...formItemLayout}>
                        <Input />
                    </Form.Item>

                    <h2>Расположение </h2>
                    <Form.Item label="Папка: " {...formItemLayout}>
                        <Input defaultValue="Базовые понятия" />
                        <button class = "button-location-right" name="chooseFolder">Выбрать папку</button>
                    </Form.Item>

                    <Form.Item label="Теги: " {...formItemLayout}>
                        <Input />
                        <button class = "button-location-right" name="addTags">Добавить теги</button>
                    </Form.Item>
                    <h1><b class="text-shadow-2">Начальное значение требования </b> </h1>
                    <Form.Item label="Шаблон: " {...formItemLayout}>
                        <select name="Шаблон">
                            <option>Нет</option>
                            <option>Да</option>
                        </select>
                    </Form.Item>
                    <Checkbox onChange={onChange} >< b class="text-shadow-2">Открыть требование </b></Checkbox>
                </Form>
                <button name="ready">Готово</button>
                <button name="cancel">Отмена</button>
                
            </div>
        );
    }
}

storiesOf("Lab1", module).add("CreateRequirements", () => <LockedLayout />);
