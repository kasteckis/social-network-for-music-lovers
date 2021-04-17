import React, {Component} from 'react';
import {
    Button,
    Card,
    CardContent,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import axios from "axios";
import {withRouter} from "react-router-dom";

class Search extends Component {

    state = {
        searchErrorText: '',
        searchResults: [],
        clickedSearch: false
    }

    constructor(props, context) {
        super(props, context);
        this.searchRef = React.createRef();
    }

    componentDidMount() {
        const searchRefText = sessionStorage.getItem('search_search_text');

        if (searchRefText) {
            this.searchRef.current.value = searchRefText;
            this.searchByKeyword(searchRefText);
        }
    }

    searchHandler(event) {
        event.preventDefault();
        this.searchByKeyword(this.searchRef.current.value);
    }

    searchByKeyword(keyword) {
        this.setState({
            searchErrorText: ''
        });

        if (keyword.length === 0) {
            this.setState({
                searchErrorText: 'Įrašykite kažką'
            });

            return;
        }

        const params = {
            search: keyword
        };

        axios.get('/api/search', {params})
            .then(response => {
                sessionStorage.setItem('search_search_text', keyword);
                this.setState({
                    searchResults: response.data,
                    clickedSearch: true
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    redirectToLinkHandler(event, link) {
        event.preventDefault();

        this.props.history.push(link);
    }

    render() {
        return (
            <Card className="mt-2">
                <CardContent>
                    <h5 className="card-title">Paieška</h5>
                    <form onSubmit={(event) => this.searchHandler(event)}>
                        <div className="form-group">
                            <TextField
                                error={this.state.searchErrorText.length !== 0}
                                helperText={this.state.searchErrorText}
                                fullWidth
                                className="m-2"
                                inputRef={this.searchRef}
                                required
                                label="Raktažodžiai"
                                type="text"
                                variant="outlined"
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(event) => this.searchHandler(event)}
                        >
                            Ieškoti
                        </Button>
                    </form>

                    {this.state.clickedSearch ?
                        <React.Fragment>
                            <h2 className="mt-5">Paieškos rezultatai</h2>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Tipas</b></TableCell>
                                            <TableCell><b>Pavadinimas</b></TableCell>
                                            <TableCell><b>Nuoroda</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.searchResults.map((result) => (
                                            <TableRow key={result.id}>
                                                <TableCell component="th" scope="row">
                                                    {result.type}
                                                </TableCell>
                                                <TableCell>
                                                    {result.title}
                                                </TableCell>
                                                <TableCell>
                                                    <a href={result.link} onClick={(event) => this.redirectToLinkHandler(event, result.link)}>Nuoroda</a>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </React.Fragment>
                        :
                        null
                    }
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(Search);
