import React, {Component} from 'react';
import Post from "../Feed/Post/Post";
import axios from "axios";

class News extends Component {
    state = {
        news: []
    }

    componentDidMount() {
        this.getPostsHandler();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.auth.token === null && this.props.auth.token) {
            this.getPostsHandler();
        }
    }

    getPostsHandler() {
        let headers = {};

        if (this.props.auth.token) {
            headers = {
                headers: {
                    Authorization: 'Bearer ' + this.props.auth.token
                }
            }
        }

        axios.get('/api/news', headers)
            .then(response => {
                this.setState({news: response.data})
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.news.map((news) => (
                    <div className="mt-2" key={news.id}>
                        <Post auth={this.props.auth} post={news}/>
                    </div>
                ))}
            </React.Fragment>
        );
    }
}

export default News;
