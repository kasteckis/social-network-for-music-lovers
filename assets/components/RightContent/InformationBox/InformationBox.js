import React from "react";
import {Card, CardContent, Divider, Typography} from "@material-ui/core";
import axios from "axios";
import {withRouter} from "react-router-dom";

class InformationBox extends React.Component {

    state = {
        information: {
            todayVisited: 0,
            loggedIn: 0,
            registered: 0,
            lastRegisteredUser: {
                id: -1,
                username: null
            }
        }
    }

    componentDidMount() {
        axios.get('/api/information')
            .then(response => {
                this.setState({information: response.data});
            })
            .catch(error => {
                console.log(error);
            })
    }

    redirectToUserHandler(event, name) {
        event.preventDefault();
        this.props.history.push('/profilis/' + name);
    }

    render() {
        return (
            <Card className="mt-2" variant="outlined">
                <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                        <b>Informacija</b>
                    </Typography>
                    <Divider />
                    <Typography variant="body1" component="p">
                        Šiandien apsilankė: <b>{this.state.information.todayVisited}</b>
                    </Typography>
                    <Typography variant="body1" component="p">
                        Šiuo metu naršo: <b>{this.state.information.loggedIn}</b>
                    </Typography>
                    <Typography variant="body1" component="p">
                        Registruotų naudotojų: <b>{this.state.information.registered}</b>
                    </Typography>
                    <Typography variant="body1" component="p">
                        Naujausias narys:
                        <a
                            onClick={(event) => this.redirectToUserHandler(event, this.state.information.lastRegisteredUser.username)}
                            href="#"
                        >
                            <b> {this.state.information.lastRegisteredUser.username}</b>
                        </a>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(InformationBox);
