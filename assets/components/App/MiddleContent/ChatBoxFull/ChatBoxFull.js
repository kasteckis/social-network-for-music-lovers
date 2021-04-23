import React, {Component} from 'react';
import {
    Button,
    Card,
    CardContent,
    DialogActions,
    DialogContent,
    Divider,
    IconButton,
    TextField,
    Typography
} from "@material-ui/core";
import axios from "axios";
import Linkify from "react-linkify";
import {withRouter} from "react-router-dom";

class ChatBoxFull extends Component {
    state = {
        messages: [],
        newMessageErrorText: ''
    }

    constructor(props, context) {
        super(props, context);
        this.newMessageRef = React.createRef();
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        axios.get('/api/chat-messages-more')
            .then(response => {
                this.setState({messages: response.data});
            })
            .catch(error => {
                console.log(error)
            });
    }

    redirectToUserHandler(event, name) {
        event.preventDefault();
        this.props.history.push('/profilis/' + name);
    }

    handleSubmitMessage = (event) => {
        event.preventDefault();
        this.setState({newMessageErrorText: ''});

        if (this.newMessageRef.current.value.length === 0) {
            this.setState({newMessageErrorText: 'Žinutė negali būti tusčia'});
            return;
        }

        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };

        const data = {
            message: this.newMessageRef.current.value,
            returnMoreMessages: true
        }

        axios.post('/api/chat-messages', data, headers)
            .then(response => {
                this.setState({messages: response.data});
                this.newMessageRef.current.value = '';
            })
            .catch(error => {
                console.log(error);
            })

        this.setState({openDialog: false});
    }

    render() {
        return (
            <Card className="mt-2" variant="outlined">
                <CardContent>
                    {this.props.auth.token === null ?
                        null
                        :
                        <form onSubmit={(event) => this.handleSubmitMessage(event)}>
                            <TextField
                                error={this.state.newMessageErrorText.length !== 0}
                                helperText={this.state.newMessageErrorText}
                                autoFocus
                                inputRef={this.newMessageRef}
                                margin="dense"
                                label="Jūsų tekstas"
                                fullWidth
                                multiline
                                rows={6}
                                rowsMax={Infinity}
                            />
                            <Button onClick={(event) => this.handleSubmitMessage(event)} color="primary">
                                Rašyti
                            </Button>
                        </form>
                    }
                    <Divider />
                    <div className="mt-2">
                    {this.state.messages.map((message) => (
                        <React.Fragment key={message.id}>
                            <Typography variant="body2" component="p">
                                {message.date}
                            </Typography>
                            <Typography variant="body1" component="p" className="mb-2">
                                <a onClick={(event) => this.redirectToUserHandler(event, message.username)} href="#">{message.username}</a>: <Linkify><span style={{wordBreak: 'break-word'}}>{message.message}</span></Linkify>
                            </Typography>
                            <Divider />
                        </React.Fragment>
                    ))}
                    </div>
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(ChatBoxFull);