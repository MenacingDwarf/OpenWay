import React, {Component} from 'react'
import Cookies from "js-cookie";

class Login extends Component {
    state = {
        message: null
    };
    sendToServer = (form) => {
        let comp = this;
        var csrf = Cookies.get('csrftoken');
        var xhr = new XMLHttpRequest();
        var formData = new FormData(form);
        xhr.open("POST", '/login/', true);
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
                <h2>Введите логин и пароль:</h2>
                <div style={{color: "red"}}>{this.state.message}</div>
                <form action="/login/" method="POST" onSubmit={this.handleSubmit}>
                    <label htmlFor="login">Введите логин</label>
                    <input type="text" id="login" name="login" className="form-control mb-2"/>
                    <label htmlFor="password">Введите пароль</label>
                    <input type="password" id="password" name="password" className="form-control mb-2"/>
                    <input type="submit" name="button" className="btn btn-dark mb-2" value="Войти"/>
                </form>
            </div>
        )
    }
}

export default Login