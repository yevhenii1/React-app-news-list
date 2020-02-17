import React, {Component} from 'react'
import {connect} from "react-redux";
import {signUp} from "../actions/auth";
import Autorization from "../components/Autorization/Authorization";

class SignUpContainer extends Component {

    handleSignUp = (data) => {
        this.props.signUp(data)

    }

    render() {

        return (
            <Autorization handleSignUp={this.handleSignUp} signUp/>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}
export default connect(mapStateToProps, {signUp})(SignUpContainer)