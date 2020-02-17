import React, {Component} from 'react'
import {connect} from "react-redux";
import {logIn} from "../actions/auth";
import Autorization from "../components/Autorization/Authorization";

class logInContainer extends Component {

    handleLogin = (data) => {
        this.props.logIn(data)
    }
    render() {

        return (
            <Autorization handleLogin={this.handleLogin} login />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}
export default connect(mapStateToProps, {logIn})(logInContainer)