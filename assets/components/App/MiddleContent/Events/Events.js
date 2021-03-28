import React, {Component} from 'react';
import {Button, Card, CardContent, Divider, Grid, Paper, TextField, Typography} from "@material-ui/core";
import Linkify from "react-linkify";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

class Events extends Component {

    state = {
        events: [],
        startDateTime: new Date(),
        endDateTime: new Date()
    }

    constructor(props, context) {
        super(props, context);
        this.filterTextRef = React.createRef();
    }

    startDateTimeHandler(date) {
        this.setState({startDateTime: date});
    }

    endDateTimeHandler(date) {
        this.setState({endDateTime: date});
    }

    filterEvents(event) {
        event.preventDefault();
        console.log(this.state.startDateTime);
        console.log(this.state.endDateTime);
        console.log(this.filterTextRef.current.value);
    }

    render() {
        return (
            <React.Fragment>
                <Card className="mt-2" variant="outlined">
                    <CardContent>
                        <form onSubmit={(event) => this.filterEvents(event)}>
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
                                    <Grid item xs={3}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            label="Date picker inline"
                                            value={this.state.startDateTime}
                                            onChange={(date) => this.startDateTimeHandler(date)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            label="Date picker inline"
                                            value={this.state.endDateTime}
                                            onChange={(date) => this.endDateTimeHandler(date)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid
                                container
                                justify="center"
                            >
                                <Button onClick={(event) => this.filterEvents(event)} color="primary">
                                    Filtruoti
                                </Button>
                            </Grid>
                        </form>
                        <Divider className="mt-2" />
                        <div className="mt-2">
                            {this.state.events.map((event) => (
                                <div>hello</div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

export default Events;
