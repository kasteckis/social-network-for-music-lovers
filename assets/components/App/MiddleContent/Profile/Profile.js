import React, {Component} from 'react';
import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    Divider, List,
    ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText,
    Typography
} from "@material-ui/core";
import {Face} from "@material-ui/icons";
import axios from "axios";
import {shallowEqual} from "recompose";

class Profile extends Component {
    state = {
        auth: null,
        user: {
            id: null,
            username: null,
            email: null,
            roles: null,
            bio: null,
            role: null,
            registered: null
        }
    }

    componentDidMount() {
        this.setState({auth: this.props.auth});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!shallowEqual(prevProps.auth, this.props.auth)) {
            this.setState({auth: this.props.auth});
        }

        if (this.state.auth.token && this.state.user.id === null) {
            const headers = {
                headers: {
                    Authorization: 'Bearer ' + this.state.auth.token
                }
            };

            axios.get('/api/user', headers)
                .then(response => {
                    this.setState({user: response.data})
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    render() {
        return (
            <Card>
                <List>
                   <CardActionArea>
                        <CardContent>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Face />
                                    </Avatar>
                                </ListItemAvatar>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.user.username} - Profilis
                                </Typography>
                            </ListItem>
                        </CardContent>
                    </CardActionArea>

                    <CardActionArea>
                        <CardContent>
                            <ListItem>
                                <Typography align="center" variant="body2" color="textSecondary" component="p">
                                    {this.state.user.bio}
                                </Typography>
                            </ListItem>
                        </CardContent>
                    </CardActionArea>

                    <CardActionArea>
                        <CardContent>
                            <ListItem>
                                <ListItemText primary="Užsiregistruota" secondary={this.state.user.registered} />
                            </ListItem>
                        </CardContent>
                    </CardActionArea>
                    <CardActionArea>
                        <CardContent>
                            <ListItem>
                                <ListItemText primary="Rolė" secondary={this.state.user.role} />
                            </ListItem>
                        </CardContent>
                    </CardActionArea>
                    <Divider/>
                    <CardActionArea>
                        <CardContent>
                            <ListItem>
                                <ListItemText primary="El. paštas" secondary={this.state.user.email} />
                                {/*<ListItemSecondaryAction>*/}
                                {/*    aa*/}
                                {/*</ListItemSecondaryAction>*/}
                            </ListItem>
                        </CardContent>
                    </CardActionArea>
                    <CardActionArea>
                        <CardContent>
                            <ListItem>
                                <ListItemText primary="Slapyvardis" secondary={this.state.user.username} />
                            </ListItem>
                        </CardContent>
                    </CardActionArea>
                </List>
            </Card>
        );
    }
}

export default Profile;