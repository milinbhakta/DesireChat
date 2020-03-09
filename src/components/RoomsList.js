import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { CircularProgress, Grid } from "@material-ui/core";
import PropTypes from "prop-types";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoom: ""
    };
    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.handleJoinRoom = this.handleJoinRoom.bind(this);
  }

  componentDidMount() {
    console.log("Current Room ID", this.props.selectedRoom);
    this.setState({ selectedRoom: this.props.selectedRoom });
  }
  componentWillUnmount() {}

  handleListItemClick = (event, index) => {
    this.setState({ selectedRoom: index });
    this.handleJoinRoom(event, index);
  };

  handleJoinRoom(e, roomId) {
    e.preventDefault();
    this.props.onJoin(roomId);
  }

  renderUsers() {
    return (
      <ul>
        {this.props.rooms.map(room => {
          return (
            <Grid item xs>
              <List>
                <ListItem
                  // style={{ color: "black" }}
                  selected={room.id === this.props.selectedRoom}
                  onClick={event => this.handleListItemClick(event, room.id)}
                  key={room.id}
                >
                  <ListItemText primary={room.name} />
                </ListItem>
              </List>
            </Grid>
          );
        })}
      </ul>
    );
  }

  render() {
    if (this.props.rooms) {
      return this.renderUsers();
    } else {
      return <CircularProgress variant="determinate" color="secondary" />;
    }
  }
}

RoomList.propTypes = {
  currentUser: PropTypes.object.isRequired,
  currentRoom: PropTypes.object.isRequired,
  rooms: PropTypes.array.isRequired,
  onJoin: PropTypes.func.isRequired
};
export default RoomList;
