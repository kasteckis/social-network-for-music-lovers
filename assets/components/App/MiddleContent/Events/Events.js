import React, {Component} from 'react';
import {
    Button,
    Card,
    CardContent,
    Divider, FormControl,
    Grid, InputLabel, MenuItem, Select,
    TextField
} from "@material-ui/core";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";
import Event from "./Event/Event";

class Events extends Component {

    state = {
        events: [],
        startDateTime: new Date(),
        endDateTime: null,
        type: 'all'
    }

    constructor(props, context) {
        super(props, context);
        this.filterTextRef = React.createRef();
    }

    componentDidMount() {
        const oneMonthLater = new Date(this.state.startDateTime.getFullYear(), this.state.startDateTime.getMonth(), this.state.startDateTime.getDate()+30);

        this.setState({
            endDateTime: oneMonthLater
        })

        this.loadEvents(this.state.startDateTime, oneMonthLater, this.filterTextRef.current.value, this.state.type);
    }

    loadEvents(from, to, filter, type) {
        const params = {
            from: from,
            to: to,
            filter: filter,
            type: type
        };

        axios.get('/api/events', { params })
            .then(response => {
                console.log(response.data);
                this.setState({events: response.data});
            })
            .catch(error => {
                console.log(error);
            })
    }

    eventTypeHandler(event) {
        this.setState({type: event.target.value});
    }

    startDateTimeHandler(date) {
        this.setState({startDateTime: date});
    }

    endDateTimeHandler(date) {
        this.setState({endDateTime: date});
    }

    filterEvents(event) {
        event.preventDefault();
        this.loadEvents(this.state.startDateTime, this.state.endDateTime, this.filterTextRef.current.value, this.state.type);
    }

    render() {
        return (
            <React.Fragment>
                <Card className="mt-2" variant="outlined">
                    <CardContent>
                        <form onSubmit={(event) => this.filterEvents(event)}>
                            <Grid container spacing={2}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid item xs={6}>
                                        <TextField
                                            inputRef={this.filterTextRef}
                                            autoFocus
                                            margin="dense"
                                            label="Pavadinimas"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="event-type">Renginio tipas</InputLabel>
                                            <Select
                                                labelId="event-type"
                                                value={this.state.type}
                                                onChange={(event) => this.eventTypeHandler(event)}
                                            >
                                                <MenuItem value={"all"}>Visi</MenuItem>
                                                <MenuItem value={"online"}>Tik online</MenuItem>
                                                <MenuItem value={"live"}>Tik gyvas</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} container justify="center">
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="yyyy-MM-dd"
                                            margin="normal"
                                            label="Renginio data nuo"
                                            value={this.state.startDateTime}
                                            onChange={(date) => this.startDateTimeHandler(date)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} container justify="center">
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="yyyy-MM-dd"
                                            margin="normal"
                                            label="Renginio data iki"
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
                                <React.Fragment key={event.id}>
                                    <Event event={event} />
                                </React.Fragment>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

export default Events;
