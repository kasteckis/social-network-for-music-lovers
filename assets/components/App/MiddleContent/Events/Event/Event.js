import React, {Component} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Divider, Typography} from "@material-ui/core";
import Linkify from "react-linkify";

class Event extends Component {
    render() {
        return (
            <Card>
                <CardActionArea onClick={() => console.log('redirectint i eventa')}>
                    <CardContent>
                        {this.props.event.image ?
                            <CardMedia
                                style={{height: 140}}
                                image={window.location.origin + '/images/events/' + this.props.event.image}
                                title={this.props.event.title}
                            />
                            :
                            null
                        }
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.event.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.props.event.endDateTime ?
                                <React.Fragment>
                                    {this.props.event.startDateTime} - {this.props.event.endDateTime}
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    {this.props.event.startDateTime}
                                </React.Fragment>
                            }
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <Linkify>{this.props.event.address}</Linkify>
                        </Typography>
                        <Divider className="mt-2" />
                        <Typography className="mt-2" variant="body2" color="textSecondary" component="p">
                            {this.props.event.text.substring(0, 140)}...
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

export default Event;