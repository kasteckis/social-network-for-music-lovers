import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/styles";
import {
    Avatar,
    Badge,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent, CardHeader,
    CardMedia,
    IconButton,
    Typography
} from "@material-ui/core";
import {Chat, MoreVert, ThumbUp} from "@material-ui/icons";
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
        }
    });

    const [likes, setLikes] = useState(props.post.likes);
    const [liked, setLiked] = useState(props.post.liked);
    const [canUpdateLiked, setCanUpdateLiked] = useState(true);

    useEffect(() => {
        if (canUpdateLiked) {
            setLiked(props.post.liked);
        }
    });

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
                setCanUpdateLiked(false);
                setLikes(response.data.likes);
                setLiked(response.data.liked);
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

    const likedButtonStyle = {
        color: 'orange'
    };

    const redirectToUserPage = (name) => {
        history.push('/profilis/' + name);
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar>
                        <CardActionArea onClick={() => redirectToUserPage(props.post.createdBy)}>
                        {props.post.createdByProfilePicture ?
                            <img style={{maxWidth: '100%'}} src={"/images/profile/" + props.post.createdByProfilePicture} alt={props.post.createdBy + ' profilio nuotrauka'} />
                            :
                            <img style={{maxWidth: '100%'}} src="/images/default_profile_picture.png" alt={props.post.createdBy + ' profilio nuotrauka'} />
                        }
                        </CardActionArea>
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={
                    <span onClick={() => redirectToUserPage(props.post.createdBy)}>
                        {props.post.createdBy}
                    </span>
                }
                subheader={props.post.createdAt}
            />
            <CardActionArea onClick={() => history.push('/irasai/' + props.post.id)}>
                {props.post.image === null || props.post.image.length === 0 ?
                    null
                    :
                    <CardMedia
                        className={classes.media}
                        image={window.location.origin + '/images/posts/' + props.post.image}
                        title={props.post.title}
                    />
                }
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.post.text.substring(0, 140)}...
                    </Typography>
                </CardContent>
            </CardActionArea>
            {props.post.spotifyIframeUrl ?
                <div className="m-2">
                    <iframe src={props.post.spotifyIframeUrl}
                            width="100%" height={props.post.spotifyIframeUrl.indexOf('track') === -1 ? 380 : 80} frameBorder="0"
                            allow="encrypted-media"
                    />
                </div>
                :
                null
            }
            <CardActions>
                <Button style={{color: 'orange'}} size="small" color="primary" onClick={() => history.push('/irasai/' + props.post.id)}>
                    Skaityti daugiau
                </Button>
                <IconButton onClick={() => likePostHandler(props.post.id)} >
                    <Badge badgeContent={likes} color="error">
                        <ThumbUp style={liked ? likedButtonStyle : null} />
                    </Badge>
                </IconButton>
                <IconButton onClick={() => commentPostHandler(props.post.id)} >
                    <Badge badgeContent={props.post.comments} color="error">
                        <Chat style={{color: 'orange'}} />
                    </Badge>
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default Post;