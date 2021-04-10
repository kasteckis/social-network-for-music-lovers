import React, {Component} from 'react';
import {
    Avatar,
    Card,
    CardActionArea,
    CardContent, Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@material-ui/core";
import axios from "axios";

class ViewGroup extends Component {

    state = {
        group: {
            id: 0,
            title: null,
            songs: 0,
            albums: 0
        },
        groupDoesNotExist: false
    }

    componentDidMount() {
        axios.get('/api/group/' + this.props.match.params.id)
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        group: response.data.group
                    });
                } else {
                    this.setState({
                        groupDoesNotExist: true
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <Card>
                <List>
                    {this.state.groupDoesNotExist ?
                        <CardActionArea>
                            <CardContent>
                                <ListItem>
                                    <Typography align="center" variant="body2" color="textSecondary" component="p">
                                        Tokia grupė sistemoje nerasta
                                    </Typography>
                                </ListItem>
                            </CardContent>
                        </CardActionArea>
                        :
                        <React.Fragment>
                            <CardContent>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <CardActionArea>
                                                {null ?
                                                    <img style={{maxWidth: '100%'}} src={"/images/profile/" + "grupes pav"} alt={"grupes pav" + ' profilio nuotrauka'} />
                                                    :
                                                    <img style={{maxWidth: '100%'}} src="/images/default_profile_picture.png" alt={"grupes pav" + ' profilio nuotrauka'} />
                                                }
                                            </CardActionArea>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Grupė - {"grupes pav"}
                                    </Typography>
                                </ListItem>
                            </CardContent>

                            <CardActionArea>
                                <CardContent>
                                    <ListItem>
                                        <Typography align="center" variant="body2" color="textSecondary" component="p">
                                            {"a"}
                                        </Typography>
                                    </ListItem>
                                </CardContent>
                            </CardActionArea>

                            <CardActionArea>
                                <CardContent>
                                    <ListItem>
                                        <ListItemText primary="Užsiregistruota" secondary={"qq"} />
                                    </ListItem>
                                </CardContent>
                            </CardActionArea>
                            <CardActionArea>
                                <CardContent>
                                    <ListItem>
                                        <ListItemText primary="Rolė" secondary={"b"} />
                                    </ListItem>
                                </CardContent>
                            </CardActionArea>
                            <Divider/>
                            <CardActionArea>
                                <CardContent>
                                    <ListItem>
                                        <ListItemText primary="Slapyvardis" secondary={"aa"} />
                                    </ListItem>
                                </CardContent>
                            </CardActionArea>
                        </React.Fragment>
                    }
                </List>
            </Card>
        );
    }
}

export default ViewGroup;
