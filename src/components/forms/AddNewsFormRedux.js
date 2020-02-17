import React from 'react'
import {Field,  reduxForm} from "redux-form";
import s from './AddNewsFromRedux.module.css'


const AddNewForm = (props) => {
    return (
        <form className={s.form} onSubmit={props.handleSubmit}>
            <div className={s.wrapper}>
                <div className={s.title}>
                    <label>Заголовок</label>
                    <Field
                        label="Заголовок"
                        component="textarea"
                        name="title"
                        placeholder="Enter your news"
                    />
                </div>
                <div className={s.content}>
                    <label>Текст</label>
                    <Field
                        component="textarea"
                        name="content"
                        placeholder="Enter your news"
                    />
                </div>
                <button className={s.btn}>Add News</button>
            </div>
        </form>
    )
}

export const AddNewsFormRedux = reduxForm({ form: "newsAddForm"})(AddNewForm)