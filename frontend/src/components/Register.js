import React, { Component } from 'react'
import Cookies from "js-cookie";

class Register extends Component {
    state = {
        message: null
    };
    sendToServer = (form) => {
        let comp = this;
        var csrf = Cookies.get('csrftoken');
        var xhr = new XMLHttpRequest();
        var formData = new FormData(form);
        xhr.open("POST", '/register/', true);
        //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-CSRFToken', csrf);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            let answer = JSON.parse(this.responseText);
            if (answer.message === "success") {
                comp.props.login(answer.user_info);
                comp.props.history.push("/")
            }
            else comp.setState({
                message: answer.message,
            })
        };

        xhr.send(formData);
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            message: "Проверка логина и пароля..."
        });
        this.sendToServer(e.target);
    };
    render() {
        return (
            <div className="admin-form">
                <h2>Заполните регистрационную форму</h2>
                <div style={{color: "red"}}>{this.state.message}</div>
                <form action="/login/" method="POST" onSubmit={this.handleSubmit}>
                    <label htmlFor="login">Введите логин</label>
                    <input type="text" id="login" name="login" className="form-control mb-2"/>
                    <label htmlFor="password">Введите пароль</label>
                    <input type="password" id="password" name="password" className="form-control mb-2"/>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="name">Имя</label>
                                <input type="text" required className="form-control" name="name"
                                       id="name"/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="surname">Фамилия</label>
                                <input type="text" required className="form-control"
                                       name="surname"
                                       id="surname"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="text" required className="form-control" name="email"
                               id="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthday">Дата рождения</label>
                        <input type="text" required className="form-control" name="birthday"
                               id="birthday"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Мобильный телефон</label>
                        <input type="text" className="form-control" name="phone"
                               id="phone"/>
                    </div>
                    <input type="submit" name="button" className="btn btn-dark mb-2" value="Зарегистрироваться"/>
                </form>
            </div>
        )
    }
}

export default Register