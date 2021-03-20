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

function Post(props) {
    const useStyles = makeStyles({
        root: {
            maxWidth: '100%'
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
                    image={window.location.href + 'images/' + props.post.image}
                    title={props.post.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.post.text}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <div className="m-2">
                <iframe src={props.post.spotifyIframeUrl}
                        width="100%" height="80" frameBorder="0"
                        allow="encrypted-media"
                />
            </div>
            <CardActions>
                <IconButton >
                    <Badge badgeContent={props.post.likes} color="error">
                        <Favorite />
                    </Badge>
                </IconButton>
                <Button size="small" color="primary">
                    Komentuoti ({props.post.comments})
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;