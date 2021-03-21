import React from "react";
import {
    Button,
    Card,
    CardContent,
    CssBaseline, Dialog, DialogContent, DialogTitle,
    FormControlLabel,
    List,
    ListItem,
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
            answers: []
        },
        redirectToLoginPage: false,
        errorDialog: false
    }

    componentDidMount() {
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
                console.log(response.data);
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
        let redirectToLoginPage = null;
        if (this.state.redirectToLoginPage) {
            redirectToLoginPage = (
                <Redirect to="/prisijungti" />
            );
        }

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
                {redirectToLoginPage}
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
                                                <FormControlLabel
                                                    control={<Radio/>}
                                                    checked={this.state.checked === surveyAnswer.id}
                                                    tabIndex={-1}
                                                    label={surveyAnswer.title}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                    <Button disabled={this.props.auth.token === null} onClick={() => this.submitSurveyHandler()} variant="contained" color="primary">
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
