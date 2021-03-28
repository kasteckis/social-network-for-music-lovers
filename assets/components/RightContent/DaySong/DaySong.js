import React, {Component} from "react";
import axios from "axios";
import {Badge, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Typography} from "@material-ui/core";
import {Favorite} from "@material-ui/icons";
import {Redirect} from "react-router-dom";
import MusicBadge from "../../Utils/MusicBadge/MusicBadge";

class DaySong extends Component {
    state = {
        daySong: {
            title: '',
            spotifyLink: '',
            likes: 0
        },
        redirectToLoginPage: false
    }

    componentDidMount() {
        axios.get('/api/day-song')
            .then(response => {
                this.setState({ daySong: response.data });
            })
    }

    likeSongHandler() {
        if (this.props.auth.token) {
            const headers = {
                headers: {
                    Authorization: 'Bearer ' + this.props.auth.token
                }
            };
            axios.get('/api/day-song/like', headers)
                .then(response => {
                    this.setState({daySong: response.data})
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            this.setState({redirectToLoginPage: true});
        }
    }

    render() {
        return (
            <Card className="mt-2">
                {this.state.redirectToLoginPage ? <Redirect to="/prisijungti" /> : null}
                <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                        <b>Dienos daina</b>
                    </Typography>
                    <Divider />
                    <Typography variant="body2" component="p">
                        {this.state.daySong.title}
                    </Typography>
                    <div className="mt-2">
                        <iframe src={this.state.daySong.spotifyLink}
                            width="100%" height="80" frameBorder="0"
                            allow="encrypted-media"
                        />
                    </div>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={() => this.likeSongHandler()} >
                        <MusicBadge badgeContent={this.state.daySong.likes}>
                            <Favorite />
                        </MusicBadge>
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

export default DaySong;