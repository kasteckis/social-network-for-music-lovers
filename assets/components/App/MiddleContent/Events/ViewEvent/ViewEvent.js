import React, {Component} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Divider, Typography} from "@material-ui/core";
import Linkify from "react-linkify";
import axios from "axios";

class ViewEvent extends Component {
    state = {
        event: {
            id: -1,
            title: null,
            text: null,
            startDateTime: null,
            endDateTime: null,
            address: null,
            remoteEvent: false,
            image: null,
            createdAt: null
        }
    }

    componentDidMount() {
        axios.get('/api/events/' + this.props.match.params.id)
            .then(response => {
                this.setState({event: response.data});
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <Card>
                <CardActionArea>
                    <CardContent>
                        {this.state.event.image ?
                            <CardMedia
                                style={{height: 140}}
                                image={window.location.origin + '/images/events/' + this.state.event.image}
                                title={this.state.event.title}
                            />
                            :
                            null
                        }
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.state.event.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.state.event.endDateTime ?
                                <React.Fragment>
                                    {this.state.event.startDateTime} - {this.state.event.endDateTime}
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    {this.state.event.startDateTime}
                                </React.Fragment>
                            }
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <Linkify>{this.state.event.address}</Linkify>
                        </Typography>
                        <Typography variant="body2" style={{color: "red"}} component="p">
                            {this.state.event.remoteEvent ? 'Renginys nuotolinis!' : null}
                        </Typography>
                        <Divider className="mt-2" />
                        <Typography className="mt-2" variant="body2" color="textSecondary" component="p">
                            {this.state.event.text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

export default ViewEvent;
