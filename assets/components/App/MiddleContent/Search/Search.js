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

    searchHandler() {
        this.setState({
            searchErrorText: ''
        });

        if (this.searchRef.current.value.length === 0) {
            this.setState({
                searchErrorText: 'Įrašykite kažką'
            });

            return;
        }

        const params = {
            search: this.searchRef.current.value
        };

        axios.get('/api/search', {params})
            .then(response => {
                console.log(response.data);
                this.setState({
                    searchResults: response.data,
                    clickedSearch: true
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <Card className="mt-2">
                <CardContent>
                    <h5 className="card-title">Paieška</h5>
                    <form>
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
                            onClick={() => this.searchHandler()}
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
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                abc
                                            </TableCell>
                                            <TableCell>abc</TableCell>
                                            <TableCell>
                                                abc
                                            </TableCell>
                                        </TableRow>
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

export default Search;