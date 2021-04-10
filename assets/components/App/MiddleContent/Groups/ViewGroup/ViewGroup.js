import React, {Component} from 'react';
import {
    Avatar,
    Card,
    CardActionArea,
    CardContent, Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@material-ui/core";
import axios from "axios";

class ViewGroup extends Component {

    state = {
        group: {
            id: 0,
            title: null,
            songs: 0,
            albums: 0,
            image: null,
            bio: null,
            country: null,
            startedCareer: null,
            style: null
        },
        songs: [],
        albums: [],
        groupDoesNotExist: false
    }

    componentDidMount() {
        axios.get('/api/group/' + this.props.match.params.id)
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        group: response.data.group,
                        songs: response.data.songs,
                        albums: response.data.albums
                    });
                } else {
                    this.setState({
                        groupDoesNotExist: true
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleRedirectToAlbum(name, id) {
        this.props.history.push('/albumas/' + name + '/' + id);
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <List>
                        {this.state.groupDoesNotExist ?
                            <CardActionArea>
                                <CardContent>
                                    <ListItem>
                                        <Typography align="center" variant="body2" color="textSecondary" component="p">
                                            Tokia grupė sistemoje nerasta
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
                                                    {this.state.group.image ?
                                                        <img style={{maxWidth: '100%'}} src={"/images/groups/" + this.state.group.image} alt={this.state.group.title + ' profilio nuotrauka'} />
                                                        :
                                                        <img style={{maxWidth: '100%'}} src="/images/default_profile_picture.png" alt={this.state.group.title + ' profilio nuotrauka'} />
                                                    }
                                                </CardActionArea>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {this.state.group.title}
                                        </Typography>
                                    </ListItem>
                                </CardContent>

                                <CardActionArea>
                                    <CardContent>
                                        <ListItem>
                                            <Typography align="center" variant="body2" color="textSecondary" component="p">
                                                {this.state.group.bio}
                                            </Typography>
                                        </ListItem>
                                    </CardContent>
                                </CardActionArea>
                                <Divider/>
                                <CardActionArea>
                                    <CardContent>
                                        <ListItem>
                                            <ListItemText primary="Šalis" secondary={this.state.group.country} />
                                        </ListItem>
                                    </CardContent>
                                </CardActionArea>
                                <Divider/>
                                <CardActionArea>
                                    <CardContent>
                                        <ListItem>
                                            <ListItemText primary="Pradėjo veikla" secondary={this.state.group.startedCareer} />
                                        </ListItem>
                                    </CardContent>
                                </CardActionArea>
                                <Divider/>
                                <CardActionArea>
                                    <CardContent>
                                        <ListItem>
                                            <ListItemText primary="Stilius (-iai)" secondary={this.state.group.style} />
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
                {this.state.albums.length > 0 ?
                    <Card className={"mt-2"}>
                        <Typography align={"center"} className={"mt-2"} gutterBottom variant="h5" component="h2">
                            Albumai
                        </Typography>
                        <List>
                            {this.state.albums.map((album) => (
                                <React.Fragment key={album.id}>
                                    <ListItem button onClick={() => this.handleRedirectToAlbum(album.title, album.id)}>
                                        <Avatar>
                                            <CardActionArea>
                                                {album.image ?
                                                    <img style={{maxWidth: '100%'}} src={"/images/albums/" + album.image} alt={album.title + ' nuotrauka'} />
                                                    :
                                                    <img style={{maxWidth: '100%'}} src="/images/default_profile_picture.png" alt={album.title + ' nuotrauka'} />
                                                }
                                            </CardActionArea>
                                        </Avatar>
                                        <ListItemText className="ml-2" primary={album.title} secondary={album.songs + " dainos"} />
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

export default ViewGroup;
