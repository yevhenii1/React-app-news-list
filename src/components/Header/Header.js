import React from 'react'
import s from './Header.module.css'
import Nav from "../Nav/Nav";
import {NavLink} from "react-router-dom";

class Header extends React.Component {
    signIn = (event) => {
        const {startingAuthWithG, authWithG, errorAuthG} = this.props
        event.preventDefault();
        if (window.gapi.auth2 !== undefined) {
            startingAuthWithG()
            const auth2 = window.gapi.auth2.getAuthInstance()

            auth2.signIn()
                .then(googleUser => {
                    const profile = googleUser.getBasicProfile()
                    const id_token = googleUser.getAuthResponse().id_token
                    // console.log('ID Token: ' + id_token)

                    authWithG(profile.getName(), id_token)
                })
                .catch(err => {
                    errorAuthG(err.error);
                })
        }

    }
    signOut = event => {
        const {startingAuthWithG, signOutWithG, errorAuthG} = this.props
        event.preventDefault()

        if (window.gapi.auth2 !== undefined) {
            startingAuthWithG()
            const auth2 = window.gapi.auth2.getAuthInstance()
            auth2.signOut()
                .then(() => {
                    signOutWithG()
                })
                .catch(err => {
                    errorAuthG(err.error);
                })
        }
    }

    render() {
        const {isAuth, username} = this.props
        return (
            <div className={s.header}>
                <div className={s.wrapper}>
                    <div className={s.item}>
                        <Nav/>
                    </div>
                    <div className={s.auth}>
                        {(!!isAuth) && <span className={s.userNane}>{username}</span>}
                        {(!isAuth) && <button className={s.btn} onClick={this.signIn}>Sign in with google</button>}
                        {(!!isAuth) && <button className={s.btn} onClick={this.signOut}>Log Out</button>}
                        <div className={s.d}>
                            <NavLink to="/signup">SignUp</NavLink>
                            {(!isAuth) && <NavLink to="/login">LogIn</NavLink>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header