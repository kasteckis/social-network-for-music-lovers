import React, {Component} from 'react';
import axios from "axios";
import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Divider,
    Grid, List, ListItem, ListItemAvatar, ListItemText,
    TextField,
    Typography
} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import {Redirect} from "react-router-dom";

class UserList extends Component {
    state = {
        users: [],
        filterErrorText: '',
        usersCount: 0,
        pageNumber: 1,
        redirectTo: null
    }

    constructor(props, context) {
        super(props, context);
        this.filterTextRef = React.createRef();
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        axios.get('/api/users/' + this.state.pageNumber)
            .then(response => {
                console.log(response.data);
                this.setState({
                    users: response.data.users,
                    usersCount: response.data.usersCount
                });
            })
            .catch(error => {
                console.log(error)
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.redirectTo) {
            this.setState({redirectTo: null});
        }
    }

    handleFilter(event) {
        console.log("filtruot");
    }

    handlePaginationChange(event, value) {
        this.setState({pageNumber: value});

        axios.get('/api/users/' + value)
            .then(response => {
                console.log(response.data);
                this.setState({
                    users: response.data.users,
                    usersCount: response.data.usersCount
                });
            })
            .catch(error => {
                console.log(error)
            });
    }

    handleRedirectToProfile(name) {
        this.setState({redirectTo: '/profilis/' + name});
    }

    render() {
        let redirect = null;

        if (this.state.redirectTo) {
            redirect = (
                <Redirect to={this.state.redirectTo} />
            );
        }

        return (
            <Card className="mt-2" variant="outlined">
                {redirect}
                <CardContent>
                    <form onSubmit={(event) => this.handleSubmitMessage(event)}>
                        <TextField
                            error={this.state.filterErrorText.length !== 0}
                            helperText={this.state.filterErrorText}
                            autoFocus
                            inputRef={this.filterTextRef}
                            margin="dense"
                            label="Filtruoti naudotojus"
                            fullWidth
                        />
                        <Button onClick={(event) => this.handleFilter(event)} color="primary">
                            Filtruoti
                        </Button>
                    </form>
                    <Divider />
                    <div className="mt-2">
                        <List>
                            {this.state.users.map((user) => (
                                <React.Fragment key={user.id}>
                                    <ListItem button onClick={() => this.handleRedirectToProfile(user.username)}>
                                        <Avatar>
                                            <CardActionArea>
                                                {user.profilePicture ?
                                                    <img style={{maxWidth: '100%'}} src={"/images/profile/" + user.profilePicture} alt={user.username + ' profilio nuotrauka'} />
                                                    :
                                                    <img style={{maxWidth: '100%'}} src="/images/default_profile_picture.png" alt={user.username + ' profilio nuotrauka'} />
                                                }
                                            </CardActionArea>
                                        </Avatar>
                                        <ListItemText className="ml-2" primary={user.username} secondary={'Narys nuo ' + user.registered} />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </div>
                    <Grid
                        container
                        justify="center"
                    >
                        <Pagination onChange={(event, value) => this.handlePaginationChange(event, value)} page={this.state.pageNumber} className="mt-3" count={10} color="primary" />
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default UserList;
