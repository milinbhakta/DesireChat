import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import TypingIndicator from "./components/TypingIndicator";
import WhosOnlineList from "./components/WhosOnlineList";
import { Grid, Divider, Typography } from "@material-ui/core";
import SimpleBackdrop from "./components/SimpleBackdrop";
import MenuAppBar from "./components/MenuAppBar";
import RoomsList from "./components/RoomsList";
class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
      name: "",
      joinableRooms: [],
      rooms: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.getJoinableRooms = this.getJoinableRooms.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.subscribeToRoomMultipart = this.subscribeToRoomMultipart.bind(this);
    this.sendFile = this.sendFile.bind(this);
  }
  // Send the Typing Events
  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error("error", error));
  }
  // send messages
  sendMessage(text) {
    if (text.trim() === "") return;
    const parts = [];
    if (text.trim() !== "") {
      parts.push({
        type: "text/plain",
        content: text
      });
    }
    this.state.currentUser.sendMultipartMessage({
      roomId: `${this.state.currentRoom.id}`,
      parts
    });
  }

  sendFile(files) {
    if (files.length === 0) return;
    const parts = [];
    files.forEach(pic => {
      parts.push({
        file: pic
      });
    });
    this.state.currentUser.sendMultipartMessage({
      roomId: `${this.state.currentRoom.id}`,
      parts
    });
  }

  getRooms() {
    this.state.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          rooms: this.state.currentUser.rooms
        });
      })
      .catch(err => console.log("error on joinableRooms: ", err));
  }
  //create room
  createRoom(name) {
    this.state.currentUser
      .createRoom({
        id: `#${name}`,
        name: name,
        private: false
      })
      .then(room => {
        this.subscribeToRoomMultipart(room.id);
      })
      .catch(err => console.log("error with createRoom: ", err));
  }

  onChange(e) {
    this.setState({ name: e.target.value });
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  getJoinableRooms(id) {
    this.state.currentUser
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
        console.log(joinrooms);
      })
      .catch(err => {
        console.log(err);
      });
  }

  joinRoom(roomId) {
    this.state.currentUser
      .joinRoom({ roomId: roomId })
      .then(room => {
        console.log(`Joined room with ID: ${room.id}`);
        this.subscribeToRoomMultipart(room.id);
      })
      .catch(err => {
        console.log(`Error joining room ${roomId}: ${err}`);
      });
  }

  subscribeToRoomMultipart(roomId) {
    console.log("Subscribed Room Id", roomId);
    this.setState({ messages: [] });
    this.state.currentUser
      .subscribeToRoomMultipart({
        roomId: roomId,
        messageLimit: 100,
        hooks: {
          onMessage: message => {
            this.setState({ messages: [...this.state.messages, message] });
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
          onPresenceChanged: () => this.forceUpdate()
        }
      })
      .then(currentRoom => {
        console.log(currentRoom);
        this.setState({ currentRoom });
      })
      .catch(err => console.log("error on subscribing to room: ", err));
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:a53c6f61-2e05-403e-8bdc-699a9c55de4b",
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: "http://localhost:3001/authenticate"
      })
    });
    chatManager
      .connect()
      .then(currentUser => {
        this.setState({
          currentUser,
          rooms: currentUser.rooms
        });
        console.log("Current User", currentUser);
        this.getRooms();
        this.subscribeToRoomMultipart(this.state.rooms[0].id);
      })
      .catch(error => console.error("Error", error));
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
        borderRight: "solid"
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
      },
      listtitle: {
        padding: "10px"
      }
    };
    return (
      <div className={styles.root}>
        <SimpleBackdrop />
        <MenuAppBar
          onSubmit={this.createRoom}
          currentUser={this.state.currentUser}
          currentRoom={this.state.currentRoom}
          joinableRooms={this.state.joinableRooms}
        />
        <Grid container className={styles.gridList} spacing={3}>
          <Grid item xs={3} style={styles.whosOnlineListContainer}>
            <Grid item xs>
              <Typography variant="h6" gutterBottom style={styles.listtitle}>
                Room Member
              </Typography>
              <WhosOnlineList
                currentUser={this.state.currentUser}
                users={this.state.currentRoom.users}
              />
            </Grid>
            <Divider style={{ backgroundColor: "#cfd8dc" }} />
            <Grid item xs>
              <Typography variant="h6" gutterBottom style={styles.listtitle}>
                Your Rooms
              </Typography>
              <RoomsList
                currentUser={this.state.currentUser}
                currentRoom={this.state.currentRoom}
                selectedRoom={this.state.currentRoom.id}
                rooms={this.state.rooms}
                onJoin={this.joinRoom}
              />
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid item xs>
              <MessageList
                currentRoom={this.state.currentRoom}
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
                onFileSubmit={this.sendFile}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ChatScreen;
