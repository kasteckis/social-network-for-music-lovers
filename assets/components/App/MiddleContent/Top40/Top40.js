import React, {Component} from 'react';
import {Badge, CardActions, IconButton} from "@material-ui/core";
import {Favorite} from "@material-ui/icons";

class Top40 extends Component {
    render() {
        return (
            <div className="card mt-2">
                <img className="card-img-top" src="https://i.imgur.com/10ucJDh.jpg" alt="Card image cap" />
                <div className="card-body">

                    <h1>Oficialus Music.lt TOP40</h1>

                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Vieta</th>
                            <th scope="col">Grupė</th>
                            <th scope="col" />
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Jaden - I'm Ready</td>
                            <td>
                                <IconButton >
                                    <Badge badgeContent={65} color="error">
                                        <Favorite />
                                    </Badge>
                                </IconButton>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>The Beatles - Hey Jude</td>
                            <td>
                                <IconButton >
                                    <Badge badgeContent={45} color="error">
                                        <Favorite />
                                    </Badge>
                                </IconButton>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>The Beatles - Yesterday</td>
                            <td>
                                <IconButton >
                                    <Badge badgeContent={30} color="error">
                                        <Favorite />
                                    </Badge>
                                </IconButton>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">40</th>
                            <td>Nirvana - Smells Like Teen Spirit</td>
                            <td>
                                <IconButton >
                                    <Badge badgeContent={6} color="error">
                                        <Favorite />
                                    </Badge>
                                </IconButton>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Top40;