import React, {Component} from 'react';
import {
    Avatar,
    Badge, Button, ButtonGroup,
    Card, CardActionArea,
    CardActions, CardContent,
    IconButton, ListItemAvatar,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {ArrowDropDown, ArrowDropUp, Favorite} from "@material-ui/icons";
import {withRouter} from "react-router-dom";
import axios from "axios";

class Top40 extends Component {
    state = {
        tops: [],
        topOldCount: 0,
        topNewCount: 0,
        topDisqCount: 0,
        availableVotes: 15,
        canUserVote: false
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
                this.setState({
                    tops: response.data.tops,
                    topOldCount: response.data.topOldCount,
                    topNewCount: response.data.topNewCount,
                    topDisqCount: response.data.topDisqCount,
                    canUserVote: response.data.canUserVote
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

        if (!this.state.canUserVote) {
            return true;
        }

        if (top.difference === 0) {
            return true;
        }

        return false;
    }

    canYouIncrementHandler(top) {
        // jeigu return true, reiskia negalima

        if (!this.state.canUserVote) {
            return true;
        }

        if (this.state.availableVotes === 0) {
            return true;
        }

        if (top.difference === 5) {
            return true;
        }

        return false;
    }

    submitVoteHandler() {
        let tops = this.state.tops.filter(top => top.difference > 0);

        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        }

        axios.post('/api/top40', tops, headers)
            .then(response => {
                this.setState({
                    tops: response.data.tops,
                    topOldCount: response.data.topOldCount,
                    topNewCount: response.data.topNewCount,
                    topDisqCount: response.data.topDisqCount,
                    canUserVote: response.data.canUserVote,
                    availableVotes: 15
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    redirectToPerformerHandlerWithEvent(event, title, id) {
        event.preventDefault();
        this.redirectToPerformerHandler(title, id);
    }

    redirectToPerformerHandler(title, id) {
        this.props.history.push('/grupe/' + title + '/' + id);
    }

    render() {
        return (
            <Card>
                <CardContent>
                    {this.state.topOldCount > 0 ?
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Vieta</TableCell>
                                        <TableCell>Atlikėjas ir Daina</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.tops.map((top) => (
                                        <React.Fragment key={top.id}>
                                            {top.new || top.place > 40 ?
                                                null
                                                :
                                                <React.Fragment>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row" style={{borderBottom: "none"}}>
                                                            <b>
                                                                {top.place}
                                                                {top.displayPlaceChange ?
                                                                    <React.Fragment>
                                                                        {top.place === top.lastWeekPlace ?
                                                                            null
                                                                            :
                                                                            <React.Fragment>
                                                                                {top.place < top.lastWeekPlace ?
                                                                                    <React.Fragment>
                                                                                        <ArrowDropUp style={{fill: "green"}} />
                                                                                        <span>+{top.lastWeekPlace - top.place}</span>
                                                                                    </React.Fragment>
                                                                                    :
                                                                                    <React.Fragment>
                                                                                        <ArrowDropDown style={{fill: "red"}} />
                                                                                        <span>{top.lastWeekPlace - top.place}</span>
                                                                                    </React.Fragment>
                                                                                }
                                                                            </React.Fragment>
                                                                        }
                                                                    </React.Fragment>
                                                                    :
                                                                    null
                                                                }
                                                            </b>
                                                        </TableCell>
                                                        <TableCell style={{borderBottom: "none"}}>
                                                            <Avatar>
                                                                {top.performerImage ?
                                                                    <CardActionArea onClick={() => this.redirectToPerformerHandler(top.performer, top.performerId)}>
                                                                        <img style={{maxWidth: '100%'}} src={"/images/groups/" + top.performerImage} alt={top.performer + ' nuotrauka'} />
                                                                    </CardActionArea>
                                                                    :
                                                                    null
                                                                }
                                                            </Avatar>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        {this.state.canUserVote ?
                                                            <TableCell style={{borderTop: "none", borderBottom: "none"}}>
                                                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                                                    <Button disabled={this.canYouDecrementHandler(top)} onClick={() => this.decrementVote(top.id)}>-</Button>
                                                                    <Button disabled>{top.difference}</Button>
                                                                    <Button disabled={this.canYouIncrementHandler(top)} onClick={() => this.incrementVote(top.id)}>+</Button>
                                                                </ButtonGroup>
                                                            </TableCell>
                                                            :
                                                            <TableCell style={{borderTop: "none", borderBottom: "none"}} />
                                                        }
                                                        <TableCell style={{borderTop: "none", borderBottom: "none"}}>
                                                            {top.performer === '-' ?
                                                                '-'
                                                                :
                                                                <a
                                                                    href={'/grupe/' + top.performer + '/' + top.performerId}
                                                                    onClick={(event) => this.redirectToPerformerHandlerWithEvent(event, top.performer, top.performerId)}
                                                                >
                                                                    {top.performer}
                                                                </a>
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{borderTop: "none"}}/>
                                                        <TableCell style={{borderTop: "none"}}>{top.song.title}</TableCell>
                                                    </TableRow>
                                                </React.Fragment>
                                            }
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        :
                        null
                    }
                    {this.state.topDisqCount > 0 ?
                        <React.Fragment>
                            <h2 className={"mt-2"} align={'center'}>Iškritę kuriniai</h2>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Vieta</TableCell>
                                            <TableCell />
                                            <TableCell>Atlikėjas / Grupė</TableCell>
                                            <TableCell>Daina</TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.tops.map((top) => (
                                            <React.Fragment key={top.id}>
                                                {top.place > 40 ?
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            <b>
                                                                {top.place}
                                                                <React.Fragment>
                                                                    {top.place === top.lastWeekPlace ?
                                                                        null
                                                                        :
                                                                        <React.Fragment>
                                                                            {top.place < top.lastWeekPlace ?
                                                                                <React.Fragment>
                                                                                    <ArrowDropUp style={{fill: "green"}} />
                                                                                    <span>+{top.lastWeekPlace - top.place}</span>
                                                                                </React.Fragment>
                                                                                :
                                                                                <React.Fragment>
                                                                                    <ArrowDropDown style={{fill: "red"}} />
                                                                                    <span>{top.lastWeekPlace - top.place}</span>
                                                                                </React.Fragment>
                                                                            }
                                                                        </React.Fragment>
                                                                    }
                                                                </React.Fragment>
                                                            </b>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Avatar>
                                                                {top.performerImage ?
                                                                    <CardActionArea onClick={() => this.redirectToPerformerHandler(top.performer, top.performerId)}>
                                                                        <img style={{maxWidth: '100%'}} src={"/images/groups/" + top.performerImage} alt={top.performer + ' nuotrauka'} />
                                                                    </CardActionArea>
                                                                    :
                                                                    null
                                                                }
                                                            </Avatar>
                                                        </TableCell>
                                                        <TableCell>
                                                            {top.performer === '-' ?
                                                                '-'
                                                                :
                                                                <a
                                                                    href={'/grupe/' + top.performer + '/' + top.performerId}
                                                                    onClick={(event) => this.redirectToPerformerHandlerWithEvent(event, top.performer, top.performerId)}
                                                                >
                                                                    {top.performer}
                                                                </a>
                                                            }
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
                                                    :
                                                    null
                                                }
                                            </React.Fragment>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </React.Fragment>
                        :
                        null
                    }
                    {this.state.topNewCount > 0 ?
                        <React.Fragment>
                            <h2 className={"mt-2"} align={'center'}>Naujienos</h2>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Vieta</TableCell>
                                            <TableCell />
                                            <TableCell>Atlikėjas / Grupė</TableCell>
                                            <TableCell>Daina</TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.tops.map((top) => (
                                            <React.Fragment key={top.id}>
                                                {top.new ?
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            <b>
                                                                Naujiena
                                                            </b>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Avatar>
                                                                {top.performerImage ?
                                                                    <CardActionArea onClick={() => this.redirectToPerformerHandler(top.performer, top.performerId)}>
                                                                        <img style={{maxWidth: '100%'}} src={"/images/groups/" + top.performerImage} alt={top.performer + ' nuotrauka'} />
                                                                    </CardActionArea>
                                                                    :
                                                                    null
                                                                }
                                                            </Avatar>
                                                        </TableCell>
                                                        <TableCell>
                                                            {top.performer === '-' ?
                                                                '-'
                                                                :
                                                                <a
                                                                    href={'/grupe/' + top.performer + '/' + top.performerId}
                                                                    onClick={(event) => this.redirectToPerformerHandlerWithEvent(event, top.performer, top.performerId)}
                                                                >
                                                                    {top.performer}
                                                                </a>
                                                            }
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
                                                    :
                                                    null
                                                }
                                            </React.Fragment>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </React.Fragment>
                        :
                        null
                    }
                    {this.state.canUserVote ?
                        <React.Fragment>
                            <Button
                                className={'mt-2'}
                                onClick={() => this.submitVoteHandler()}
                                disabled={this.state.availableVotes === 15}
                                variant="contained"
                                style={{backgroundColor: 'orange'}}
                            >
                                Balsuoti
                            </Button>
                            <span className={'ml-2'}>(Liko balsų - {this.state.availableVotes})</span>
                        </React.Fragment>
                        :
                        null
                    }
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(Top40);
