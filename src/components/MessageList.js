import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "./MessagesList.css";
import { Typography } from "@material-ui/core";
import MapList from "./Map-ListItem";

class MessagesList extends Component {
  componentDidUpdate() {
    if (this.newData) {
      this.newData.scrollIntoView({ behavior: "smooth" });
    }
  }

  messages() {
    const arr = this.props.messages.map((message, index) => {
      console.log(message);
      var date = new Date(message.createdAt);
      var options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      };
      var timeString = date.toLocaleString("en-US", options);

      if (message.parts[0].partType === "inline") {
        if (message.parts[0].payload.content.indexOf('{') === 0) {
          console.log("in marker");
          return (
            <ListItem ref={ref => (this.newData = ref)} key={index}>
              <ListItemText
                primary={message.senderId}
                // secondary={message.parts[0].payload.content}
                secondary={
                  <MapList
                    Marker={JSON.parse(message.parts[0].payload.content)}
                  />
                }
              />
              <Typography variant="caption" display="block" gutterBottom>
                {timeString}
              </Typography>
            </ListItem>
          );
        } else {
          return (
            <ListItem ref={ref => (this.newData = ref)} key={index}>
              <ListItemText
                primary={message.senderId}
                secondary={message.parts[0].payload.content}
              />
              <Typography variant="caption" display="block" gutterBottom>
                {timeString}
              </Typography>
            </ListItem>
          );
        }
      } else if (message.parts[0].partType === undefined) {
        console.log("Message Undefined", message);
        return (
          <ListItem ref={ref => (this.newData = ref)} key={index}>
            <ListItemText
              primary={message.senderId}
              secondary="Message Undefined..."
            />
            <Typography variant="caption" display="block" gutterBottom>
              {timeString}
            </Typography>
          </ListItem>
        );
      } else if (
        message.parts[0].partType === "attachment" &&
        Date.now() < Date.parse(message.parts[0].payload._expiration)
      ) {
        if (message.parts[0].payload.type.match("image/")) {
          return (
            <ListItem
              ref={ref => (this.newData = ref)}
              style={{ display: "block" }}
              key={index}
            >
              <ListItemText
                primary={message.senderId}
                secondary={message.parts[0].payload.content}
              />
              <ListItemText
                primary={
                  <React.Fragment>
                    <a
                      href={message.parts[0].payload._downloadURL}
                      target="_blank"
                    >
                      <img
                        src={message.parts[0].payload._downloadURL}
                        alt={message.parts[0].payload.name}
                        style={{
                          border: "none",
                          maxHeight: "200px",
                          maxWidth: "300px"
                        }}
                      />{" "}
                    </a>
                  </React.Fragment>
                }
              ></ListItemText>
              <Typography variant="caption" display="block" gutterBottom>
                {timeString}
              </Typography>
            </ListItem>
          );
        } else if (message.parts[0].payload.type.match("application/pdf")) {
          return (
            <ListItem
              ref={ref => (this.newData = ref)}
              style={{ display: "block" }}
              key={index}
            >
              <ListItemText
                primary={message.senderId}
                secondary={message.parts[0].payload.content}
              />
              <ListItemText
                primary={
                  <React.Fragment>
                    <a
                      href={message.parts[0].payload._downloadURL}
                      target="_blank"
                    >
                      <img
                        src={message.parts[0].payload._downloadURL}
                        alt={message.parts[0].payload.name}
                        style={{
                          border: "none",
                          maxHeight: "200px",
                          maxWidth: "300px"
                        }}
                      />{" "}
                    </a>
                  </React.Fragment>
                }
              ></ListItemText>
              <Typography variant="caption" display="block" gutterBottom>
                {timeString}
              </Typography>
            </ListItem>
          );
        } else {
          return (
            <ListItem
              ref={ref => (this.newData = ref)}
              style={{ display: "block" }}
              key={index}
            >
              <ListItemText
                primary={message.senderId}
                secondary={message.parts[0].payload.content}
              />
              <ListItemText
                primary={
                  <React.Fragment>
                    <a href={message.parts[0].payload._downloadURL}>
                      <img
                        src={message.parts[0].payload._downloadURL}
                        alt={message.parts[0].payload.name}
                        style={{
                          border: "none",
                          maxHeight: "200px",
                          maxWidth: "300px"
                        }}
                      />{" "}
                    </a>
                  </React.Fragment>
                }
              ></ListItemText>
              <Typography variant="caption" display="block" gutterBottom>
                {timeString}
              </Typography>
            </ListItem>
          );
        }
      } else {
        return (
          <ListItem ref={ref => (this.newData = ref)} key={index}>
            <ListItemText
              primary={message.senderId}
              secondary="Message Deleted..."
            />
            <Typography variant="caption" display="block" gutterBottom>
              {timeString}
            </Typography>
          </ListItem>
        );
      }
    });
    return arr;
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
      message: { fontSize: 15 },
      img: {
        height: "450",
        width: "500"
      }
    };

    return (
      <List style={styles.container}>
        {this.messages()}
        {/* {this.props.messages.map((message, index) => (
          // <ListItem ref={ref => (this.newData = ref)} key={index}>
          //   <ListItemText
          //     primary={message.senderId}
          //     secondary={message.parts[0].payload.content}
          //   />
          //    <img src={message.parts[0].payload._downloadUrl} alt={tile.title} />
          // </ListItem>
        ))} */}
      </List>
    );
  }
}

export default MessagesList;
