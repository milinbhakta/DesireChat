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

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
      name: "",
      roomname: ""
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
        console.log("User", currentUser);
        return currentUser.subscribeToRoom({
          roomId: "d5e60275-05f7-47de-a634-e4af9c79c526",
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
        <MenuAppBar onSubmit={this.createRoom} />
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

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);
  const [roomname, setroomname] = React.useState("");

  const handleClickOpen = event => {
    setOpen(true);
    handleClose(event);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const onChangeCreateRoomText = e => {
    setroomname(e.target.value);
  };

  const onSubmitRoom = e => {
    e.preventDefault();
    props.onSubmit(roomname);
    setroomname('');
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
            <MenuItem onClick={handleClose}>Join Room</MenuItem>
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
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ChatScreen;
