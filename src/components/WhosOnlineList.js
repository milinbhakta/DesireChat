import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { ListItemIcon, CircularProgress, Grid } from "@material-ui/core";

class WhosOnlineList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  componentWillUnmount() {}
  renderUsers() {
    return (
      <ul>
        {this.props.users.map((user, index) => {
          if (user.id === this.props.currentUser.id) {
            return (
              <WhosOnlineListItem key={index} presenceState="online">
                {user.name} (You)
              </WhosOnlineListItem>
            );
          }
          return (
            <WhosOnlineListItem key={index} presenceState={user.presence.state}>
              {user.name}
            </WhosOnlineListItem>
          );
        })}
      </ul>
    );
  }

  render() {
    if (this.props.users) {
      return this.renderUsers();
    } else {
      return <CircularProgress variant="determinate" color="secondary" />;
    }
  }
}

class WhosOnlineListItem extends Component {
  render() {
    return (
      <Grid item xs>
        <List>
          <ListItem style={{color:"white"}}>
            <ListItemIcon>
              <FiberManualRecordIcon
                style={{
                  color:
                    this.props.presenceState === "online"
                      ? "#539eff"
                      : "#414756"
                }}
              />
            </ListItemIcon>
            <ListItemText primary={this.props.children} />
          </ListItem>
        </List>
      </Grid>
    );
  }
}

export default WhosOnlineList;
