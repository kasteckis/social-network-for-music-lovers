import React from "react";
import {
    Button,
    Card,
    CardContent,
    CssBaseline, Dialog, DialogContent, DialogTitle,
    FormControlLabel,
    List,
    ListItem, ListItemText,
    Radio,
    Typography
} from "@material-ui/core";
import axios from "axios";
import {Redirect} from "react-router-dom";

class Survey extends React.Component {

    state = {
        checked: -1,
        survey: {
            id: -1,
            title: null,
            answeredTotal: 0,
            showResults: true,
            answers: []
        },
        errorDialog: false
    }

    componentDidMount() {

        if (this.props.auth.token) {
            this.loadSurveyDataWithAuth();
        } else {
            this.loadSurveyDataWithoutAuth();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.auth.token === null && this.props.auth.token) {
            this.loadSurveyDataWithAuth();
        }
    }

    loadSurveyDataWithAuth() {
        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };

        axios.get('/api/survey', headers)
            .then(response => {
                if (!response.data.error) {
                    this.setState({survey: response.data});
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    loadSurveyDataWithoutAuth() {
        axios.get('/api/survey')
            .then(response => {
                if (!response.data.error) {
                    this.setState({survey: response.data});
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    submitSurveyHandler() {
        if (this.state.checked === -1) {
            this.setState({errorDialog: true});

            return;
        }

        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };

        const data = {
            surveyAnswerId: this.state.checked
        };

        axios.post('/api/survey', data, headers)
            .then(response => {
                this.setState({survey: response.data});
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleToggle(value) {
        this.setState({checked: value});
    }

    handleDialogClose() {
        this.setState({errorDialog: false});
    }

    render() {
        let dialogError = (
            <Dialog onClose={() => this.handleDialogClose()} aria-labelledby="customized-dialog-title" open={this.state.errorDialog}>
                <DialogTitle onClose={() => this.handleDialogClose()}>
                    Balsavimo klaida
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Pasirinkite balsavimo atsakymą
                    </Typography>
                </DialogContent>
            </Dialog>
        );

        return (
            <React.Fragment>
                {dialogError}
                {this.state.survey.id === -1 ?
                    null
                    :
                    <Card className="mt-2" variant="outlined">
                        <CardContent>
                            <CssBaseline/>

                            <div>
                                <Typography color="textPrimary" gutterBottom>
                                    {this.state.survey.title}
                                </Typography>
                                <form noValidate>
                                    <List>
                                        {this.state.survey.answers.map((surveyAnswer) => (
                                            <ListItem
                                                key={surveyAnswer.id}
                                                role={undefined}
                                                button
                                                onClick={() => this.handleToggle(surveyAnswer.id)}
                                            >
                                                {this.state.survey.showResults ?
                                                    <ListItemText
                                                        primary={surveyAnswer.title + ' (' + Number.parseFloat(surveyAnswer.percentage).toPrecision(4) + '%)'}
                                                        tabIndex={-1}
                                                    />
                                                    :
                                                    <FormControlLabel
                                                        control={<Radio/>}
                                                        checked={this.state.checked === surveyAnswer.id}
                                                        tabIndex={-1}
                                                        label={surveyAnswer.title}
                                                    />
                                                }
                                            </ListItem>
                                        ))}
                                    </List>
                                    <Button disabled={this.props.auth.token === null || this.state.survey.showResults} onClick={() => this.submitSurveyHandler()} variant="contained" color="primary">
                                        Balsuoti
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                }
            </React.Fragment>
        );
    }
}

export default Survey;
