import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from "./Home";
import Header from "./Header";
import Claim from "./Claim";
import Admin from "./Admin";
import Login from "./Login";
import Register from "./Register";
import Cookies from "js-cookie";

class App extends Component {
    state = {
        is_auth: null,
        user_type: null,
        user_info: null,
        claim: null
    };

    componentDidMount() {
        let comp = this;
        var csrf = Cookies.get('csrftoken');
        var xhr = new XMLHttpRequest();
        xhr.open("GET", '/get_user', true);
        xhr.setRequestHeader('X-CSRFToken', csrf);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            let answer = JSON.parse(this.responseText);
            console.log(answer);
            let user_info = answer.user_info;
            if (user_info) {
                comp.setState({
                    is_auth: answer.is_auth,
                    user_type: user_info.type,
                    user_info: user_info.info,
                    claim: user_info.claim
                })
            }
            else {
                comp.setState({
                    is_auth: answer.is_auth
                })
            }
        };

        xhr.send();
    }

    login = (user_info) => {
        console.log(user_info.claim);
        this.setState({
            is_auth: true,
            user_type: user_info.type,
            user_info: user_info.info,
            claim: user_info.claim
        })
    };
    logout = () => {
        this.setState({
            is_auth: false,
            user_type: null,
            user_info: null,
            claim: null
        });
        let comp = this;
        var csrf = Cookies.get('csrftoken');
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/logout/', true);
        xhr.setRequestHeader('X-CSRFToken', csrf);
        xhr.send();
    };
    changeAdmin = (user_info) => {
        var csrf = Cookies.get('csrftoken');
        var xhr = new XMLHttpRequest();
        let body = 'answer=' + encodeURIComponent(user_info.answer) + '&task=' + encodeURIComponent(user_info.task);
        xhr.open("POST", '/change_admin/', true);
        xhr.setRequestHeader('X-CSRFToken', csrf);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        console.log(body);
        xhr.send(body);
        this.setState({
            user_info: user_info
        })
    };

    render() {
        let content = this.state.is_auth !== null ? (
            <div>
                <BrowserRouter>
                    <Header is_auth={this.state.is_auth} user_type={this.state.user_type} logout={this.logout}/>
                    <div className="container">
                        <Route exact path="/" render={(routeProps) => (
                            <Home {...routeProps} is_auth={this.state.is_auth} user_type={this.state.user_type}/>
                        )}/>
                        <Route exact path="/claim" render={(routeProps) => (
                            <Claim {...routeProps} user_info={this.state.user_info} claim={this.state.claim}/>
                        )}/>
                        <Route path="/claim/admin" render={(routeProps) => (
                            <Admin {...routeProps} user_info={this.state.user_info} changeAdmin={this.changeAdmin}/>
                        )}/>
                        <Route path="/login" render={(routeProps) => (
                            <Login {...routeProps} login={this.login}/>
                        )}/>
                        <Route path="/register" render={(routeProps) => (
                            <Register {...routeProps} login={this.login}/>
                        )}/>
                    </div>
                </BrowserRouter>
            </div>
        ) : (
            <div className="bg-dark" style={{height: "100vh", width: "100%", margin: "0", padding: "20%"}}>
                <div className="w-50 mx-auto text-center text-white p-5">
                    <img
                        src="http://meftechksa.com/wp-content/uploads/2018/11/OW_Logotype_CMYK.png"
                        alt="" className="w-100"/>
                    <h1>Загрузка...</h1>
                </div>
            </div>
        );
        return (
            <div>{content}</div>
        )
    }
}

export default App