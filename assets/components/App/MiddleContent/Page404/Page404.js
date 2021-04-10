import React from "react";
import './Page404.css';
import {Card} from "@material-ui/core";

function Page404() {
    return (
        <Card>
            <div id="error404page">
                <div className="error404page-content">
                    <h1>404 - Puslapis nerastas :\</h1>
                </div>
            </div>
        </Card>
    );
}

export default Page404;
