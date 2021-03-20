import React from "react";
import {makeStyles} from "@material-ui/styles";
import {
    Badge,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Typography
} from "@material-ui/core";
import {Favorite} from "@material-ui/icons";

function Post() {
    const useStyles = makeStyles({
        root: {
            maxWidth: '100%',
        },
        media: {
            height: 140,
        },
    });

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://i.imgur.com/mT177Fe.png"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Straipsnio pavadinimas
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Straipsnio contentasStraipsnio contentasStraipsnio
                         contentasStraipsnio contentasStraipsnio contentasStraipsnio contentasStraipsnio
                        contentasStraipsnio contentasStraipsnio contentasStraipsnio contentasStraipsnio
                         contentas
                    </Typography>
                </CardContent>
            </CardActionArea>
            <div className="m-2">
                <iframe src="https://open.spotify.com/embed/playlist/3SWozV3F6KrBg69SBRyTod"
                        width="100%" height="80" frameBorder="0"
                        allow="encrypted-media"
                />
            </div>
            <CardActions>
                <IconButton >
                    <Badge badgeContent="5" color="error">
                        <Favorite />
                    </Badge>
                </IconButton>
                <Button size="small" color="primary">
                    Komentuoti (4)
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;