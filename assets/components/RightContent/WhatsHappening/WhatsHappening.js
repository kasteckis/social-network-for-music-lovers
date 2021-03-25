import React from "react";
import {Card, CardContent, Divider, Typography} from "@material-ui/core";

class WhatsHappening extends React.Component {

    render() {
        return (
            <Card className="mt-2" variant="outlined">
                <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                        <b>Kas vyksta?</b>
                    </Typography>
                    <Divider />
                    <Typography variant="body1" className="mb-2">
                        <a href="#">Admin</a> patiko dienos daina.
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                        <a href="#">Admin</a> patiko straipsnis apie <a href="#">muzika mūsų širdyje</a>.
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                        <a href="#">Admin</a> pakomentavo straipsnį <a href="#">muzika mūsų širdyje</a>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default WhatsHappening;