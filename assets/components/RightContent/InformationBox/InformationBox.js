import React from "react";
import {Card, CardContent, Typography} from "@material-ui/core";
import axios from "axios";

class InformationBox extends React.Component {

    state = {
        information: {
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

    render() {
        return (
            <Card className="mt-2" variant="outlined">
                <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                        Informacija
                    </Typography>
                    <Typography variant="body1" component="p">
                        Šiuo metu naršo: <b>{this.state.information.loggedIn}</b>
                    </Typography>
                    <Typography variant="body1" component="p">
                        Registruotų naudotojų: <b>{this.state.information.registered}</b>
                    </Typography>
                    <Typography variant="body1" component="p">
                        {/*TODO redirectintti i profilio page*/}
                        Naujausias narys: <a href="#"><b>{this.state.information.lastRegisteredUser.username}</b></a>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default InformationBox;