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
            role: null
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

            axios.get('./api/user', headers)
                .then(response => {
                    console.log(response.data);
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
                                <ListItemText primary="Užsiregistruota" secondary="2015-02-01" />
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
            // <div className="card mt-2">
            //     <div className="card-body">
            //         <h3>Admin - Profilis</h3>
            //         <ul className="list-group list-group-flush">
            //             <li className="list-group-item d-flex justify-content-between align-items-center">
            //                 Naudotojo vardas
            //                 <span className="badge badge-primary badge-pill">Admin</span>
            //             </li>
            //             <li className="list-group-item d-flex justify-content-between align-items-center">
            //                 Elektroninis paštas
            //                 <span className="badge badge-primary badge-pill">admin@music.lt</span>
            //             </li>
            //             <li className="list-group-item d-flex justify-content-between align-items-center">
            //                 Užsiregistravo
            //                 <span className="badge badge-primary badge-pill">2021-02-01</span>
            //             </li>
            //             <li className="list-group-item d-flex justify-content-between align-items-center">
            //                 Parašyta pranešimų
            //                 <span className="badge badge-primary badge-pill">102</span>
            //             </li>
            //             <li className="list-group-item d-flex justify-content-between align-items-center">
            //                 El. laiškų prenumeravimas
            //                 <form method="post">
            //                     <button type="submit" name="emailSub" value="email_subscription"
            //                             className="btn btn-sm btn-success">Prenumeruojama
            //                     </button>
            //                 </form>
            //             </li>
            //         </ul>
            //     </div>
            // </div>
        );
    }
}

export default Profile;