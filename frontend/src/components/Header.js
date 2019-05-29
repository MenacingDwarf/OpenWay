import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
                <Link className="navbar-brand" to="/"><img
                    src="https://static1.squarespace.com/static/55473fe6e4b079a47a7498d1/t/5b082183352f533794aebe3f/1559115799597/?format=1500w"
                    alt=""/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Главная <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/claim">Подать заявку <span
                                className="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header