import React, {Component} from "react";
import axios from "axios";
import {Badge, Card, CardActions, CardContent, CardHeader, IconButton, Typography} from "@material-ui/core";
import {Favorite} from "@material-ui/icons";

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
            <Card className="mt-2">
                <CardHeader
                    title="Dienos daina"
                />
                <CardContent>
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
                    <IconButton >
                        <Badge badgeContent={this.state.daySong.likes} color="error">
                            <Favorite />
                        </Badge>
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

export default DaySong;