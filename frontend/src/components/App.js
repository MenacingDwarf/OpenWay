import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from "./Home";
import Header from "./Header";
import Claim from "./Claim";
import Admin from "./Admin";

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header/>
                    <div className="container">
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/claim" component={Claim}/>
                        <Route path="/claim/admin" component={Admin}/>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default App