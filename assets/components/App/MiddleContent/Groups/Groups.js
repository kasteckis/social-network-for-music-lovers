import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    TextField
} from "@material-ui/core";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Pagination} from "@material-ui/lab";
import axios from "axios";

class Groups extends Component {

    state = {
        groups: [],
        pageNumber: 1,
        groupsCount: 0
    }

    constructor(props, context) {
        super(props, context);
        this.filterTextRef = React.createRef();
    }

    componentDidMount() {
        this.loadGroups(0, 10, null);
    }

    loadGroups(offset, limit, filter) {
        const params = {
            offset: offset,
            limit: limit,
            filter: filter
        };

        axios.get('/api/groups', { params })
            .then(response => {
                console.log(response.data);
                this.setState({
                    groups: response.data.groups,
                    groupsCount: response.data.groupsCount
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    filterGroups(event) {
        event.preventDefault();
        window.scrollTo(0, 0);
        this.loadGroups((this.state.pageNumber-1) * 10, 10, this.filterTextRef.current.value);
    }

    handlePaginationChange(event, value) {
        window.scrollTo(0, 0);
        this.setState({pageNumber: value});
        this.loadGroups((value-1) * 10, 10, this.filterTextRef.current.value);
    }

    render() {
        return (
            <Card className="mt-2" variant="outlined">
                <CardContent>
                    <form onSubmit={(event) => this.filterGroups(event)}>
                        <Grid container spacing={2}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid item xs={12}>
                                    <TextField
                                        inputRef={this.filterTextRef}
                                        autoFocus
                                        margin="dense"
                                        label="Pavadinimas"
                                        fullWidth
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid
                            container
                            justify="center"
                        >
                            <Button onClick={(event) => this.filterGroups(event)} color="primary">
                                Filtruoti
                            </Button>
                        </Grid>
                    </form>
                    <Divider className="mt-2" />
                    <div className="mt-2">
                        {this.state.groups.map((group) => (
                            <React.Fragment key={group.id}>
                                {group.title}
                            </React.Fragment>
                        ))}
                    </div>
                    <Grid
                        container
                        justify="center"
                    >
                        <Pagination
                            onChange={(event, value) => this.handlePaginationChange(event, value)}
                            page={parseInt(this.state.pageNumber)}
                            className="mt-3"
                            count={Math.ceil(this.state.groupsCount/10) ? Math.ceil(this.state.groupsCount/10) : 1}
                            color="primary"
                        />
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(Groups);
