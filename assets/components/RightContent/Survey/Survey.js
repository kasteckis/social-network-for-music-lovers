import React from "react";
import {
    Button,
    Card,
    CardContent,
    CssBaseline,
    FormControlLabel,
    List,
    ListItem,
    Radio,
    Typography
} from "@material-ui/core";

class Survey extends React.Component {

    state = {
        checked: -1
    }

    handleToggle(value) {
        this.setState({checked: value});
    }

    render() {
        return (
            <Card className="mt-2" variant="outlined">
                <CardContent>
                    <CssBaseline/>

                    <div>
                        <Typography color="textPrimary" gutterBottom>
                            Kaip sekasi?
                        </Typography>
                        <form noValidate>
                            <List>
                                <ListItem
                                    role={undefined}
                                    button
                                    onClick={() => this.handleToggle(0)}
                                    // className={classes.listItem}
                                >
                                    <FormControlLabel
                                        control={<Radio/>}
                                        checked={this.state.checked === 0}
                                        tabIndex={-1}
                                        label="Gerai"
                                    />
                                </ListItem>
                                <ListItem
                                    role={undefined}
                                    button
                                    onClick={() => this.handleToggle(1)}
                                    // className={classes.listItem}
                                >
                                    <FormControlLabel
                                        control={<Radio/>}
                                        checked={this.state.checked === 1}
                                        tabIndex={-1}
                                        label="Puikiai"
                                    />
                                </ListItem>
                            </List>
                            <Button variant="contained" color="primary">
                                Balsuoti
                            </Button>
                        </form>
                    </div>
                </CardContent>
            </Card>
        );
    }
}

export default Survey;
