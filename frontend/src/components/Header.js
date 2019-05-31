import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from "js-cookie";

class Header extends Component {
    render() {
        let button = this.props.user_type === "admin" ? (
            <li className="nav-item">
                <Link className="nav-link" to="/claim/admin">Просмотр заявок </Link>
            </li>
        ) : (
            <li className="nav-item">
                <Link className="nav-link" to="/claim">Подать заявку </Link>
            </li>
        );
        let buttons = this.props.is_auth ? (
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Главная</Link>
                    </li>
                    {button}
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={() => this.props.logout()}>Выйти</Link>
                    </li>
                </ul>
            </div>
        ) : (
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Главная</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Войти</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Зарегистрироваться</Link>
                    </li>
                </ul>
            </div>
        );
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
                <Link className="navbar-brand" to="/"><img
                    src="https://static1.squarespace.com/static/55473fe6e4b079a47a7498d1/t/5b082183352f533794aebe3f/1559115799597/?format=1500w"
                    alt=""/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {buttons}
            </nav>
        )
    }
}

export default Header