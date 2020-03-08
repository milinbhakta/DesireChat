import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "./MessagesList.css";

class MessagesList extends Component {
  componentDidUpdate() {
    if (this.newData) {
      this.newData.scrollIntoView({ behavior: "smooth" });
    }
  }
  render() {
    const styles = {
      container: {
        overflowY: "scroll",
        flex: 1,
        height: "80vh"
      },
      ul: {
        listStyle: "none"
      },
      li: {
        marginTop: 13,
        marginBottom: 13
      },
      senderUsername: {
        fontWeight: "bold"
      },
      message: { fontSize: 15 }
    };

    return (
      <List style={styles.container}>
        {this.props.messages.map((message, index) => (
          <ListItem ref={ref => (this.newData = ref)} key={index}>
            <ListItemText primary={message.senderId} secondary={message.parts[0].payload.content} />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default MessagesList;
