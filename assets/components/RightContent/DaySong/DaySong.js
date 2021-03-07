import React, {Component} from "react";
import axios from "axios";

class DaySong extends Component {
    state = {
        daySong: {
            title: '',
            spotifyLink: '',
            likes: 0
        }
    }

    componentDidMount() {
        axios.get('./api/day-song')
            .then(response => {
                this.setState({ daySong: response.data });
            })
    }

    render() {
        return (
            <div className="card mt-2">
                <div className="card-body mx-auto">
                    <h5 className="card-title">Dienos daina</h5>
                    <p className="card-text"><b>{this.state.daySong.title}</b></p>
                    <iframe src={this.state.daySong.spotifyLink}
                            width="100%" height="80" frameBorder="0"
                            allow="encrypted-media"/>
                    <br/>
                    <a href="#" className="btn btn-success"><i className="far fa-heart"/> {this.state.daySong.likes}</a>
                </div>
            </div>
        );
    }
}

export default DaySong;