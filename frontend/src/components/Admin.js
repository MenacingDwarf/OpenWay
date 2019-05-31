import React, {Component} from 'react'
import Cookies from "js-cookie";

class Admin extends Component {
    state = {
        user_info: this.props.user_info,
        claims: undefined,
    };

    componentDidMount() {
        let comp = this;
        var csrf = Cookies.get('csrftoken');
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/claim/admin/', true);
        xhr.setRequestHeader('X-CSRFToken', csrf);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            let answer = JSON.parse(this.responseText);
            comp.setState({
                claims: JSON.parse(answer.claims)
            })
        };

        xhr.send();
    };
    handlerSubmit = (e) => {
        e.preventDefault();
        this.props.changeAdmin({answer: e.target.answer.value, task: e.target.task.value});
    };

    render() {
        if (this.state.claims) console.log(this.state.claims[0]);
        let claims = <div>Загрузка...</div>;
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
        let content = (
            <div>
                <h2>Настройки ответа на заявку:</h2>
                <div className="claim w-100">
                    <form action="/change_admin/" onSubmit={this.handlerSubmit}>
                        <label htmlFor="admin-answer">Введите текст ответа:</label>
                        <input type="text" className="form-control mb-2" defaultValue={this.state.user_info.answer}
                               name="answer" id="admin-answer"/>
                        <label htmlFor="admin-task">Введите ссылку на задание:</label>
                        <input type="text" className="form-control mb-2" defaultValue={this.state.user_info.task}
                               name="task" id="admin-task"/>
                        <input type="submit" className="btn btn-dark" value="Сохранить изменения" />
                    </form>
                </div>
                <h2>Поступившие заявки:</h2>
                <div className="claims">
                    {claims}
                </div>
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