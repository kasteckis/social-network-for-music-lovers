import React from "react";

function Survey() {
    return (
        <div className="card mt-2">
            <div className="card-body mx-auto">
                <h5 className="card-title">Apklausa: Kaip sekasi?</h5>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                           id="flexRadioDefault1"/>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Gerai
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                           id="flexRadioDefault2"/>
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Puikiai
                    </label>
                </div>

                <button type="button" className="btn btn-primary mt-2">Balsuoti</button>
            </div>
        </div>
    );
}

export default Survey;