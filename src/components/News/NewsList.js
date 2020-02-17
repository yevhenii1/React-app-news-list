import React from 'react'
import {Link} from "react-router-dom";
import s from './NewsList.module.css'
import history from '../../utils/history'
import ModalDelete from "../Modal/ModalDelete/ModalDelete";
import {formatDate} from "../../utils/formatDate";

class NewsList extends React.Component {
    state = {
        isModalOpen: false,
        delete: true,
    }
    toggleModal = () => {
        this.setState(state => ({isModalOpen: !state.isModalOpen}))
    }
    handleDeleteClick = () => {
        this.props.actionDelete(this.props.id);
            this.props.detail &&
            history.push('/news')
    }


    render() {
        let skiceContent = this.props.content.length >= 100
            ? this.props.content.slice(0, 100) + '...'
            : this.props.content

        let allContent = this.props.content

        return (
            <>
            <div className={s.backLink}>
                {!!this.props.detail &&
                <Link to={"/news"}>На главную</Link>
                }
            </div>
            <div className={s.item}>
                {this.props.detail
                    ? <h3>{this.props.title}</h3>
                    : <h3><Link to={"/news/" + this.props.id}>{this.props.title}</Link></h3>
                }
                <p>{this.props.detail ? allContent : skiceContent}</p>
                <div className={s.readMore}>
                    {!this.props.detail &&
                    <Link to={"news/" + this.props.id}>прочитать больше</Link>
                    }
                </div>
                <div className={s.footer}>
                    <div className={s.left}>
                        <span>{formatDate(this.props.createDate)}</span>
                        <div>{this.props.displayName}</div>
                    </div>

                        <div className={s.right}>
                            <button className={(this.props.isAuth && this.props.editable === 'editable') ? s.delete : s.disabled } onClick={this.toggleModal} >Удалить</button>
                            {(!!this.props.isAuth) && this.state.isModalOpen &&
                            <ModalDelete delete={this.state.delete}
                                         handleDeleteClick={this.handleDeleteClick}
                                         title={this.props.title}
                                         closed={this.toggleModal}/>
                            }
                            <Link className={(this.props.isAuth && this.props.editable === 'editable') ? s.delete : s.disabled  } to={"/news/" + this.props.id + '/edit'}>Редактировать</Link>
                        </div>
                </div>
            </div>
            </>
        )
    }
}


export default NewsList