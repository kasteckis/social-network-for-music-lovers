import React, {Component} from 'react';

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
                            <td><a href="#" className="btn btn-success"><i className="far fa-heart" /> 102</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>The Beatles - Hey Jude</td>
                            <td><a href="#" className="btn btn-success"><i className="far fa-heart" /> 60</a></td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>The Beatles - Yesterday</td>
                            <td><a href="#" className="btn btn-success"><i className="far fa-heart" /> 30</a></td>
                        </tr>
                        <tr>
                            <th scope="row">40</th>
                            <td>Nirvana - Smells Like Teen Spirit</td>
                            <td><a href="#" className="btn btn-success"><i className="far fa-heart" /> 2</a></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Top40;