import React from "react";

function Post() {
    return (
        <div className="card mt-2">
            <img className="card-img-top"
                 src="https://i.imgur.com/mT177Fe.png"
                 alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Straipsnio pavadinimas</h5>
                <p className="card-text">Straipsnio contentasStraipsnio contentasStraipsnio
                    contentasStraipsnio contentasStraipsnio contentasStraipsnio contentasStraipsnio
                    contentasStraipsnio contentasStraipsnio contentasStraipsnio contentasStraipsnio
                    contentas</p>
                <a href="#">Skaityti daugiau</a>
                <iframe src="https://open.spotify.com/embed/playlist/3SWozV3F6KrBg69SBRyTod"
                        width="100%" height="80" frameBorder="0"
                        allow="encrypted-media"/>
                <a href="#" className="btn btn-success"><i className="far fa-heart"/> 102</a>
                <a href="#" className="btn btn-primary"><i className="far fa-comments"/> 3</a>
            </div>
        </div>
    );
}

export default Post;