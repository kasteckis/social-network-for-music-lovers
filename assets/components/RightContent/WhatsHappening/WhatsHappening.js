import React from "react";
import {Card, CardContent, Typography} from "@material-ui/core";

function WhatsHappening() {
    return (
        <Card className="mt-2" variant="outlined">
            <CardContent>
                <Typography color="textPrimary" gutterBottom>
                    Kas vyksta?
                </Typography>
                <Typography variant="body1" component="p">
                    <a href="#">Admin</a> patiko dienos daina.
                </Typography>
                <Typography variant="body1" component="p">
                    <a href="#">Admin</a> patiko dienos daina.
                </Typography>
                <Typography variant="body1" component="p">
                    <a href="#">Admin</a> patiko dienos daina.
                </Typography>
            </CardContent>
        </Card>
    );
}

export default WhatsHappening;