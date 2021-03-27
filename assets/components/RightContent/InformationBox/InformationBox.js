import React from "react";
import {Card, CardContent, Divider, Typography} from "@material-ui/core";
import axios from "axios";
import {Redirect} from "react-router-dom";

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
        },
        redirectTo: null
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.redirectTo) {
            this.setState({redirectTo: null});
        }
    }

    redirectToUserHandler(event, name) {
        event.preventDefault();
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

export default InformationBox;