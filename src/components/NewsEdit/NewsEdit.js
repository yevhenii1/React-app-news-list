import React from 'react'
import {Field, reduxForm} from "redux-form";
import s from './NewsEdit.module.css'

const NewsEdit = (props) => {

    return(
        <>
            <EditNewsFormRedux
                isAuth={props.isAuth}
                handleCancel={props.handleCancel}
                title={props.title}
                content={props.content}
                onSubmit={props.saveAction}
                edited={props.edited}
            />

        </>
    )
}
export default NewsEdit

class EditNewForm extends React.Component {
    componentDidMount () {
        this.props.initialize({ title: this.props.title, content: this.props.content });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.title !== this.props.title) {
            this.props.initialize({ title: this.props.title, content: this.props.content });
        }
    }

    render() {
        return (
            <>
            <form className={s.form} onSubmit={this.props.handleSubmit}>
                <div className={s.formWrapper} >
                    <Field
                        component="textarea"
                        name="title"
                        type="text"
                        placeholder="Enter your news"
                        className={s.title}
                    />
                    <Field
                        component="textarea"
                        name="content"
                        placeholder="Enter your news"
                        className={s.content}
                    />
                </div>
                <div>
                    <button className={s.btn}  >Сохранить</button>
                    <button className={s.btn}  onClick={this.props.handleCancel}>Отмена</button>
                </div>
            </form>
            </>
        )
    }
}

export const EditNewsFormRedux = reduxForm({ form: "newsEditForm"})(EditNewForm)
