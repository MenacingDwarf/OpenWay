import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Home extends Component {
    render() {
        return (
            <div>
                <img
                    src="https://static1.squarespace.com/static/55473fe6e4b079a47a7498d1/t/5b1172c76d2a73d4644f6e92/1527870157752/OpenWay_icons.jpg?format=1000w"
                    className="w-100" alt=""/>
                <h2>Летняя Школа OpenWay</h2>
                <h5>1 июля - 9 августа 2019 г., Санкт-Петербург</h5>
                <p>
                    <b>Летняя школа OpenWay</b> - это интенсивная оплачиваемая стажировка для студентов в международной
                    компании-разработчике решений для финтех-отрасли. Наши стажеры получают ценный опыт в одной из самых
                    динамичных индустрий – в области платежных технологий, а лучшие – остаются с нами работать!
                </p>
                <Link to='/claim'>
                    <button className="btn btn-dark btn-claim">Подать заявку</button>
                </Link>
            </div>
        )
    }
}

export default Home