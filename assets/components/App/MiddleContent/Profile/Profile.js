import React, {Component} from 'react';

class Profile extends Component {
    render() {
        return (
            <div className="card mt-2">
                <div className="card-body">
                    <h3>Sveiki, Admin</h3>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Naudotojo vardas
                            <span className="badge badge-primary badge-pill">Admin</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Elektroninis paštas
                            <span className="badge badge-primary badge-pill">admin@music.lt</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Užsiregistravo
                            <span className="badge badge-primary badge-pill">2021-02-01</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Parašyta pranešimų
                            <span className="badge badge-primary badge-pill">102</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            El. laiškų prenumeravimas
                            <form method="post">
                                <button type="submit" name="emailSub" value="email_subscription"
                                        className="btn btn-sm btn-success">Prenumeruojama
                                </button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Profile;