import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  ListItemIcon,
  CircularProgress,
  Grid,
  Badge,
  withStyles,
  Avatar
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0
    }
  }
}))(Badge);

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
              <WhosOnlineListItem key={index} presenceState="online" avatarURL={user.avatarURL}>
                {user.name} (You)
              </WhosOnlineListItem>
            );
          }
          return (
            <WhosOnlineListItem key={index} presenceState={user.presence.state} avatarURL={user.avatarURL}>
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
          <ListItem
          // style={{ color: "black" }}
          >
            <ListItemIcon>
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                variant={this.props.presenceState === "online" ? "dot" : null}
              >
                <Avatar src={this.props.avatarURL === undefined ? <AccountCircleIcon />: this.props.avatarURL } >
                </Avatar>
              </StyledBadge>
            </ListItemIcon>
            <ListItemText primary={this.props.children} />
          </ListItem>
        </List>
      </Grid>
    );
  }
}

export default WhosOnlineList;
