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
      selectedRoom: this.props.currentRoom.id
    };
    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.handleJoinRoom = this.handleJoinRoom.bind(this);
  }

  componentDidMount() {}
  componentWillUnmount() {}

  handleListItemClick = (event, index) => {
    this.setState({ selectedRoom: index });
    this.handleJoinRoom(event,index);
  }

  handleJoinRoom(e,roomId){
    e.preventDefault();
    this.props.onJoin(roomId);
  }

  renderUsers() {
    return (
      <ul>
        {this.props.rooms.map(room => {
          // return (
          //   <RoomListItem key={room.id} currentRoom={this.props.currentRoom}>
          //     {room.name}
          //   </RoomListItem>
          // );
          return (
            <Grid item xs>
              <List>
                <ListItem
                  style={{ color: "black" }}
                  selected={room.id === this.state.selectedRoom}
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
  currentRoom: PropTypes.array.isRequired,
  rooms: PropTypes.array.isRequired,
  onJoin: PropTypes.func.isRequired
};

// class RoomListItem extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };

//   }

//   componentDidMount() {
//     if (this.state.selectedRoom === 0) {
//       this.setState({ selectedRoom: this.props.currentRoom.id });
//     }
//   }

//   handleListItemClick = (event, index) => {
//     this.setState({ selectedRoom: index });
//   };

//   render() {
//     return (
//       <Grid item xs>
//         <List>
//           <ListItem
//             style={{ color: "black" }}
//             selected={this._reactInternalFiber.key === this.state.selectedRoom}
//             onClick={event =>
//               this.handleListItemClick(event, this._reactInternalFiber.key)
//             }
//           >
//             <ListItemText primary={this.props.children} />
//           </ListItem>
//         </List>
//       </Grid>
//     );
//   }
// }

export default RoomList;
