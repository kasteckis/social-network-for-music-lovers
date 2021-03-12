import React, {Component} from 'react';
import {Badge, IconButton} from "@material-ui/core";
import {Favorite} from "@material-ui/icons";

class Top30Lt extends Component {
    render() {
        return (
            <div className="card mt-2">
                <img className="card-img-top" src="http://i.ytimg.com/vi/1hQA5_Vo5WI/maxresdefault_live.jpg"
                     alt="Card image cap"
                />
                <div className="card-body">

                    <h1>Oficialus Music.lt Lietuviškų dainų TOP30</h1>

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
                            <td>Marijonas Mikutavičius - kažkas</td>
                            <td>
                                <IconButton >
                                    <Badge badgeContent={68} color="error">
                                        <Favorite />
                                    </Badge>
                                </IconButton>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Marijonas Mikutavičius - kažkas</td>
                            <td>
                                <IconButton >
                                    <Badge badgeContent={60} color="error">
                                        <Favorite />
                                    </Badge>
                                </IconButton>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Marijonas Mikutavičius - kažkas</td>
                            <td>
                                <IconButton >
                                    <Badge badgeContent={30} color="error">
                                        <Favorite />
                                    </Badge>
                                </IconButton>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">30</th>
                            <td>Marijonas Mikutavičius - kažkas</td>
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

export default Top30Lt;