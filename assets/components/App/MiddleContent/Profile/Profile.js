import React, {Component} from 'react';
import {
    Avatar, Button,
    Card,
    CardActionArea,
    CardContent, Dialog, DialogActions, DialogContent, DialogTitle,
    Divider, List,
    ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField,
    Typography
} from "@material-ui/core";
import {Face} from "@material-ui/icons";
import axios from "axios";
import {shallowEqual} from "recompose";
import ChangeBioDialog from "./ChangeBioDialog/ChangeBioDialog";

class Profile extends Component {
    state = {
        auth: null,
        user: {
            id: null,
            username: null,
            email: null,
            roles: [],
            bio: '',
            role: null,
            registered: null,
            profilePicture: null
        },
        dataLoaded: false,
        dialogErrorText: '',
        bioDialog: false,
    }

    constructor(props, context) {
        super(props, context);
        this.bioRef = React.createRef();
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
                    this.setState({user: response.data, dataLoaded: true})
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    uploadProfilePictureHandler(event) {
        const file = event.target.files[0];

        axios.post('/api/user/profile-picture', file, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + this.props.auth.token
            }
        }).then(response => {
            this.setState({user: response.data})
        })
        .catch(error => {
            console.log(error);
        })
    }

    openBioDialogHandler(event) {
        event.preventDefault();

        this.setState({bioDialog: true, dialogErrorText: ''});
        setTimeout(() => {
            this.bioRef.current.value = this.state.user.bio;
        }, 100);
    }

    closeBioDialogHandler = () => {
        this.setState({bioDialog: false});
    };

    handleSubmitBioHandler(event) {
        event.preventDefault();

        const data = {
            bio: this.bioRef.current.value
        }

        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };

        axios.post('/api/profile/bio', data, headers)
            .then(response => {
                this.setState({user: response.data});
                this.closeBioDialogHandler();
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const bioDialog = (
            <ChangeBioDialog
                bioDialog={this.state.bioDialog}
                closeBioDialogHandler={this.closeBioDialogHandler}
                handleSubmitBioHandler={(event) => this.handleSubmitBioHandler(event)}
                dialogErrorText={this.state.dialogErrorText}
                bioRef={this.bioRef}
            />
        );

        return (
            <Card>
                <List>
                    <CardContent>
                        {bioDialog}
                        <input
                            ref={input => this.fileInputElement = input}
                            type="file"
                            onChange={(event) => this.uploadProfilePictureHandler(event)}
                            hidden
                        />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <CardActionArea onClick={() => this.fileInputElement.click()}>
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

                    <CardActionArea onClick={(event) => this.openBioDialogHandler(event)}>
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