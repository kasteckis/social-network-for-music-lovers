import React, {Component} from 'react';
import axios from "axios";
import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Divider,
    Grid, List, ListItem, ListItemText,
    TextField
} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import {withRouter} from "react-router-dom";

class UserList extends Component {
    state = {
        users: [],
        filterErrorText: '',
        usersCount: 0,
        pageNumber: 1
    }

    constructor(props, context) {
        super(props, context);
        this.filterTextRef = React.createRef();
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        this.updateUsers(this.state.pageNumber, this.filterTextRef.current.value);
    }

    updateUsers(page, filterText) {
        const data = {
            page: page,
            filterText: filterText
        }

        axios.post('/api/users', data)
            .then(response => {
                this.setState({
                    users: response.data.users,
                    usersCount: response.data.usersCount
                });
            })
            .catch(error => {
                console.log(error)
            });
    }

    handleFilter(event) {
        event.preventDefault();
        this.setState({pageNumber: 1});
        this.updateUsers(1, this.filterTextRef.current.value);
    }

    handlePaginationChange(event, value) {
        this.setState({pageNumber: value});

        this.updateUsers(value, this.filterTextRef.current.value);
    }

    handleRedirectToProfile(name) {
        this.props.history.push('/profilis/' + name);
    }

    render() {
        return (
            <Card className="mt-2" variant="outlined">
                <CardContent>
                    <form onSubmit={(event) => this.handleFilter(event)}>
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
                        <Pagination onChange={(event, value) => this.handlePaginationChange(event, value)} page={this.state.pageNumber} className="mt-3" count={Math.ceil(this.state.usersCount/10)} color="primary" />
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(UserList);
