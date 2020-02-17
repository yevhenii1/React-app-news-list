import React from 'react'
import {connect} from "react-redux";
import {editNewsById, getNewsById} from "../actions/news";
import NewsEdit from "../components/NewsEdit/NewsEdit";
import {Redirect} from "react-router-dom";
import history from '../utils/history'


class NewsEditContainer extends React.Component {
        handleSave = (data) => {
            this.props.editNewsById(this.props.news.feed_item._id, this.props.auth.token, data)
    }
    handleCancel = () => {
        history.push("/news/" + this.props.news.feed_item._id)
    }
    componentDidMount() {

        if (this.props.auth.token) {
            this.props.getNewsById(this.props.match.params.newsId)
        }else {
            history.push('/news')
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.news.edited !== this.props.news.edited) {
            history.push('/news/' + this.props.match.params.newsId);
        }
    }

    render() {
        let renderEdit = <></>
        if(this.props.news.feed_item) {
            renderEdit = <NewsEdit
                details={this.props.news.feed_item}
                saveAction={this.handleSave}
                handleCancel={this.handleCancel}
                title={this.props.news.feed_item.title}
                content={this.props.news.feed_item.content}
                isAuth={this.props.auth.isAuth}
                id={this.props.match.params.newsId}
                edited={this.props.news.edited}
            />
        }
        if(!this.props.auth.isAuth) return <Redirect to={'/news'} />
        return (
            <>
                {renderEdit}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        news: state.news,
    }
}
export default connect(mapStateToProps, {editNewsById, getNewsById})(NewsEditContainer)