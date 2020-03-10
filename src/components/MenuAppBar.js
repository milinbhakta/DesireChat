import AccountCircle from "@material-ui/icons/AccountCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  createMuiTheme,
  List,
  ListItemAvatar,
  ListItem,
  Avatar
} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import { blue } from "@material-ui/core/colors";
import Settings from "./Settings";

class MenuAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: "",
      open: false,
      roomname: "",
      openlistdialog: false,
      joinableRooms: this.props.joinableRooms,
      selectedjoinroom_id: {},
      openFullScreen: false,
      images: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.onChangeCreateRoomText = this.onChangeCreateRoomText.bind(this);
    this.handleClickOpenListDialog = this.handleClickOpenListDialog.bind(this);
    this.handleCloseListDialog = this.handleCloseListDialog.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.getJoinableRooms = this.getJoinableRooms.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClickOpenFullScreen = this.handleClickOpenFullScreen.bind(this);
    this.handleCloseFullScreen = this.handleCloseFullScreen.bind(this);
    this.createImageAvatar = this.createImageAvatar.bind(this);
  }

  componentDidMount() {
    this.createImageAvatar();
  }

  createImageAvatar = () => {
    let images = [];

    for (let i = 1; i < 17; i++) {
      images[i] = {
        src: `http://localhost:3001/public/avatar/128_${i}.png`,
        title: `image${i}`
      };
    }
    this.setState({ images: images });
  };

  handleClick(event) {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleClose(event) {
    this.setState({ anchorEl: null });
  }

  handleClickOpen(event) {
    this.setState({ open: true });
    this.handleClose(event);
  }

  handleCloseDialog() {
    this.setState({ open: false });
  }

  onChangeCreateRoomText(e) {
    this.setState({ roomname: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.roomname);
    this.setState({ roomname: "" });
    this.handleCloseDialog();
  }

  handleCloseListDialog(value) {
    this.setState({ openlistdialog: false });
    this.handleClose(value);
    // setSelectedValue(value);
  }

  handleClickOpenListDialog() {
    this.getJoinableRooms(this.props.currentUser.id);
    this.setState({ openlistdialog: true });
  }

  handleListItemClick = value => {
    this.joinRoom(value.currentTarget.dataset.room);
    this.getJoinableRooms(this.props.currentUser.id);
    this.handleCloseListDialog(value);
  };

  joinRoom(room_id) {
    this.props.currentUser
      .joinRoom({ roomId: room_id })
      .then(room => {
        console.log(`Joined room with ID: ${room.id}`);
      })
      .catch(err => {
        console.log(`Error joining room ${room_id}: ${err}`);
      });
  }

  getJoinableRooms(id) {
    this.props.currentUser
      .getJoinableRooms({
        userId: id
      })
      .then(rooms => {
        let joinrooms = [];
        rooms.map(room => {
          joinrooms.push({
            id: room.id,
            name: room.name,
            createdByUserId: room.createdByUserId
          });
          return joinrooms;
        });
        this.setState({ joinableRooms: joinrooms });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleLogout() {
    window.location = "/";
  }

  handleClickOpenFullScreen = () => {
    this.setState({ openFullScreen: true });
  };

  handleCloseFullScreen = () => {
    this.setState({ openFullScreen: false });
    this.handleClose();
  };

  render() {
    const theme = createMuiTheme();
    const styles = {
      root: {
        flexGrow: 1
      },
      menuButton: {
        marginRight: theme.spacing(2)
      },
      avatar: {
        backgroundColor: blue[100],
        color: blue[600]
      },
      appBar: {
        position: "relative"
      },
      title: {
        flex: 1
      },
      titlefull: {
        marginLeft: theme.spacing(2),
        flex: 1
      },
      gridList: {
        width: 500,
        height: 450
      }
    };

    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={styles.title}>
              {this.props.currentRoom.name}
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleClick}
              color="inherit"
            >
               <Avatar src={this.props.currentUser === undefined ? <AccountCircle />: this.props.currentUser.avatarURL } >
                </Avatar>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClickOpen}>Create Room</MenuItem>
              <MenuItem onClick={this.handleClickOpenListDialog}>
                Join Room
              </MenuItem>
              <MenuItem onClick={this.handleClickOpenFullScreen}>
                Settings
              </MenuItem>
              <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
            <Dialog
              open={this.state.open}
              onClose={this.handleCloseDialog}
              aria-labelledby="form-dialog-title"
            >
              <form onSubmit={this.onSubmit}>
                <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Create Room and chat with your friends. No one can see your
                    chats.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Room Name"
                    type="text"
                    fullWidth
                    onChange={this.onChangeCreateRoomText}
                    value={this.state.roomname}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseDialog} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.onSubmit} color="primary">
                    Create Room
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
            <Dialog
              onClose={this.handleCloseListDialog}
              open={this.state.openlistdialog}
            >
              <DialogTitle>Join Room</DialogTitle>
              <List>
                {this.state.joinableRooms.map(room => {
                  let joinrooms = [];

                  joinrooms = (
                    <ListItem
                      button
                      onClick={this.handleListItemClick}
                      key={room.id}
                      data-room={room.id}
                    >
                      <ListItemAvatar>
                        <Avatar style={styles.avatar}>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={room.name} />
                    </ListItem>
                  );
                  return joinrooms;
                })}
              </List>
            </Dialog>
            <Settings
              open={this.state.openFullScreen}
              onClose={this.handleCloseFullScreen}
              avatars={this.state.images}
              currentUser={this.props.currentUser}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  currentUser: PropTypes.object.isRequired,
  joinableRooms: PropTypes.array.isRequired,
  currentRoom: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default MenuAppBar;
