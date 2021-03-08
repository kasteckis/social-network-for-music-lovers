import React from "react";
import {Card, CardContent, Typography} from "@material-ui/core";

function InformationBox() {
    return (
        <Card className="mt-2" variant="outlined">
            <CardContent>
                <Typography color="textPrimary" gutterBottom>
                    Informacija
                </Typography>
                <Typography variant="body1" component="p">
                    Šiuo metu naršo: <b>2</b>
                </Typography>
                <Typography variant="body1" component="p">
                    Registruotų naudotojų: <b>100</b>
                </Typography>
                <Typography variant="body1" component="p">
                    Naujausias naryhs: <b>Valerijus</b>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default InformationBox;