import React from "react";

function InformationBox() {
    return (
        <div className="card mt-2">
            <div className="card-body mx-auto">
                <h5 className="card-title">Informacija</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Šiuo metu naršo: <b>2</b></li>
                    <li className="list-group-item">Registruotų naudotojų: <b>100</b></li>
                    <li className="list-group-item">Naujausias naryhs: <b>Valerijus</b></li>
                </ul>
            </div>
        </div>
    );
}

export default InformationBox;