import React, {Component} from 'react'
import Cookies from 'js-cookie';

class Claim extends Component {
    state = {
        sended: -1
    };
    sendToServer = (form) => {
        let comp = this;
        var csrf = Cookies.get('csrftoken');
        var xhr = new XMLHttpRequest();
        var formData = new FormData(form);
        var body = 'name=' + form.name.value;
        console.log(body);
        xhr.open("POST", '/claim/', true);
        //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-CSRFToken', csrf);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            console.log('done');
            comp.setState({
                sended: 1
            })
        };

        xhr.send(formData);
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            sended: 0
        });
        this.sendToServer(e.target);
    };

    render() {
        console.log(this.state.sended);
        let content = <div>Отправка заявки...</div>;
        if (this.state.sended === -1) {
            content = <div>
                <h2>Заявка на поступление в Летнюю Школу OpenWay</h2>
                <form action="/claim/" method="POST" onSubmit={this.handleSubmit}>
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
                    <p>Чем Вам было бы интересно заниматься?</p>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox1" name="areaoption1"
                               value="Бизнес-анализ, IT-консалтинг"/>
                        <label className="form-check-label" htmlFor="checkbox1"> Бизнес-анализ, IT-консалтинг</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox2" name="areaoption2"
                               value="Backend-разработка"/>
                        <label className="form-check-label" htmlFor="checkbox2"> Backend-разработка</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox3" name="areaoption3"
                               value="Frontend-разработка"/>
                        <label className="form-check-label" htmlFor="checkbox3"> Frontend-разработка</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox4" name="areaoption4"
                               value="Тестирование, управление качеством"/>
                        <label className="form-check-label" htmlFor="checkbox4"> Тестирование, управление
                            качеством</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox5" name="areaoption5"
                               value="Создание технической документации"/>
                        <label className="form-check-label" htmlFor="checkbox5"> Создание технической
                            документации</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox6" name="areaoption6"
                               value="Внедрение сложного ПО (enterprise)"/>
                        <label className="form-check-label" htmlFor="checkbox6"> Внедрение сложного ПО
                            (enterprise)</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox7" name="areaoption7"
                               value="Участие в финтех-проектах"/>
                        <label className="form-check-label" htmlFor="checkbox7"> Участие в финтех-проектах</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox8" name="areaoption8"
                               value="Работа с базами данных"/>
                        <label className="form-check-label" htmlFor="checkbox8"> Работа с базами данных</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox9" name="areaoption9"
                               value="Поддержка клиентов"/>
                        <label className="form-check-label" htmlFor="checkbox9"> Поддержка клиентов</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox10" name="areaoption10"
                               value="Маркетинг в области IT"/>
                        <label className="form-check-label" htmlFor="checkbox10"> Маркетинг в области IT</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox11" name="areaoption11"
                               value="Компьютерная безопасность"/>
                        <label className="form-check-label" htmlFor="checkbox11"> Компьютерная безопасность</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox12" name="areaoption12"
                               value="Другое (укажите в поле внизу)"/>
                        <label className="form-check-label" htmlFor="checkbox12"> Другое (укажите в поле внизу)</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Ваши комментарии</label>
                        <textarea name="comments" className="form-control" id="comments" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="knowledges">Расскажите о своих знаниях компьютерных технологий, прикладного ПО,
                            языков программирования: *</label>
                        <textarea name="knowledges" required className="form-control" id="knowledges" rows="3"></textarea>
                    </div>
                    <p>Я планирую прийти на день открытых дверей и послушать презентацию Школы</p>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="opendoors" id="yes"
                               value="Да"/>
                        <label className="form-check-label" htmlFor="yes">
                            Да
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="opendoors" id="no"
                               value="Нет"/>
                        <label className="form-check-label" htmlFor="no">
                            Нет
                        </label>
                    </div>
                    <input type="submit" className="btn btn-dark mt-2 mb-2" value="Подать заявку"/>
                </form>
            </div>
        }
        else if (this.state.sended === 1) {
            content = (
                <div>
                    <h2>Ваша заявка успешно отправлена!</h2>
                    <p>Администраторы рассмотрят вашу заявку и в скором времени свяжутся с вами</p>
                </div>
            )
        }

        return (
            <div>{content}</div>
        )
    }
}

export default Claim