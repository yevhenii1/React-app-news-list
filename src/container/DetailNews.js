import React from 'react'
import {connect} from 'react-redux'
import NewsList from "../components/News/NewsList";
import {deleteNewById, getNewsById} from "../actions/news";
import * as jwt from "jsonwebtoken";

class DetailNews extends React.Component {
    state = {
        user_id: null,
    }
    handleDelete = (id) => {
        this.props.deleteNewById(id, this.props.auth.token)
    }

    componentDidMount() {
        this.props.getNewsById(this.props.match.params.newsId)
    }
    componentDidUpdate(prevState) {
        if (prevState.user_id === null && this.props.auth.token !== null) {
            this.setState({user_id: jwt.decode(this.props.auth.token).id})
        }
    }

    renderNewsDetail = (feed) => {
        if (feed) {
            return <NewsList
                id={feed._id}
                title={feed.title}
                content={feed.content}
                createDate={feed.createDate}
                displayName={feed.creator.displayName}
                actionDelete={this.handleDelete}
                isAuth={this.props.auth.isAuth}
                editable={(feed.creator._id === this.state.user_id) ? 'editable' : ''}
                detail
            />
        }
    }

    render() {
       return (
            <>
                {this.renderNewsDetail(this.props.news.feed_item)}
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        news: state.news,
        auth: state.auth,
    }
}

export default connect(mapStateToProps, {getNewsById, deleteNewById})(DetailNews)

