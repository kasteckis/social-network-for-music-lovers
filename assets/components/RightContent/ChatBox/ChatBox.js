import React from "react";
import {Card, CardContent, Typography} from "@material-ui/core";

function ChatBox() {
    return (
        <Card className="mt-2" variant="outlined">
            <CardContent>
                <Typography color="textPrimary" gutterBottom>
                    Šaukykla
                </Typography>
                <Typography variant="body" component="p">
                    <a href="#">Admin</a>: Sveiki
                </Typography>
                <Typography variant="body" component="p">
                    <a href="#">Admin</a>: Sveiki
                </Typography>
                <Typography variant="body" component="p">
                    <a href="#">Naudotojas</a>: Sveiki, kaip laikotes
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ChatBox;