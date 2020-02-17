import React, {Component} from 'react';
import s from './App.module.css';
import {Router, Route, Switch} from "react-router-dom";
import News from "./container/News";
import HeaderContainer from "./container/HeaderContainer";
import SignUp from './container/SignUp'
import DetailNews from "./container/DetailNews";
import NewsEditContainer from "./container/NewsEditContainer";
import history from './utils/history'
import LogIn from "./container/LogIn";


class App extends Component {
    componentDidMount() {
        const _onInit = auth2 => {
            // console.log('init OK', auth2)
        }
        const _onError = err => {
            // console.log('error', err)
        }
        window.gapi.load('auth2', function () {
            window.gapi.auth2
                .init({
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                })
                .then(_onInit, _onError)
        })

    }

    render() {

        return (
            <>
            <Router history={history}>
                <div className={s.App}>
                    <HeaderContainer/>
                    {/*<Switch>*/}
                        <Route exact path="/news" component={News}/>
                        <Route path="/signup" component={SignUp}/>
                        <Route path="/login" component={LogIn}/>
                        <Route path="/news/:newsId" component={DetailNews}/>
                        <Route path="/news/:newsId/edit" component={NewsEditContainer}/>
                    {/*</Switch>*/}
                </div>
            </Router>

            </>
        )
    }
}

export default App;
