import React, {Component} from 'react';
import {
    Badge, Button, ButtonGroup,
    Card,
    CardActions,
    IconButton,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {Favorite} from "@material-ui/icons";
import {withRouter} from "react-router-dom";
import axios from "axios";

class Top40 extends Component {
    state = {
        tops: [],
        availableVotes: 15
    }

    componentDidMount() {
        this.getTops();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.auth.token === null && this.props.auth.token) {
            this.getTops();
        }
    }

    getTops() {
        let headers = {};

        if (this.props.auth.token) {
            headers = {
                headers: {
                    Authorization: 'Bearer ' + this.props.auth.token
                }
            }
        }

        axios.get('/api/top40', headers)
            .then(response => {
                console.log(response.data);
                this.setState({
                    tops: response.data.tops
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    decrementVote(id) {
        let tops = this.state.tops;
        let top = this.state.tops.find(top => top.id === id);

        if (top.difference <= 0) {
            return;
        }

        top.difference--;
        top.likes--;

        const newAvailableVotes = this.state.availableVotes + 1;

        this.setState({
            tops: tops,
            availableVotes: newAvailableVotes
        });
    }

    incrementVote(id) {
        let tops = this.state.tops;
        let top = this.state.tops.find(top => top.id === id);

        if (top.difference >= 5) {
            return;
        }

        top.difference++;
        top.likes++;

        const newAvailableVotes = this.state.availableVotes - 1;

        this.setState({
            tops: tops,
            availableVotes: newAvailableVotes
        });
    }

    canYouDecrementHandler(top) {
        // jeigu return true, reiskia negalima

        if (top.difference === 0) {
            return true;
        }

        return false;
    }

    canYouIncrementHandler(top) {
        // jeigu return true, reiskia negalima

        if (this.state.availableVotes === 0) {
            return true;
        }

        if (top.difference === 5) {
            return true;
        }

        return false;
    }

    render() {
        return (
            <Card>
                <img className="card-img-top" src={window.location.origin + '/images/top40.png'} alt="music.lt top40 topo nuotrauka" />
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Vieta</TableCell>
                                <TableCell>Daina</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.tops.map((top) => (
                                <TableRow key={top.id}>
                                    <TableCell component="th" scope="row">
                                        <b>
                                            {top.place}
                                            {top.new ?
                                                ' (Naujiena)'
                                                :
                                                null
                                            }
                                        </b>
                                    </TableCell>
                                    <TableCell>{top.song.title}</TableCell>
                                    <TableCell>
                                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                                            <Button disabled={this.canYouDecrementHandler(top)} onClick={() => this.decrementVote(top.id)}>-</Button>
                                            <Button disabled>{top.likes}</Button>
                                            <Button disabled={this.canYouIncrementHandler(top)} onClick={() => this.incrementVote(top.id)}>+</Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        );
    }
}

export default withRouter(Top40);
