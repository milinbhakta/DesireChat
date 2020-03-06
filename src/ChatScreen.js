import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import TypingIndicator from "./components/TypingIndicator";
import WhosOnlineList from "./components/WhosOnlineList";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  makeStyles,
  Button,
  TextField
} from "@material-ui/core";
import SimpleBackdrop from "./components/SimpleBackdrop";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
      name: "",
      roomname: "",
      joinableRooms: {}
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error("error", error));
  }
  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    });
  }

  createRoom(name) {
    this.state.currentUser
      .createRoom({
        id: `#${name}`,
        name: name,
        private: true
      })
      .then(room => {
        console.log(`room created with name ${room.name}`);
      })
      .catch(err => {
        console.log(`Error creating room ${err}`);
      });
  }

  onChange(e) {
    this.setState({ name: e.target.value });
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  getJoinableRooms(currentUser) {
    currentUser
      .getUserJoinableRooms({
        userId: currentUser.id
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:5c3dad01-866a-4f5e-8983-8b02af87d5bd",
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: "http://localhost:3001/authenticate"
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        currentUser
          .getJoinableRooms()
          .then(rooms => {
            this.setState({ joinableRooms: rooms });
          })
          .catch(err => {
            console.log(`Error getting joinable rooms: ${err}`);
          });
        return currentUser.subscribeToRoom({
          roomId: "fd2b99ca-74e8-4909-bafd-644409f033ee",
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
              });
            },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                )
              });
            },
            onPresenceChange: () => this.forceUpdate()
          }
        });
      })
      .then(currentRoom => {
        this.setState({ currentRoom, roomname: currentRoom.name });
      })
      .catch(error => console.error("error", error));
  }

  render() {
    const styles = {
      container: {
        display: "flex",
        flexDirection: "column"
      },
      chatContainer: {
        display: "flex",
        flex: 1
      },
      whosOnlineListContainer: {
        backgroundColor: "#2c303b",
        Color: "white"
      },
      chatListContainer: {
        padding: 20,
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      },
      backdrop: {
        color: "#fff",
        height: "100vh",
        width: "100vw"
      },
      messageform: {},
      root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: "white"
      },
      gridList: {
        width: 500
      },
      icon: {
        color: "rgba(255, 255, 255, 0.54)"
      },
      inputmessage: {
        display: "flex",
        flexDirection: "row"
      },
      title: {
        flexGrow: 1
      },
      plus: {
        marginTop: "10px"
      },
      input: {
        Color: "white"
      }
    };

    return (
      <div className={styles.root}>
        <SimpleBackdrop />
        <MenuAppBar onSubmit={this.createRoom} {...this.state} />
        <Grid container className={styles.gridList} spacing={3}>
          <Grid item xs={3} style={styles.whosOnlineListContainer}>
            <Grid item xs>
              <WhosOnlineList
                currentUser={this.state.currentUser}
                users={this.state.currentRoom.users}
              />
            </Grid>
            {/* <Grid item xs>
              <CreateRoomForm onSubmit={this.createRoom} />
            </Grid> */}
          </Grid>
          <Grid item xs>
            <Grid item xs>
              <MessageList
                messages={this.state.messages}
                style={styles.chatList}
              />
            </Grid>
            <Grid item xs>
              <TypingIndicator
                usersWhoAreTyping={this.state.usersWhoAreTyping}
              />
              <SendMessageForm
                onSubmit={this.sendMessage}
                onChange={this.sendTypingEvent}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function MenuAppBar(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  }));
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [roomname, setroomname] = React.useState("");
  const [openlistdialog, setOpenlistdialog] = React.useState(false);
  const {joinableRooms} = props;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    if (event.target.innerText === "Join Room") {
      console.log(props);
    }
    setAnchorEl(null);
  };

  const handleClickOpen = event => {
    setOpen(true);
    handleClose(event);
  };

  const handleClickOpenListDialog = event => {
    setOpenlistdialog(true);
    handleClose(event);
  };

  const handleListItemClick = value => {};
  const handleCloseListDialog = () => {};
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const onChangeCreateRoomText = e => {
    setroomname(e.target.value);
  };

  const onSubmitRoom = e => {
    e.preventDefault();
    props.onSubmit(roomname);
    setroomname("");
    handleCloseDialog();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Photos
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClickOpen}>Create Room</MenuItem>
            <MenuItem onClick={handleClickOpenListDialog}>Join Room</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          <Dialog
            open={open}
            onClose={handleCloseDialog}
            aria-labelledby="form-dialog-title"
          >
            <form onSubmit={onSubmitRoom}>
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
                  onChange={onChangeCreateRoomText}
                  value={roomname}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={onSubmitRoom} color="primary">
                  Create Room
                </Button>
              </DialogActions>
            </form>
          </Dialog>
          <Dialog
            onClose={handleCloseListDialog}
            aria-labelledby="simple-dialog-title"
            openlistdialog={openlistdialog}
          >
            <DialogTitle id="simple-dialog-title">Select Room</DialogTitle>
            {/* <List>
              {joinableRooms.forEach(room => (
                <ListItem
                  button
                  onClick={() => handleListItemClick(room)}
                  key={room.id}
                >
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={room.name} />
                </ListItem>
              ))}
            </List> */}
          </Dialog>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ChatScreen;
