import React from 'react'
import {connect} from "react-redux";
import Header from "../components/Header/Header";
import {authWithG, errorAuthG,  signOutWithG, startingAuthWithG} from "../actions/auth";

class HeaderContainer extends React.Component {


    render() {
        return (
            <Header
                username={this.props.auth.username}
                isAuth={this.props.auth.isAuth}
                startingAuthWithG={this.props.startingAuthWithG}
                authWithG={this.props.authWithG}
                signOutWithG={this.props.signOutWithG}
                errorAuthG={this.props.errorAuthG}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}
export default connect(mapStateToProps, {startingAuthWithG, authWithG, signOutWithG, errorAuthG})(HeaderContainer)

