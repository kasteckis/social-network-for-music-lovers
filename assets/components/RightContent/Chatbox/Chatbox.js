import React from "react";

function Chatbox() {
    return (
        <div className="card mt-2">
            <div className="card-body mx-auto">
                <h5 className="card-title">Šaukykla</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><a href="#">Admin</a>: Sveiki</li>
                    <li className="list-group-item"><a href="#">Admin</a>: Sveiki</li>
                    <li className="list-group-item"><a href="#">Naudotojas</a>: Sveiki, kaip laikotes
                        siandien?
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Chatbox;