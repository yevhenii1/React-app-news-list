import React from 'react'
import {Field, reduxForm} from "redux-form";
import ReCAPTCHA from "react-google-recaptcha";
import {minLengthCreator, required} from "../../utils/validator";
import {Input} from "../forms/FormControls/index";
import s from './Autorization.module.css'

const Autorization = (props) => {

    return (
        <>
        <div className={s.form}>
            {props.login
                ? <h3>Вход</h3>
                : <h3>Регистрация</h3>
            }
            <AutorizationFormRedux onSubmit={props.login ? props.handleLogin : props.handleSignUp} login={props.login}/>
        </div>
        </>
    )
}
const minLength = minLengthCreator(8)

class AutorizationForm extends React.Component {
    state = {
        ready: false,
    }

    renderRecaptchaField(field) {
        const {meta: {touched, error}} = field;
        return (
            <div>
                <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={field.input.onChange}
                />
                <div><p className="text-danger">{touched ? error : ''}</p></div>
            </div>
        );
    }

    render() {
        const {pristine, submitting, handleSubmit} = this.props
        return (
            <form onSubmit={handleSubmit}>
                <label>Логин</label>
                <div>
                    <Field
                        type="text"
                        component={Input}
                        name="username"
                        placeholder="Ваш логин"
                        validate={[required]}
                        className={s.input}
                    />
                </div>
                <label>Пароль</label>
                <div>
                    <Field
                        type="password"
                        component={Input}
                        name="password"
                        placeholder="Ваш пароль"
                        validate={[required, minLength]}
                        className={s.input}
                    />
                </div>
                {this.props.login
                    ? null
                    : (
                        <div className={s.recaptcha}>
                            <Field
                                component={this.renderRecaptchaField}
                                name="recaptcha"
                            />
                        </div>
                    )
                }

                <button className={s.btn} type="submit" disabled={pristine || submitting}>
                    {this.props.login ? 'Вход' : 'Регистрация'}
                </button>
            </form>
        )
    }

}

const AutorizationFormRedux = reduxForm({form: "AutorizationForm"})(AutorizationForm)

export default Autorization