import React, {Component} from 'react'
import Cookies from "js-cookie";
import AdminClaim from "./AdminClaim";

class Admin extends Component {
    state = {
        user_info: this.props.user_info,
        claims: undefined,
        changed: false
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
        this.setState({
            changed: true
        });

        let changeback = () => this.setState({
            changed: false
        });

        setTimeout(changeback, 1500);
    };

    render() {
        let claims = <div>Загрузка...</div>;

        if (this.state.claims) {
            let new_claims = this.state.claims.filter(claim => claim.fields.status === "На рассмотрении");
            let old_claims = this.state.claims.filter(claim => claim.fields.status !== "На рассмотрении");
            let new_claims_object = new_claims.length !== 0 ? new_claims.map(claim => {
                return <AdminClaim key={claim.pk} claim={claim}/>
            }) : <div>Новых заявок нет</div>;
            let old_claims_object = old_claims.length !== 0 ? old_claims.map(claim => {
                return <AdminClaim key={claim.pk} claim={claim}/>
            }) : <div>Нет архивных заявок</div>;
            claims = (
                <div>
                    <h2>Новые заявки</h2>
                    <div className="claims">
                        {new_claims_object}
                    </div>
                    <h2>Архивные заявки</h2>
                    <div className="claims">
                        {old_claims_object}
                    </div>
                </div>
            )
        }
        let text = this.state.changed ? <span className="text-success ml-3">Изменения сохранены</span> : null;
        let content = (
            <div>
                <h2>Настройки ответа на заявку:</h2>
                <p>Текст ответа и ссылка на задание будут высвечиваться пользователям, отправившим принятые заявки.</p>
                <div className="claim" style={{width: "96%"}}>
                    <form action="/change_admin/" onSubmit={this.handlerSubmit}>
                        <label htmlFor="admin-answer">Введите текст ответа:</label>
                        <input type="text" className="form-control mb-2" defaultValue={this.state.user_info.answer}
                               name="answer" id="admin-answer"/>
                        <label htmlFor="admin-task">Введите ссылку на задание:</label>
                        <input type="text" className="form-control mb-2" defaultValue={this.state.user_info.task}
                               name="task" id="admin-task"/>
                        <input type="submit" className="btn btn-dark" value="Сохранить изменения"/>
                        {text}
                    </form>
                </div>
                {claims}
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