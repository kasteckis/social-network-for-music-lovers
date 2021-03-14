import React from "react";
import {Card, CardContent, Typography} from "@material-ui/core";
import axios from "axios";

class ChatBox extends React.Component {

    state = {
        messages: []
    }

    componentDidMount() {
        axios.get('./api/chat-messages')
            .then(response => {
                this.setState({messages: response.data});
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        return (
            <Card className="mt-2" variant="outlined">
                <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                        Šaukykla
                    </Typography>
                    {this.state.messages.map((message) => (
                        <React.Fragment key={message.id}>
                            <Typography variant="body2" component="p">
                                {message.date}
                            </Typography>
                            <Typography variant="body1" component="p" className="mb-2">
                                <a href="#">{message.username}</a>: {message.message}
                            </Typography>
                        </React.Fragment>
                    ))}
                </CardContent>
            </Card>
        );
    }
}

export default ChatBox;