import React, {Component} from 'react'
import Cookies from "js-cookie";

class Admin extends Component {
    state = {
        message: null,
        claims: undefined
    };
    sendToServer = (form) => {
        let comp = this;
        var csrf = Cookies.get('csrftoken');
        var xhr = new XMLHttpRequest();
        var formData = new FormData(form);
        xhr.open("POST", '/claim/admin/', true);
        //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-CSRFToken', csrf);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            let answer = JSON.parse(this.responseText);
            let claims = answer.claims ? JSON.parse(answer.claims) : undefined;
            comp.setState({
                message: answer.message,
                claims: claims
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
        if (this.state.claims) console.log(this.state.claims[0]);
        let claims = <div>Что-то пошло не так...</div>;
        if (this.state.claims) {
            claims = this.state.claims.length !== 0 ? this.state.claims.map(claim => {
                let opendoors = claim.fields.opendoors ? "Да" : "Нет";
                return (
                    <div key={claim.pk} className="claim">
                        <h4>Заявка номер {claim.pk}</h4>
                        <b>Имя фамилия:</b>
                        <p>{claim.fields.name} {claim.fields.surname}</p>
                        <b>E-mail:</b>
                        <p>{claim.fields.email}</p>
                        <b>День рождения:</b>
                        <p>{claim.fields.birthday}</p>
                        <b>Телефон:</b>
                        <p>{claim.fields.phone}</p>
                        <b>Интересующие области:</b>
                        <p>{claim.fields.area}</p>
                        <b>Знания в области программирования:</b>
                        <p>{claim.fields.knowledges}</p>
                        <b>Придёт на день открытых дверей: </b>
                        <p>{opendoors}</p>
                    </div>
                )
            }) : <div>Новых заявок нет</div>;
        }
        let content = this.state.message === "success" ? (
            <div>
                <h2>Поступившие заявки:</h2>
                <div className="claims">
                    {claims}
                </div>
            </div>
        ) : (
            <div className="admin-form">
                <div className="h2">Авторизуйтесь</div>
                <div style={{color: "red"}}>{this.state.message}</div>
                <form action="/claim/admin/" method="POST" onSubmit={this.handleSubmit}>
                    <label htmlFor="login">Введите логин</label>
                    <input type="text" id="login" name="login" className="form-control mb-2"/>
                    <label htmlFor="password">Введите пароль</label>
                    <input type="password" id="password" name="password" className="form-control mb-2"/>
                    <input type="submit" name="button" className="btn btn-dark mb-2" value="Войти"/>
                </form>
            </div>
        );
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default Admin