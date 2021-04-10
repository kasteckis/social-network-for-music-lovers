import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Divider,
    Grid,
    List,
    ListItem, ListItemText,
    TextField
} from "@material-ui/core";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Pagination} from "@material-ui/lab";
import axios from "axios";

class Albums extends Component {
    state = {
        albums: [],
        pageNumber: 1,
        albumsCount: 0
    }

    constructor(props, context) {
        super(props, context);
        this.filterTextRef = React.createRef();
    }

    componentDidMount() {
        this.loadAlbums(0, 10, null);
    }

    loadAlbums(offset, limit, filter) {
        const params = {
            offset: offset,
            limit: limit,
            filter: filter
        };

        axios.get('/api/albums', { params })
            .then(response => {
                this.setState({
                    albums: response.data.albums,
                    albumsCount: response.data.albumsCount
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    filterAlbums(event) {
        event.preventDefault();
        window.scrollTo(0, 0);
        this.loadAlbums((this.state.pageNumber-1) * 10, 10, this.filterTextRef.current.value);
    }

    handlePaginationChange(event, value) {
        window.scrollTo(0, 0);
        this.setState({pageNumber: value});
        this.loadAlbums((value-1) * 10, 10, this.filterTextRef.current.value);
    }

    handleRedirectToAlbum(name, id) {
        // this.props.history.push('/grupe/' + name + '/' + id);
        console.log("redirectas i albuma");
    }
    
    render() {
        return (
            <Card className="mt-2" variant="outlined">
                <CardContent>
                    <form onSubmit={(event) => this.filterAlbums(event)}>
                        <Grid container spacing={2}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid item xs={12}>
                                    <TextField
                                        inputRef={this.filterTextRef}
                                        autoFocus
                                        margin="dense"
                                        label="Pavadinimas"
                                        fullWidth
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid
                            container
                            justify="center"
                        >
                            <Button onClick={(event) => this.filterAlbums(event)} color="primary">
                                Filtruoti
                            </Button>
                        </Grid>
                    </form>
                    <Divider className="mt-2" />
                    <div className="mt-2">
                        <List>
                            {this.state.albums.map((album) => (
                                <React.Fragment key={album.id}>
                                    <ListItem button onClick={() => this.handleRedirectToAlbum(album.title, album.id)}>
                                        <Avatar>
                                            <CardActionArea>
                                                {album.image ?
                                                    <img style={{maxWidth: '100%'}} src={"/images/albums/" + album.image} alt={album.title + ' nuotrauka'} />
                                                    :
                                                    <img style={{maxWidth: '100%'}} src="/images/default_profile_picture.png" alt={'numatyta atlikejo nuotrauka'} />
                                                }
                                            </CardActionArea>
                                        </Avatar>
                                        <ListItemText className="ml-2" primary={album.title} secondary={album.songs + " dainų"} />
                                    </ListItem>
                                </React.Fragment>
                            ))}
                        </List>
                    </div>
                    <Grid
                        container
                        justify="center"
                    >
                        <Pagination
                            onChange={(event, value) => this.handlePaginationChange(event, value)}
                            page={parseInt(this.state.pageNumber)}
                            className="mt-3"
                            count={Math.ceil(this.state.albumsCount/10) ? Math.ceil(this.state.albumsCount/10) : 1}
                            color="primary"
                        />
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(Albums);
