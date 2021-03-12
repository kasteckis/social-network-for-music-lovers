import React, {Component} from 'react';
import {Button, TextField} from "@material-ui/core";

class Search extends Component {
    render() {
        return (
            <div className="card mt-2">
                <img className="card-img-top"
                     src="https://vivaldi.com/wp-content/uploads/Quickly-search-for-information-online-980x551.png"
                     alt="Card image cap"
                />
                <div className="card-body">
                    <h5 className="card-title">Paieška</h5>
                    <form>
                        <div className="form-group">
                            <TextField
                                fullWidth
                                className="m-2"
                                required
                                label="Raktažodžiai"
                                type="text"
                                variant="outlined"
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Ieškoti
                        </Button>
                    </form>

                    <h2 className="mt-5">Paieškos rezultatai</h2>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nuoroda</th>
                                <th scope="col">Tipas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><a href="#">nuoroda</a></td>
                                <td>Nuotrauka</td>
                            </tr>
                            <tr>
                                <td><a href="#">nuoroda</a></td>
                                <td>Tema</td>
                            </tr>
                            <tr>
                                <td><a href="#">nuoroda</a></td>
                                <td>Straipsnis</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Search;