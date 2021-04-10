import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import axios from "axios";
import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    Divider,
    List,
    ListItem,
    ListItemAvatar, ListItemText,
    Typography
} from "@material-ui/core";

class ViewAlbum extends Component {
    state = {
        album: {
            id: 0,
            title: null,
            songs: 0,
            image: null,
            performer: {
                id: null,
                title: null,
                songs: 0,
                albums: 0,
                image: null,
                bio: null,
                country: null,
                startedCareer: null,
                style: null
            },
            style: null,
            year: null
        },
        songs: [],
        albumDoesNotExist: false
    }

    componentDidMount() {
        axios.get('/api/album/' + this.props.match.params.id)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    this.setState({
                        album: response.data.album,
                        songs: response.data.songs,
                    });
                } else {
                    this.setState({
                        albumDoesNotExist: true
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleRedirectToPerformer(name, id) {
        this.props.history.push('/grupe/' + name + '/' + id);
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <List>
                        {this.state.albumDoesNotExist ?
                            <CardActionArea>
                                <CardContent>
                                    <ListItem>
                                        <Typography align="center" variant="body2" color="textSecondary" component="p">
                                            Toks albumas sistemoje nerastas
                                        </Typography>
                                    </ListItem>
                                </CardContent>
                            </CardActionArea>
                            :
                            <React.Fragment>
                                <CardContent>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <CardActionArea>
                                                    {this.state.album.image ?
                                                        <img style={{maxWidth: '100%'}} src={"/images/albums/" + this.state.album.image} alt={this.state.album.title + ' albumo nuotrauka'} />
                                                        :
                                                        <img style={{maxWidth: '100%'}} src="/images/default_profile_picture.png" alt={this.state.album.title + ' nuotrauka'} />
                                                    }
                                                </CardActionArea>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {this.state.album.title}
                                        </Typography>
                                    </ListItem>
                                </CardContent>

                                <CardActionArea>
                                    <CardContent>
                                        <ListItem>
                                            <Typography align="center" variant="body2" color="textSecondary" component="p">
                                                {null}
                                            </Typography>
                                        </ListItem>
                                    </CardContent>
                                </CardActionArea>
                                <Divider/>
                                {this.state.album.performer ?
                                    <React.Fragment>
                                        <ListItem button onClick={() => this.handleRedirectToPerformer(this.state.album.performer.title, this.state.album.performer.id)}>
                                            <Avatar>
                                                <CardActionArea>
                                                    {this.state.album.performer.image ?
                                                        <img style={{maxWidth: '100%'}} src={"/images/groups/" + this.state.album.performer.image} alt={this.state.album.performer.title + ' nuotrauka'} />
                                                        :
                                                        <img style={{maxWidth: '100%'}} src="/images/default_profile_picture.png" alt={this.state.album.performer.title + ' nuotrauka'} />
                                                    }
                                                </CardActionArea>
                                            </Avatar>
                                            <ListItemText className="ml-2" primary={this.state.album.performer.title} secondary="Atlikėjas/Grupė" />
                                        </ListItem>
                                    </React.Fragment>
                                    :
                                    null
                                }
                                <Divider/>
                                <CardActionArea>
                                    <CardContent>
                                        <ListItem>
                                            <ListItemText primary="Dainų kiekis" secondary={this.state.album.songs} />
                                        </ListItem>
                                    </CardContent>
                                </CardActionArea>
                                <Divider/>
                                <CardActionArea>
                                    <CardContent>
                                        <ListItem>
                                            <ListItemText primary="Išleidimo metai" secondary={this.state.album.year} />
                                        </ListItem>
                                    </CardContent>
                                </CardActionArea>
                                <Divider/>
                                <CardActionArea>
                                    <CardContent>
                                        <ListItem>
                                            <ListItemText primary="Stilius (-iai)" secondary={this.state.album.style} />
                                        </ListItem>
                                    </CardContent>
                                </CardActionArea>
                            </React.Fragment>
                        }
                    </List>
                </Card>
                {this.state.songs.length > 0 ?
                    <Card className={"mt-2"}>
                        <Typography align={"center"} className={"mt-2"} gutterBottom variant="h5" component="h2">
                            Dainos
                        </Typography>
                        <List>
                            {this.state.songs.map((song) => (
                                <React.Fragment key={song.id}>
                                    <ListItem button onClick={() => console.log('redirect to song')}>
                                        <ListItemText className="ml-2" primary={song.title} secondary={song.year} />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </Card>
                    :
                    null
                }
            </React.Fragment>
        );
    }
}

export default withRouter(ViewAlbum);
