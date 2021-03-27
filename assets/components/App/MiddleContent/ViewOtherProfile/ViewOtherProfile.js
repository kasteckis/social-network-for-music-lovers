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

class ViewOtherProfile extends Component {
    state = {
        user: {
            id: null,
            username: null,
            bio: null,
            role: null,
            registered: null,
            profilePicture: null
        },
        dataLoaded: false,
        userDoesNotExist: false
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        axios.get('/api/user/' + this.props.match.params.name)
            .then(response => {
                this.setState({user: response.data, dataLoaded: true})
            })
            .catch(error => {
                this.setState({userDoesNotExist: true});
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.name !== prevProps.match.params.name) {
            window.scrollTo(0, 0);
            axios.get('/api/user/' + this.props.match.params.name)
                .then(response => {
                    this.setState({user: response.data, dataLoaded: true})
                })
                .catch(error => {
                    this.setState({userDoesNotExist: true});
                })
        }
    }

    render() {
        return (
            <Card>
                <List>
                    {this.state.userDoesNotExist ?
                        <CardActionArea>
                            <CardContent>
                                <ListItem>
                                    <Typography align="center" variant="body2" color="textSecondary" component="p">
                                        Toks naudotojas neegzistuoja
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
                                                {this.state.dataLoaded ?
                                                    <React.Fragment>
                                                        {this.state.user.profilePicture ?
                                                            <img style={{maxWidth: '100%'}} src={"/images/profile/" + this.state.user.profilePicture} alt={this.state.user.username + ' profilio nuotrauka'} />
                                                            :
                                                            <img style={{maxWidth: '100%'}} src="/images/default_profile_picture.png" alt={this.state.user.username + ' profilio nuotrauka'} />
                                                        }
                                                    </React.Fragment>
                                                    :
                                                    null
                                                }
                                            </CardActionArea>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {this.state.user.username} - Profilis
                                    </Typography>
                                </ListItem>
                            </CardContent>

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
                                        <ListItemText primary="Slapyvardis" secondary={this.state.user.username} />
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

export default ViewOtherProfile;