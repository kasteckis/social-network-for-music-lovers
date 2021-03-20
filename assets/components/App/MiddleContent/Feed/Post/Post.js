import React, {useState} from "react";
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
import {useHistory} from "react-router";
import axios from "axios";

function Post(props) {
    const history = useHistory();
    const useStyles = makeStyles({
        root: {
            maxWidth: '100%'
        },
        media: {
            height: 140,
        },
    });

    const [likes, setLikes] = useState(props.post.likes);

    const classes = useStyles();

    const likePostHandler = (id) => {
        if (props.auth.token === null) {
            history.push('/prisijungti');
            return;
        }

        const headers = {
            headers: {
                Authorization: 'Bearer ' + props.auth.token
            }
        };

        axios.put('/api/post/' + id + '/like', {}, headers)
            .then(response => {
                setLikes(response.data.likes);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const commentPostHandler = (id) => {
        if (props.auth.token === null) {
            history.push('/prisijungti');
            return;
        }

        // todo implementint commentavima
    }

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => history.push('/irasai/' + props.post.id)}>
                <CardMedia
                    className={classes.media}
                    image={window.location.origin + '/images/' + props.post.image}
                    title={props.post.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.post.text.substring(0, 140)}...
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
                <IconButton onClick={() => likePostHandler(props.post.id)} >
                    <Badge badgeContent={likes} color="error">
                        <Favorite />
                    </Badge>
                </IconButton>
                <Button size="small" color="primary" onClick={() => commentPostHandler(props.post.id)}>
                    Komentuoti ({props.post.comments})
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;