import React, {Component} from 'react'
import Cookies from "js-cookie";

class AdminClaim extends Component {
    state = {
        status: this.props.claim.fields.status
    };
    acceptClaim = (e) => {
        this.setState({
            status: "loading"
        });
        let comp = this;
        var csrf = Cookies.get('csrftoken');
        var xhr = new XMLHttpRequest();
        let body = "id=" + this.props.claim.pk;
        xhr.open("POST", '/accept_claim/', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-CSRFToken', csrf);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            comp.setState({
                status: "Принята"
            })
        };

        xhr.send(body);
    };

    declineClaim = (e) => {
        this.setState({
            status: "loading"
        });
        let comp = this;
        var csrf = Cookies.get('csrftoken');
        var xhr = new XMLHttpRequest();
        let body = "id=" + this.props.claim.pk;
        xhr.open("POST", '/decline_claim/', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-CSRFToken', csrf);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            comp.setState({
                status: "Отклонена"
            })
        };

        xhr.send(body);
    };
    render() {
        let claim = this.props.claim;
        let opendoors = claim.fields.opendoors ? "Да" : "Нет";
        let border = "solid yellow 1px";
        if (this.state.status === "Принята") border = "solid green 1px";
        else if (this.state.status === "Отклонена") border = "solid red 1px";
        else if (this.state.status === "На рассмотрении") border = "solid black 1px";
        return (
            <div className="claim" style={{border: border}}>
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
                <button className="btn btn-danger" onClick={this.declineClaim}>Отклонить</button>
                <button className="btn btn-success" onClick={this.acceptClaim}>Принять</button>
            </div>
        )
    }
}

export default AdminClaim