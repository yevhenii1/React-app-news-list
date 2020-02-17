import React from 'react'
import {connect} from 'react-redux'
import NewsList from "../components/News/NewsList";
import {addNews, deleteNewById, getNews} from "../actions/news";
import {AddNewsFormRedux} from "../components/forms/AddNewsFormRedux";
import * as jwt from "jsonwebtoken";
import history from '../utils/history'
import {Redirect} from "react-router-dom";

class News extends React.Component {
    state = {
        user_id: null,
        addState: false,
    }

    handleDelete = (id) => {
        this.props.deleteNewById(id, this.props.auth.token)
        this.props.newsPage.feeds_list = this.props.newsPage.feeds_list.filter((item) => {
            return item._id !== id
        })
    }
    onAddNews = (values) => {
        this.props.addNews(values.title, values.content)
        this.setState({addState: true})

    }

    componentDidMount() {
        this.props.getNews()

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.user_id === null && this.props.auth.token !== null) {
            this.setState({user_id: jwt.decode(this.props.auth.token).id})
        }
        if (prevProps.newsPage.create !== this.props.newsPage.create) {
            this.props.getNews()
        }
    }

    render() {
        // if(!this.props.newsPage.isPosts) return <Redirect to={'/news'} />
        return (
            <>
            <div>
                {!!this.props.auth.isAuth
                    ? <AddNewsFormRedux onSubmit={this.onAddNews}/>
                    : null
                }
            </div>
            {[...this.props.newsPage.feeds_list].reverse().map(item =>

                <NewsList
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    content={item.content}
                    createDate={item.createDate}
                    displayName={item.creator.displayName}
                    actionDelete={this.handleDelete}
                    isAuth={this.props.auth.isAuth}
                    userId={item.creator._id}
                    authUserId={this.props.auth.userId}
                    editable={item.creator._id === this.state.user_id ? 'editable' : ''}
                />
            )}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newsPage: state.news,
        auth: state.auth,
    }
}

export default connect(mapStateToProps, {getNews, addNews, deleteNewById})(News)

