import React from "react";

function DaySong() {
    return (
        <div className="card mt-2">
            <div className="card-body mx-auto">
                <h5 className="card-title">Dienos daina</h5>
                <p className="card-text"><b>Jaden - I'm ready</b></p>
                <iframe src="https://open.spotify.com/embed/playlist/3SWozV3F6KrBg69SBRyTod"
                        width="100%" height="80" frameBorder="0"
                        allow="encrypted-media"/>
                <br/>
                <a href="#" className="btn btn-success"><i className="far fa-heart"/> 4</a>
            </div>
        </div>
    );
}

export default DaySong;