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
import axios from "axios";

class Survey extends React.Component {

    state = {
        checked: -1,
        survey: {
            id: -1,
            title: null,
            answeredTotal: 0,
            answers: []
        }
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
            console.log("nepasirinkta reiksme");

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

    render() {
        return (
            <React.Fragment>
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
                                    <Button onClick={() => this.submitSurveyHandler()} variant="contained" color="primary">
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
